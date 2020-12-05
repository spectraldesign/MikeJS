const music = require("../helpFunctions/music")
const prefix = require("../config.json").prefix

exports.run = (client, message, args) => {
    var audioChannel = message.member.voice.channel
    if(!message.guild.voice){
        return message.channel.send("There is no music to skip.");
    }
    if(audioChannel != message.guild.voice.channel) return message.channel.send("We are not in the same VC, so you can't tell me to skip a song")
    else music.run(message)
}