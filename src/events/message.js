const { DMChannel } = require("discord.js")

module.exports = (client, message) => {
    //Ignore bots:
    if(message.author.bot) return

    //Respond to DMs
    if(message.channel instanceof DMChannel){
        message.reply("I am currently busy coding haskell so i cannot currently answer your DMs.")
        return
    }

    //Ignore message without prefix
    if(message.content.indexOf(client.config.prefix) != 0) return
    
    //Standard argument/command name definition
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g)
    var command = args.shift().toLowerCase()

    if(command in client.config.languages){
        command = "codeLanguages"
    }
    if(command == "suicide" || command == "dead") command = "die"

    //Grab command data from client.commands Enmap
    let cmd = client.commands.get(command)
    
    if(!cmd) cmd = client.aliases.get(command)
    if(!cmd) return

    cmd.run(client, message, args)
}