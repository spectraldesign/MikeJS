const { MessageEmbed } = require('discord.js')
const Keywords = require('../db/keywordDB.js')
exports.run = async (client, message, args) => {
    let string = ""
    let keywords = await Keywords.find()
    keywords.forEach(keyword => {
        string += keyword.keyword + "\n"
    })
    let embed = new MessageEmbed
    embed.setTitle("Keywords:")
    embed.setDescription(string)
    message.channel.send(embed)
}

module.exports.conf = {
    aliases: ['kws', 'kiwurds', 'kwrds', 'listkeyword', 'keywordlist']
}