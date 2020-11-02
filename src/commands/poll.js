const { MessageEmbed } = require('discord.js')
const Poll = require('../db/pollDB.js')
const UpdatePoll = require('../helpFunctions/updatePoll.js')
const TimeParse = require('../helpFunctions/timeParse.js')

module.exports.run = async (client, message, [time, ...rest]) => {
    if(rest.length < 1) return errorMessage(client, message)
    
    let authorID = message.author.id
    let guildID = message.guild.id
    let channelID = message.channel.id

    let duration = TimeParse.run(message, time)
    if(typeof duration != 'number'){
        return
    }

    let restRemove = rest.join(" ")
    while(restRemove.endsWith('|')){
        restRemove = restRemove.slice(0, -1)
    }
    let optionAmount = restRemove.split("|").length-1
    if(optionAmount > 10) return message.channel.send('Illegal use of !poll, maximum number of options is 10.')
    
    message.channel.send(new MessageEmbed().setDescription('.')).then(function(msg){
        let endTime = Date.now()+duration
        let poll = new Poll({
            authorID,
            guildID,
            channelID,
            messageID: msg.id,
            duration,
            endTime,
            isComplete: false,
            options: restRemove
        })
        poll.save().catch(err => console.log(err))
        embedStart(client, authorID, guildID, channelID, msg.id, false, endTime, restRemove)
        for(i=1; i<=optionAmount; i++){
            msg.react(emotes[i])
        }
    }).catch(err => console.log(err))
    
}

module.exports.undo = async (client, {
    guildID,
    channelID,
    _id,
}) => {
    
    Poll.findOne({_id}, function(err, foundObject){
        if(err){
            console.log(err)
        }
        else{
            foundObject.isComplete = true
            UpdatePoll.run(client, foundObject, guildID, channelID)
            foundObject.deleteOne(function(err){
                if(err){
                    console.log(err)
                }
            })
        }
    })
}

const emotes = {
    1: '1️⃣',
    2: '2️⃣',
    3: '3️⃣',
    4: '4️⃣',
    5: '5️⃣',
    6: '6️⃣',
    7: '7️⃣',
    8: '8️⃣',
    9: '9️⃣',
    10: '🔟'
}
const fill = '█'
const nofill = '⠀'


function embedStart(client, authorID, guildID, channelID, messageID, isComplete, endTime, options){
    let guild = client.guilds.cache.get(guildID)
    let channel = guild.channels.cache.get(channelID)
    let msg = channel.messages.cache.get(messageID)
    let endTimeString = new Date(endTime+(60*60*1000)).toUTCString()+"+1"
    color = '#32a862'
    footer = `✅ Poll open until: ${endTimeString}`

    //Build the description:
    options = options.split('|')
    const question = options[0]
    options.shift()
    var optionString = ""
    for(i=0; i<options.length; i++){
        let unfilled = nofill.repeat(10)
        optionString += `${emotes[i+1]}: ${options[i]}\n${unfilled}0%\n\n`
    }

    const embed = new MessageEmbed()
                            .setTitle(question)
                            .setDescription(optionString)
                            .setColor(color)
                            .setFooter(footer)
                            .setAuthor(`Poll by: ${guild.members.cache.get(authorID).displayName}`)
    
    msg.edit(embed)         
}



function errorMessage(client, message){
    const embed = new MessageEmbed()
                            .setTitle('Wrong usage of !poll')
                            .setDescription("Proper usage:\n`!poll <XdYhZm> <question|answer1|answer2|...|answer10>`\nWhere X must be less than 5 years (1825 days), Y less than 24 hours (one day), and Z less than 60 minutes (one hour)\n")
                            .setFooter("Note: You can use any single of these time units by themselves (example !remind 5h <message>) "+
                            "or in combination with the other timeunits (example !remind 5d2m <message>), but the precedence must be preserved. Xd must be before Yh and Yh before Zm")
                            .setColor('#b52121')

    message.channel.send(embed)
}