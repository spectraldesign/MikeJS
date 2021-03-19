require ('dotenv').config()
const Discord = require ('discord.js')
const Enmap = require('enmap')
const fs = require('fs')

const mongoose = require('mongoose')
//mongoose.connect('mongodb://127.0.0.1:27017/mikeJS', {useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(process.env.DBTOKEN, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.once('open', _ => {
    console.log('Database connected.')
})
db.on('error', err => {
    console.error(console, 'Connection error.')
})


const client = new Discord.Client()
const config = require ('./src/config.json')

client.config = config  //Load config to client so you can access from everywhere

fs.readdir('./src/events/', (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        const event = require(`./src/events/${file}`)
        let eventName = file.split('.')[0]
        client.on(eventName, event.bind(null, client))
    })
})

client.commandList = []
client.commands = new Enmap()
client.aliases = new Enmap()
fs.readdir('./src/commands/', (err, cmds) => {
    if (err) return console.error(err)
    cmds.forEach(cmd => {
        if (!cmd.endsWith('.js')) return
        let rcmd = require(`./src/commands/${cmd}`)
        let commandName = cmd.split('.') [0]
        client.commands.set(commandName, rcmd)
        client.commandList.push(commandName)
        if(rcmd.conf?.aliases?.length > 0){
            rcmd.conf.aliases.forEach(alias => client.aliases.set(alias, rcmd))
        }
    })
    console.log('All commands loaded.')
})



client.login(process.env.TOKEN).catch(e => console.log(process.env.TOKEN))

const Remind = require('./src/db/remindDB.js')
const Poll = require('./src/db/pollDB.js')
const Music = require('./src/helpFunctions/music')

client.on('ready', () => {
    client.user.setPresence({
        activity: { name: 'Haskell speedrun', type: 'STREAMING', url: 'https://www.twitch.tv/spectraldesign_' }, 
        status: 'active' })
    .catch(console.error);

    setInterval(async () => {
        let unfinishedRemind = await Remind.find({isComplete:false, endTime:{$lte: Date.now()}})
        unfinishedRemind.forEach(remind =>{
            client.commands.get('remind').undo(client, remind)
        })

        let unfinishedPoll = await Poll.find({isComplete:false, endTime:{$lte: Date.now()}})
        unfinishedPoll.forEach(poll =>{
            client.commands.get('poll').undo(client, poll)
        })
    },2000)

    setInterval(async () => {
        Music.updateNp()
    }, 5000)
});


