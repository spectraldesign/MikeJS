const Remind = require('../db/remindDB.js')

module.exports.run = async (client, message, [time, ...rest]) => {
    if(rest.length < 1) return message.channel.send("Incorrect use of !remind.\nCorrect usage: `!remind <time in minutes> <message>`")
    
    let authorID = message.author.id
    let duration = time.match(/\d{1,3}/)
    if(!duration) return message.channel.send(`Illegal time`)
    duration = duration[0]
    
    let reminder = new Remind({
        authorID,
        guildID: message.guild.id,
        channelID: message.channel.id,
        duration,
        endTime: Date.now()+duration*60000,
        isComplete: false,
        rmessage: rest.join(" ")
    })

    reminder.save().catch(err => console.log(err))
    message.reply(`Reminder set for ${duration} min from now.`)
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
            channel.send(`Reminder for <@!${mention}>: ${message}`)
            foundObject.deleteOne(function(err){
                if(err){
                    console.log(err)
                }
            })
        }
    })
}