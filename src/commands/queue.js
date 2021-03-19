const music = require("../helpFunctions/music")
exports.run = (client, message, args) => {
    music.printQueue(message)
}


const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!queue help:")
	embed.setDescription(`\`!queue\` | Provides a list of songs in queue, if there are any.`)
	return embed
}