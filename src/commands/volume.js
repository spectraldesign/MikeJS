const music = require("../helpFunctions/music")
const prefix = require("../config.json").prefix

exports.run = (client, message, args) => {
    var audioChannel = message.member.voice.channel
    if(!message.guild.voice){
        return message.channel.send("NO U");
    }
    if(audioChannel != message.guild.voice.channel) return message.channel.send("We are not in the same VC, so you can't tell me what to do")
    else music.run(message)
}