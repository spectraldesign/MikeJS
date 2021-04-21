exports.run = (client, message, args) => {
    if(args.length == 1 && isNumber(args[0])){
        var amount = parseInt(args[0]) 
        if(amount <= 1) return message.channel.send("Roll amount needs to at least be 2.")
        const num = Math.floor(Math.random() * (amount));
        message.channel.send(`Rolled: ${num+1}`)
    } 
    else if(args.length == 2 && isNumber(args[0]) && isNumber(args[1])){
        var number = parseInt([args[0]])
        var amount = parseInt(args[1])
        const a = number
        if(amount <= 1) return message.channel.send("Roll amount needs to at least be 2.")
        var string = ""
        var total = 0
        while(number > 0){
            var num = Math.floor(Math.random() * (amount))+1
            total += num
            string += num + "|"
            number --;
        }
        if(string.length > 4000){
            return message.channel.send("Bruh wtf u think u doin stop it, limit is 4k characters for now jfc behave yourself. Avg was " + (total/a) + " though.")
        }
        while(string.length > 1999){
            message.channel.send(string.substring(0, 2000))
            string = string.substring(2000, )
        }
        string += "\n" + "Avg: " + (total/a)
        message.channel.send(string);
    }
}

//See if n can be parsed as integer
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!roll help:")
	embed.setDescription(`\`!roll <bound>\` | Returns a random number from 1 to <bound>\n\`!roll <number> <bound>\` | Returns <number> amount of random numbers from 1 to <bound>`)
	return embed
}