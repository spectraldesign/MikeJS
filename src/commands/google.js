const googleIt = require('google-it')
const { MessageEmbed } = require('discord.js')
exports.run = (client, message, args) => {
    if(args.length==0) return message.channel.send("Wrong use of !google, do !help google for proper usage.")
    let embed = new MessageEmbed()
    googleIt({'query': args.join(" "), 'no-display': true}).then(results => {
        embed.setTitle(results[0].title)
        embed.setURL(results[0].link)
        embed.setDescription(results[0].snippet.split('\n')[0] + "...")
        message.channel.send(embed)
    }).catch(err => {
        message.channel.send("An error occured!")
        console.log(err)
    })
}

module.exports.help = () => {
	let embed = new MessageEmbed()
	embed.setTitle("!google help:")
	embed.setDescription(`\`!google <query>\` | Returns the first google result for <query>`)
	return embed
}