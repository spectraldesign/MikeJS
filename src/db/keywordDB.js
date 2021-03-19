const mongoose = require('mongoose')

const keywordSchema = mongoose.Schema({
    keyword: String,
    url: String,
})
module.exports = mongoose.model('Keywords', keywordSchema)