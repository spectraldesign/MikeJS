var axios = require("axios").default;

var options = {
    method: 'GET',
    url: 'https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate',
    params: {source: '', target: '', input: ''},
    headers: {
      'x-rapidapi-key': '5207ec6196msh8cb888e6785dbe9p1680a0jsna779a5e91867',
      'x-rapidapi-host': 'systran-systran-platform-for-language-processing-v1.p.rapidapi.com'
    }
};

exports.run = async (client, message, args) => {
    if(args.length < 3) return message.channel.send("Wrong use of !translate, do `!help translate` to see proper usage.")
    const from = args[0]
    const to = args[1]
    if(from.length != 2 || to.length != 2) return message.channel.send("Wrong use of !translate, do `!help translate` to see proper usage.")
    const msg = args.slice(2,).join(" ")
    options.params = {
        source : from, 
        target : to,
        input : msg
    }
    message.channel.send("Submitted message to API").then(sentmsg => {
        let time = Date.now()
        axios.request(options).then(function (response) {
            sentmsg.edit(`Translated message: ${response.data.outputs[0].output} | API latency: \`` + ((Date.now()) - time) + "ms`");
        }).catch(function (error) {
            sentmsg.edit("Translation errored, probably due to shit API :( | API latency: `" + ((Date.now()) - time) + "ms`");
        });
    })
    
}

const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!translate help:")
	embed.setDescription(`\`!translate <from> <to> <message>\` | Translates message. Note: <from> and <to> needs to be two character language code. Example: en => english`)
	return embed
}

module.exports.conf = {
    aliases: ['t', 'translate', 'oversett', 'tl']
}