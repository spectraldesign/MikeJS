const Keywords = require('../db/keywordDB.js')
exports.run = async (client, message, args) => {
    var urlReg = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    if(args.length < 2) return message.channel.send("Wrong use of `!keyword`. Correct usage: `!keyword <keyword> <youtube_url>`")
    if(args[1].match(urlReg)){
        await Keywords.findOneAndUpdate({keyword: args[0].toLowerCase()},{url: args[1]}, {upsert: true}, function (err, foundObject){
            if(err){
                console.log(err)
            }
            return message.channel.send(`Successfully added/updated keyword **${args[0].toLowerCase()}** to link <${args[1]}>`)
        })
    }
    else return message.channel.send("Could not parse url. Correct usage: `!keyword <keyword> <youtube_url>`")
}

module.exports.conf = {
    aliases: ['kw', 'kiwurd']
}