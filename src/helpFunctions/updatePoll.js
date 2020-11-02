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
const { MessageEmbed } = require('discord.js')

module.exports.run = (client, foundObject, guildID, channelID) => {
    //Variables needed
    let authorID = foundObject.authorID
    let endTimeInt = parseInt(foundObject.endTime)
    let endTime = new Date(endTimeInt+(60*60*1000)).toUTCString()+"+1"
    let isComplete = foundObject.isComplete
    let options = foundObject.options
    let messageID = foundObject.messageID
    let guild = client.guilds.cache.get(guildID)
    let channel = guild.channels.cache.get(channelID)
    let msg = channel.messages.cache.get(messageID)

    options = options.split('|')
    const question = options[0]
    options.shift()
    
    if(!isComplete){
        color = '#32a862'
        footer = `✅ Poll open until: ${endTime}`
    } 
    else{
        color = '#a83236'
        footer = '❌ Poll closed'
    } 

    //Get all reactions and the amount of each
    let reactionCount = new Map()
    let total = 0;
    const reactions = msg.reactions.cache
    for(i=1; i<=options.length; i++){
        if (reactions.get(emotes[i])){
            let count = reactions.get(emotes[i]).count-1
            reactionCount.set(emotes[i], count)
            total += count
        }
    }

    //Build the description:
    var optionString = ""
    for(i=1; i<=options.length; i++){
        let percentage = reactionCount.get(emotes[i])*100/total
        if(!percentage) percentage = 0
        let filled = fill.repeat(percentage/10)
        let unfilled = nofill.repeat(10 - percentage/10)

        optionString += `${emotes[i]}: ${options[i-1]}\n${filled}${unfilled} ${percentage.toFixed(1)}%\n\n`
    }

    const embed = new MessageEmbed()
                            .setTitle(question)
                            .setDescription(optionString)
                            .setColor(color)
                            .setFooter(footer)
                            .setAuthor(`Poll by: ${guild.members.cache.get(authorID).displayName}`)
    
    
    msg.edit(embed)         
}