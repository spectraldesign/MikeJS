const queue = new Map();
const ytdl = require("ytdl-core");
const prefix = require("../config.json").prefix
const { MessageEmbed } = require('discord.js')

module.exports.run = (message, url) => {
  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue, url);
    return;
  } 
  else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } 
  else if (message.content.startsWith(`${prefix}stop`) || message.content.startsWith(`${prefix}leave`)) {
    stop(message, serverQueue);
    return;
  }
  else if (message.content.startsWith(`${prefix}volume`)) {
    volume(message, serverQueue);
    return;
  }
}

function volume(message, serverQueue){
  const args = message.content.trim().split(/ +/g)
  if(args.length >= 1){
    const vol = args[1]
    if(!isNaN(parseInt(vol)) && isFinite(vol)){
      const volInt = parseInt(vol)
      if(volInt > 100 || volInt < 0){
        return message.channel.send("Wrong use of !volume, do !volume <int between 0 and 100>")
      }
      const dispatcher = serverQueue.connection.dispatcher
      dispatcher.setVolume(volInt/100)
      message.channel.send(`Volume set to ${volInt} `)
    }
    
  }
  else{
    message.channel.send("Wrong use of !volume, do !volume <int between 0 and 100>")
  }

}

async function execute(message, serverQueue, url) {
  const args = message.content.trim().split(/ +/g)

  const voiceChannel = message.member.voice.channel;
  if(url) args[1] = url
  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        length: songInfo.videoDetails.lengthSeconds,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } 
  else {
    serverQueue.songs.push(song);
    return message.channel.send(`**${song.title}** added to queue.`);
  }
}

function skip(message, serverQueue) {
  if (!serverQueue)
    return message.channel.send("Queue is empty, no song to skip.");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  serverQueue.songs = [];
  npList = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Now playing: **${song.title}**`);
}

module.exports.printQueue = (message) => {
  if(!queue.get(message.guild.id)) return message.channel.send("No music playing.")
  const queue2 = queue.get(message.guild.id).songs.slice(0)
  if(queue2.length == 0) return message.channel.send("Queue is empty.")
  var string = ""
  const embed = new MessageEmbed
  embed.setTitle("Now playing:")
  string += `${queue2[0].title}\n\n**Queue:**\n`
  for(var i=1; i<queue2.length; i++){
    string += (i) + ". " + queue2[i].title + "\n"
  }
  embed.setDescription(string)
  embed.setColor('#32a862')
  message.channel.send(embed)
}

let npList = []

module.exports.nowPlaying = (message) => {
  if(!queue.get(message.guild.id)) return message.channel.send("No music playing.")
  const serverQueue = queue.get(message.guild.id);
  const song = serverQueue.songs[0]
  const dispatcher = serverQueue.connection.dispatcher
  let currentTime = dispatcher.streamTime / 1000  //How much is played, in int
  const fullTime = song.length //How long current song is, in int
  let bar = createBar(currentTime, fullTime)
  const embed = new MessageEmbed
  embed.setTitle(song.title)
  embed.setURL(song.url)
  embed.setDescription(bar)
  message.channel.send(embed).then((msg) => {
      npList.push({msg: msg, song: song})
    });
}

module.exports.updateNp = () => {
  if(npList.length == 0) return
  while(npList.length > 1){
    let np = npList.shift()
    const embed = new MessageEmbed
    embed.setTitle(np.song.title)
    embed.setURL(np.song.url)
    embed.setDescription("A new !np has been created, no longer updating this")
    np.msg.edit(embed);
  }
  let np = npList[0]
  let msg = np.msg;
  const serverQueue = queue.get(msg.guild.id);
  if(np.song === serverQueue?.songs[0]){
    const song = serverQueue.songs[0]
    const dispatcher = serverQueue.connection.dispatcher
    let currentTime = dispatcher.streamTime / 1000  //How much is played, in int
    const fullTime = song.length //How long current song is, in int
    let bar = createBar(currentTime, fullTime)
    const embed = new MessageEmbed
    embed.setTitle(song.title)
    embed.setURL(song.url)
    embed.setDescription(bar)
    msg.edit(embed)
  }
  else{
      const embed = new MessageEmbed
      embed.setTitle(np.song.title)
      embed.setURL(np.song.url)
      embed.setDescription("Song no longer playing.")
      msg.edit(embed)
      npList = []
      return
  }
            
}

function createBar(currentTime, fullTime){
  const progress = Math.floor((currentTime / fullTime) * 20) //Get percentage
  const progressString = formatSeconds(currentTime) + " " + "▬".repeat(progress) + "◯" + "▬".repeat(20-progress) + " " + formatSeconds(fullTime)
  return progressString;
}

function formatSeconds(seconds){
  let hours = Math.floor(seconds/3600)
  let minutes = Math.floor(seconds/60)
  let onlyseconds = Math.floor(seconds % 60)
  var timestring
  if(hours != 0){
    timestring = `${hours}h ${minutes}m ${onlyseconds}s`
  }
  else if(minutes != 0){
    timestring = `${minutes}m ${onlyseconds}s`
  }
  else{
    timestring =  `${onlyseconds}s`
  }
  return timestring;
}