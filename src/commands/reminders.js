const Remind = require('../db/remindDB.js')
const TimeParse = require('../helpFunctions/timeParse.js')

module.exports.run = async (client, message, [time, ...rest]) => {
    if([time, ...rest].length >= 2){
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
                        foundObject.deleteOne(function(e){
                            if(e){
                                console.log(e)
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
    }

    let reminderMap = new Map()
    let authorID = message.author.id
    let reminders = await Remind.find({authorID})
    
    let count = 0
    reminders.forEach(reminder => {
        count += 1
        reminderMap.set(reminder.endTime, reminder)
    })

    if(count == 0){
        return
    }

    var mapAsc = new Map([...reminderMap.entries()].sort())

    let reminderList = []
    reminderList.push(`**All reminders for ${message.author.username}:**`)
 
    for (let reminder of mapAsc.values()){
        let end = (new Date((parseInt(reminder.endTime)+(60*60*1000))).toUTCString()+'+1\n')
        reminderList.push('**ID:** ' + reminder.messageID + '\n**Message:** ' + reminder.rmessage + '\n**Expires at:** ' + end)
    }

    message.author.send(reminderList.join("\n"))
}

module.exports.conf = {
    aliases: ['reminder']
}

const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!reminders help:")
	embed.setDescription(`\`!reminders\` | Makes MikeJS dm you a list of your reminders.`)
	return embed
}