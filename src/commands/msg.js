exports.run = (client, message, args) => {
    message.delete(message)
    message.channel.send(args.join(" ")).catch(console.error)
}


const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!msg help:")
	embed.setDescription(`\`!msg <message>\` | Posts <message> as the bot.`)
	return embed
}