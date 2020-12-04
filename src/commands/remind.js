const Remind = require('../db/remindDB.js')
const TimeParse = require('../helpFunctions/timeParse.js')

module.exports.run = async (client, message, [time, ...rest]) => {
    if(rest.length < 1) return errorMessage(client, message)

    if(time == 'remove'){
        if(rest[0].match(/\d{18}/)){
            let id = rest[0]
            await Remind.findOne({messageID:id}, function(err, foundObject){
                if(err){
                    console.log(err)
                }
                else if(!foundObject){
                    return message.channel.send(`No message found by that ID where the author is ${message.author.username}`)
                }
                else{
                    message.channel.send(`Deleted reminder with message: ${foundObject.rmessage}.`)
                    foundObject.deleteOne(function(err){
                        if(err){
                            console.log(err)
                        }
                    })
                }
                return
            })
            return
            
        }
        else{
            return message.channel.send('Not a valid messageID')
        }
    }

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
            let message = foundObject.rmessage
            let mention = foundObject.authorID
            let messageID = foundObject.messageID
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
                            .setDescription("Proper usage:\n`!remind <XdYhZm> <message>`\nWhere X must be less than 5 years (1825 days), Y less than 24 hours (one day), and Z less than 60 minutes (one hour)\n" + 
                                            "`!remind remove <messageID>` - removes reminder set in messageID. `!reminders` for a list of reminders.\n")
                            .setFooter("Note: You can use any single of these time units by themselves (example !remind 5h <message>) "+
                                    "or in combination with the other timeunits (example !remind 5d2m <message>), but the precedence must be preserved. Xd must be before Yh and Yh before Zm")
                            .setColor('#b52121')

    message.channel.send(embed)
}


