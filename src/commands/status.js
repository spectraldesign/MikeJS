exports.run = async (client, message, args) => {
    if(message.author.id != client.config.ownerID) return message.channel.send("You do not have permission to use this command.")

    let list = args.join(' ').split('|')
    let text = list[0]
    let type = list[1]
    let url = list[2]
    client.user.setPresence({
        activity: { name: text, type: type, url: url }, 
        status: 'active' })
    .catch(console.error);

};

const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
	let embed = new MessageEmbed()
	embed.setTitle("!status help:")
	embed.setDescription(`\`!status <text> <type> <url>\` | Sets bot status.<type> must be: PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM_STATUS, COMPETING`)
	return embed
}
