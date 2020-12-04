module.exports.run = (message, user, roleName) => {
    var role = message.guild.roles.cache.find(role => role.name === roleName)
    if(!role) return message.channel.send("Role not found")
    if(user.roles.cache.find(role => role.name === roleName)){
        user.roles.remove(role).catch(err => console.log(err))
        return message.channel.send(`Role ${roleName} has been removed`)
    }
    user.roles.add(role).catch(err => console.log(err))
    message.channel.send(`Added role ${roleName} to user`)
}