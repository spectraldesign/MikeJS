const { MessageManager } = require("discord.js")

const addRole = require("../helpFunctions/addRole")
const roleName = "RAGEQUIT BOIS"
exports.run = (client, message, args) => {
    const user = message.mentions.members.first()
    if(!user) return message.channel.send("Wrong use of !ragequit, proper use !ragequit @mention")
    addRole.run(message, user, roleName) 
}


const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!ragequit help:")
	embed.setDescription(`\`!ragequit <@user>\` | Gives <@user> the RAGEQUIT BOIS role if available`)
	return embed
}