exports.run = (client, message, args) => {
    if(args.length != 1) return message.channel.send("Wrong use of !help. Proper usage: `!help <command>` where <command> is from the list in <!commands>")
    let command = args[0]
    let cmd = client.commands.get(command)
    if(!cmd){
        cmd = client.aliases.get(command)
    }
    if(!cmd){
        return message.channel.send("Command not recognized")
    }
    let isHelp = cmd?.help
    if(!isHelp) return message.channel.send("No help available for this command")
    message.channel.send(cmd.help())
}

const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!help help:")
	embed.setDescription(`\`!help <command>\` | Displays help for <command>. <command> must be from the list provided in \`!commands\``)
	return embed
}