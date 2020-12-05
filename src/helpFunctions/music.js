const queue = new Map();
const ytdl = require("ytdl-core");
const prefix = require("../config.json").prefix
const { MessageEmbed } = require('discord.js')

module.exports.run = (message) => {
  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
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
}

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
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
  string += `${queue2[0].title}\n\nQueue:\n`
  for(var i=1; i<queue2.length; i++){
    string += (i) + ". " + queue2[i].title + "\n"
  }
  embed.setDescription(string)
  embed.setColor('#32a862')
  message.channel.send(embed)
}