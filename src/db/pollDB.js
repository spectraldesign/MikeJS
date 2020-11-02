const mongoose = require('mongoose')

const pollSchema = mongoose.Schema({
    authorID: String,
    guildID: String,
    channelID: String,
    messageID: String,
    duration: String,
    endTime: String,
    isComplete: mongoose.Schema.Types.Boolean,
    options: String
})
module.exports = mongoose.model('Poll', pollSchema)