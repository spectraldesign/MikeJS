const { Message, MessageEmbed } = require("discord.js")
const Discord = require('discord.js')

exports.run = (client, message, args) => {
    if(message.author.id != client.config.ownerID) return message.channel.send("You do not have permission to use this command.")
    if(args.length == 1 && isNumber(args[0])){
        var amount = parseInt(args[0]) 
        amount = amount+1
        if(amount>=100) return message.channel.send("Integer value must be less than or equal to 99 due to API restrictions")
    
        async function clear() {
            const fetched = await message.channel.messages.fetch({limit: amount});
            message.channel.bulkDelete(fetched);
        }
        clear();

        message.channel.send(`Removed **${amount-1}** messages.`)
    }
    else{
        //Error handling
        const embed = new Discord.MessageEmbed()
                            .setTitle('Wrong usage of !clear')
                            .setDescription("Proper usage: `!clear <integer>`")
                            .setColor('#b52121')

        message.channel.send(embed)
    }
}

//See if n can be parsed as integer
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }