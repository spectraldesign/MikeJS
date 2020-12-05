const music = require("../helpFunctions/music")
exports.run = (client, message, args) => {
    music.printQueue(message)
}