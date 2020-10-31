require ('dotenv').config()
const Discord = require ('discord.js')
const Enmap = require('enmap')
const fs = require('fs')

const mongoose = require('mongoose')
//mongoose.connect('mongodb://127.0.0.1:27017/mikeJS', {useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect('mongodb+srv://dbAdmin:Spectral98@cluster0.felle.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.once('open', _ => {
    console.log('Database connected.')
})
db.on('error', err => {
    console.error(console, 'Connection error.')
})


const client = new Discord.Client()
const config = require ('./src/config.json')
const remindDB = require('./src/db/remindDB')
const message = require('./src/events/message')

client.config = config  //Load config to client so you can access from everywhere

fs.readdir('./src/events/', (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        const event = require(`./src/events/${file}`)
        let eventName = file.split('.')[0]
        client.on(eventName, event.bind(null, client))
    })
})


client.commands = new Enmap()

fs.readdir('./src/commands/', (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        let props = require(`./src/commands/${file}`)
        let commandName = file.split('.') [0]
        console.log(`Attempting to load command ${commandName}`)
        client.commands.set(commandName, props)
    })
})

console.log(process.env.TOKEN)
client.login(process.env.TOKEN);

const Remind = require('./src/db/remindDB.js')
client.on('ready', () => {
    client.user.setPresence({
        activity: { name: 'Haskell speedrun', type: 'STREAMING', url: 'https://www.twitch.tv/spectraldesign_' }, 
        status: 'active' })
    .catch(console.error);

    setInterval(async () => {
        let unfinished = await Remind.find({isComplete:false, endTime:{$lte: Date.now()}})
        unfinished.forEach(remind =>{
            client.commands.get('remind').undo(client, remind)
        })
    },2000)
    });