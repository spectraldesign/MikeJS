const mongoose = require('mongoose')

const remindSchema = mongoose.Schema({
    authorID: String,
    guildID: String,
    channelID: String,
    messageID: String,
    duration: String,
    endTime: String,
    isComplete: mongoose.Schema.Types.Boolean,
    rmessage: String
})
module.exports = mongoose.model('Remind', remindSchema)