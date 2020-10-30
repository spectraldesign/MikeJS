exports.run = (client, message, args) => {
    message.delete(message)
    message.channel.send(args.join(" ")).catch(console.error)
}