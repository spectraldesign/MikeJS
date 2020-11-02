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
    }

    authorID = message.author.id
    let reminderList = []
    let reminders = await Remind.find({authorID})
    reminderList.push(`**All reminders for ${message.author.username}:**`)
    let count = 0
    reminders.forEach(reminder => {
        count += 1
        let end = (new Date((parseInt(reminder.endTime)+(60*60*1000))).toUTCString()+'+1\n')
        reminderList.push('**ID:** ' + reminder.messageID + '\n**Message:** ' + reminder.rmessage + '\n**Expires at:** ' + end)
    })
    if(count == 0){
        return
    }
    message.author.send(reminderList.join("\n"))
}