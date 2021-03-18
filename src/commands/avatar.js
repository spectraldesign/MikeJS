const Discord = require('discord.js')

exports.run = (client, message, args) => {
    const user = getUserFromMention(client, args[0])
    if(!user) return message.channel.send('Illegal use of !avatar, proper usage: `!avatar @member`')

    const embed = new Discord.MessageEmbed()
                            .setTitle(`${user.username}'s avatar:`)
                            .setImage(user.displayAvatarURL({ dynamic: true })+"?size=1024")
    message.channel.send(embed)
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