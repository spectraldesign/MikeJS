const music = require("../helpFunctions/music")
exports.run = (client, message, args) => {
    music.nowPlaying(message)
}

module.exports.conf = {
    aliases: ['playing', 'current']
}