const { MessageEmbed } = require('discord.js')
exports.run = (client, message, args) => {
    let embed = new MessageEmbed();
    embed.setTitle("MikeJS")
    embed.setDescription("Discord bot written in JavaScript using discord.js.\nDo `!commands` for a list of commands.")
    embed.setImage(client.user.avatarURL()+"?size=1024")
    embed.setFooter("Created by Spectral")
    message.channel.send(embed);
}
