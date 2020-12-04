exports.run = (client, message, args) => {
    var audioChannel = message.member.voice.channel
    if(!audioChannel) return message.channel.send("Not in a voice chat, so I cannot join.")
    else audioChannel.join().catch(err => console.log(err));
}