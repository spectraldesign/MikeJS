exports.run = (client, message, args) => {
    if(args.length == 1 && isNumber(args[0])){
        var amount = parseInt(args[0]) 
        if(amount <= 1) return message.channel.send("Roll amount needs to at least be 2.")
        const num = Math.floor(Math.random() * (amount));
        message.channel.send(`Rolled: ${num+1}`)
    } 
}

//See if n can be parsed as integer
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }