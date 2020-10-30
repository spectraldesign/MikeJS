exports.run = (client, message, args) => {
    if(message.author.id != client.config.ownerID) return message.channel.send("You do not have permission to use this command.")
    client.destroy()
    process.exit(1)
}