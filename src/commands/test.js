exports.run = async (client, message, args) => {
    let msg = await message.channel.send('Test successfully completed I suppose.').catch(console.error)
    msg.edit(`Test successfully completed I suppose. \`Latency: ${msg.createdAt - message.createdAt}ms\``)
}

module.exports.conf = {
    aliases: ['t']
}