const music = require("../helpFunctions/music")
exports.run = (client, message, args) => {
    var audioChannel = message.member.voice.channel
    if(!audioChannel) return message.channel.send("You are not in a voice chat, so you can't tell me what to play bitsj")
    if(args.length < 1) return message.channel.send("Illegal use of !play. Please do !play <youtube url>")

    var urlReg = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/

    if(args[0].match(urlReg)){
        music.run(message)
    }
    else{
        message.channel.send("Illegal url, only valid YouTube links supported for now")
    }
}