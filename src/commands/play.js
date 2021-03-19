const music = require("../helpFunctions/music")
const Keywords = require('../db/keywordDB.js')
exports.run = async (client, message, args) => {
    var audioChannel = message.member.voice.channel
    if(!audioChannel) return message.channel.send("You are not in a voice chat, so you can't tell me what to play bitsj")
    if(args.length < 1) return message.channel.send("Illegal use of !play. Please do !play <youtube url>")

    var urlReg = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/

    if(args[0].match(urlReg)){
        music.run(message)
    }
    else{
        await Keywords.findOne({keyword: args[0].toLowerCase()}, function (err, foundObject){
            if(err){
                console.log(err)
            }
            else if(!foundObject) return message.channel.send("Illegal url and keyword, only valid YouTube url and registered keywords allowed for now. Do `!keywords` for a list of keywords.")
            else{
                music.run(message, foundObject.url)
            }
        })  
    }
}