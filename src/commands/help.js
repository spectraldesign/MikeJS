exports.run = (client, message, args) => {
    if(args.length != 1) return message.channel.send("Wrong use of !help. Proper usage: `!help <command>` where <command> is from the list in <!commands>")
    let commandName = args[0]
    if(!(client.commandList.includes(commandName))){
        return message.channel.send("Command not recognized.")
    }
    let rcmd = require(`./${commandName}.js`)
    let isHelp = rcmd?.help
    if(!isHelp) return message.channel.send("No help available for this command")
    message.channel.send(rcmd.help())
}

const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!help help:")
	embed.setDescription(`\`!help <command>\` | Displays help for <command>. <command> must be from the list provided in \`!commands\``)
	return embed
}