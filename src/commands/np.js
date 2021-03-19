const music = require("../helpFunctions/music")
exports.run = (client, message, args) => {
    music.nowPlaying(message)
}

module.exports.conf = {
    aliases: ['playing', 'current']
}

const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!np help:")
	embed.setDescription(`\`!np\` | Shows the currently playing song and its progress`)
	return embed
}