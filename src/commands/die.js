const { MessageManager } = require("discord.js")
const addRole = require("../helpFunctions/addRole")
const roleName = "dead"
exports.run = (client, message, args) => {
    const user = message.member
    addRole.run(message, user, roleName) 
}

module.exports.conf = {
    aliases: ['suicide', 'seppuku', 'sudoku', 'kms']
}