exports.run = (client, message, args) => {
    message.channel.send('No Enuk u be wrong af boi').catch(console.error)
}

const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!stfenuk help:")
	embed.setDescription(`\`!stfenuk\` | Tells Enuk to shut the fuck up like he (probably) should.`)
	return embed
}