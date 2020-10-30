exports.run = (client, message, args) => {
    message.channel.send('Test successfully completed I suppose.').catch(console.error)
}