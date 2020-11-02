const { DMChannel } = require("discord.js")
const Poll = require('../db/pollDB.js')
const UpdatePoll = require('../helpFunctions/updatePoll.js')

module.exports = async (client, reaction, user) => {
    let message = reaction.message
    //Ignore bots:
    if(!message.author.bot) return

    if(user.bot) return

    //Respond to DMs
    if(message.channel instanceof DMChannel){
        return
    }

    let foundPoll = await Poll.findOne({isComplete:false, messageID:reaction.message.id})

    if(!foundPoll) return
 
    UpdatePoll.run(client, foundPoll, foundPoll.guildID, foundPoll.channelID)
}