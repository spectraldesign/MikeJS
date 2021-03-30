const googleIt = require('google-it')
const { MessageEmbed } = require('discord.js')
exports.run = (client, message, args) => {
    if(args.length==0) return message.channel.send("Wrong use of !google, do !help google for proper usage.")
    let embed = new MessageEmbed()
    googleIt({'query': args.join(" "), 'no-display': true}).then(results => {
        if(results.length == 0) return message.channel.send("No results for query.")
        embed.setTitle(results[0].title)
        embed.setURL(results[0].link)
        let split = results[0].snippet.split('\n')
        let description = ''
        if(split[0].length > 20){
            description = split[0] + "..."
        }
        else{
            description = results[0].snippet.split('\n').join("").split(',').join(', ').slice(0,500) + "..."
        }
        embed.setDescription(description)
        message.channel.send(embed)
    }).catch(err => {
        message.channel.send("An error occurred!")
        console.log(err)
    })
}

module.exports.help = () => {
	let embed = new MessageEmbed()
	embed.setTitle("!google help:")
	embed.setDescription(`\`!google <query>\` | Returns the first google result for <query>`)
	return embed
}
