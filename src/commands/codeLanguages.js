exports.run = (client, message, args) => {
    if(args.length < 1) return errorMessage(client, message)
    const [command, args2] = message.content
            .trim()
            .substring(client.config.prefix.length)
            .split(/\s+/);
    const msg = message.content.trim().substring(command.length+2);
    const lang = client.config.languages[command]
    message.delete(message)
    message.channel.send(`${lang}\n${msg} \`\`\`Sent by: ${message.author.username}`)
}

const { MessageEmbed } = require('discord.js')

function errorMessage(client, message){
    const embed = new MessageEmbed()
                            .setTitle('Wrong usage:')
                            .setDescription("Please use the format !<symbol for language> <code> | The <code> part was missing from the last command call.")
                            .setColor('#b52121')

    message.channel.send(embed)
}

module.exports.conf = {
    aliases: ['p', 'j', 'h', 'ass', 'js']
}