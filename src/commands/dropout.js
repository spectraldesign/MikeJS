const { MessageManager } = require("discord.js")

const addRole = require("../helpFunctions/addRole")
const roleName = "Uni Dropout GANG"
exports.run = (client, message, args) => {
    const user = message.member
    addRole.run(message, user, roleName) 
}


const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!dropout help:")
	embed.setDescription(`\`!dropout\` | No more uni, no more Magne and INF222 :pray:`)
	return embed
}