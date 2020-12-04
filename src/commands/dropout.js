const { MessageManager } = require("discord.js")

const addRole = require("../helpFunctions/addRole")
const roleName = "Uni Dropout GANG"
exports.run = (client, message, args) => {
    const user = message.member
    addRole.run(message, user, roleName) 
}