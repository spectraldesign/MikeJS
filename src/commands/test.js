exports.run = async (client, message, args) => {
    let msg = await message.channel.send('Test successfully completed I suppose.').catch(console.error)
    msg.edit(`Test successfully completed I suppose. \`Latency: ${msg.createdAt - message.createdAt}ms\``)
}

module.exports.conf = {
    aliases: ['t']
}

const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!test help:")
	embed.setDescription(`\`!test\` | Prints a message, checks API delay.`)
	return embed
}