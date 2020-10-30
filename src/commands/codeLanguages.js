exports.run = (client, message, args) => {
    const [command, args2] = message.content
            .trim()
            .substring(client.config.prefix.length)
            .split(/\s+/);
    const msg = message.content.trim().substring(command.length+2);
    const lang = client.config.languages[command]
    message.delete(message)
    message.channel.send(`${lang}\n${msg} \`\`\`Sent by: ${message.author.username}`)
}