exports.run = (client, message, args) => {
    
    const user = getUserFromMention(client, args[0])
    if(!user) return message.channel.send('Illegal use of !dm, proper usage: `!dm @member <message>`')

    message.delete(message)
    args.shift()
    user.send(args.join(" ")).catch(console.error)
    //Info about the message being sent, to moderate bot abuse
    console.log(`Author: ${message.author.username} | Message: ${args.join(" ")} | Recipient: ${user.username}`)
}


function getUserFromMention(client, mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!dm help:")
	embed.setDescription(`\`!dm <@user> <message>\` | Sends <message> to <@user> as a dm.`)
	return embed
}