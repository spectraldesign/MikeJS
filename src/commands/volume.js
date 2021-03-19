const music = require("../helpFunctions/music")
const prefix = require("../config.json").prefix

exports.run = (client, message, args) => {
    var audioChannel = message.member.voice.channel
    if(!message.guild.voice){
        return message.channel.send("NO U");
    }
    if(audioChannel != message.guild.voice.channel) return message.channel.send("We are not in the same VC, so you can't tell me what to do")
    else music.run(message)
}

const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!volume help:")
	embed.setDescription(`\`!volume <vol>\` | Sets the bot playback volume to <vol>. <vol> must be between 0 and 100.`)
	return embed
}