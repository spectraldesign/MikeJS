const { MessageManager } = require("discord.js")

const addRole = require("../helpFunctions/addRole")
const roleName = "RAGEQUIT BOIS"
exports.run = (client, message, args) => {
    const user = message.mentions.members.first()
    if(!user) return message.channel.send("Wrong use of !ragequit, proper use !ragequit @mention")
    addRole.run(message, user, roleName) 
}