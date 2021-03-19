exports.run = (client, message, args) => {
    if(args.length == 1){
        let date = args[0]
        if(date.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)){
            let dateArr = date.split('.')
            const dateObject = new Date(dateArr[2], (dateArr[1] - 1), dateArr[0])
            const currentTime = new Date(Date.now());
            const diffTime = (dateObject - currentTime);
            if(diffTime < 0){
                return message.channel.send("The date you entered has alread passed.")
            }
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            return message.channel.send(`${diffDays} days until ${date}`)
        }
        else{
            message.channel.send("Error on parsing date, please use format dd.mm.yy. Example: `!daysuntil 25.06.2021`")
        }
    }
    else{
        return message.channel.send("Wrong formatting, should be `!daysuntil dd.mm.yy`. Example: `!daysuntil 25.06.2021`")
    }
}


//See if n can be parsed as integer
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports.conf = {
    aliases: ['howlong', 'numdays', 'timeuntil', 'days']
}

const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!daysuntil help:")
	embed.setDescription(`\`!daysuntil <dd.mm.yy>\` | Returns the amount of days until the provided date.`)
	return embed
}