const fs = require('fs')
const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
    await fs.readdir('./src/commands/', async (err, files) => {
        if (err) return console.error(err)
        let cmds = []
        await files.forEach(file => {
            if (!file.endsWith('.js')) return
            let commandName = file.split('.') [0]
            if(commandName == 'r' ||  commandName == 'reload' || commandName == 'shutdown' || commandName == 'clear' ||commandName == 'codeLanguages') return
            cmds.push(client.config.prefix + commandName)
            
        })
        cmds.push(' ')
        cmds.push('Code Languages:')
        let languages = client.config.languages
        for (const [key, value] of Object.entries(languages)) {
            cmds.push(client.config.prefix + key + ' <code>')
          }
        buildEmbed(client, message, cmds)
    })
}

function buildEmbed(client, message, cmds){
    cmds = cmds.join("\n")
    const embed = new MessageEmbed()
                            .setTitle('Commands for MikeJS:')
                            .setDescription(cmds)

    message.channel.send(embed)
}