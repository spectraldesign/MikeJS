exports.run = (client, message, args) => {
    var audioChannel = message.member.voice.channel
    if(!message.guild.voice){
        return message.channel.send("I am not in a voice chat, so I cannot leave.");
    }

    if(audioChannel != message.guild.voice.channel) return message.channel.send("We are not in the same VC, so you can't tell me to leave")
    else audioChannel.leave();
}