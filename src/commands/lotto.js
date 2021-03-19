exports.run = (client, message, args) => {
    var selNum = []
    var number = 7
    var amount = 34
    var string = ""
    while(number > 0){
        var num = Math.floor(Math.random() * (amount))+1
        if(selNum.includes(num)) continue;
        else{
            number --;
            selNum.push(num)
        }
    }
    selNum.sort((a, b) => a - b)
    selNum.forEach(element => {
        string += element + " | "
    });
    message.channel.send(string);
}

//See if n can be parsed as integer
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!lotto help:")
	embed.setDescription(`\`!lotto\` | Provides you with lotto numbers, following the rules for Norsk Tipping's Lotto`)
	return embed
}