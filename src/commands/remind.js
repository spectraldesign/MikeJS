const Remind = require('../db/remindDB.js')
const TimeParse = require('../helpFunctions/timeParse.js')

module.exports.run = async (client, message, [time, ...rest]) => {
    if(rest.length < 1) return errorMessage(client, message)

    let duration = TimeParse.run(message, time)
    if(typeof duration != 'number'){
        return
    }
    
    let authorID = message.author.id
    
    let reminder = new Remind({
        authorID,
        guildID: message.guild.id,
        channelID: message.channel.id,
        messageID: message.id,
        duration,
        endTime: Date.now()+duration,
        isComplete: false,
        rmessage: rest.join(" ")
    })

    reminder.save().catch(err => console.log(err))
    let dateTime = new Date(Date.now()+(duration+(60*60*1000))).toUTCString()+"+1"
    message.reply(`Reminder set for ${dateTime}.`)
}

module.exports.undo = async (client, {
    guildID,
    channelID,
    _id,
}) => {
    let guild = client.guilds.cache.get(guildID)
    let channel = guild.channels.cache.get(channelID)

    
    Remind.findOne({_id}, function(err, foundObject){
        if(err){
            console.log(err)
        }
        else{
            foundObject.isComplete = true
            message = foundObject.rmessage
            mention = foundObject.authorID
            messageID = foundObject.messageID
            let link = `https://discordapp.com/channels/${guildID}/${channelID}/${messageID}`
            channel.send(`Reminder for <@!${mention}>: ${message}\nLink to original message: ${link}`)
            foundObject.deleteOne(function(err){
                if(err){
                    console.log(err)
                }
            })
        }
    })
}
const Discord = require('discord.js')
function errorMessage(client, message){
    const embed = new Discord.MessageEmbed()
                            .setTitle('Wrong usage of !remind')
                            .setDescription("Proper usage:\n`!remind <XdYhZm> <message>`\nWhere X must be less than 5 years (1825 days), Y less than 24 hours (one day), and Z less than 60 minutes (one hour)\n")
                            .setFooter("Note: You can use any single of these time units by themselves (example !remind 5h <message>) "+
                            "or in combination with the other timeunits (example !remind 5d2m <message>), but the precedence must be preserved. Xd must be before Yh and Yh before Zm")
                            .setColor('#b52121')

    message.channel.send(embed)
}


