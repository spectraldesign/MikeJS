exports.run = (client, message, args) => {
    if(args.length == 1 && isNumber(args[0])){
        var amount = parseInt(args[0]) 
        if(amount <= 1) return message.channel.send("Roll amount needs to at least be 2.")
        const num = Math.floor(Math.random() * (amount));
        message.channel.send(`Rolled: ${num+1}`)
    } 
    else if(args.length == 2 && isNumber(args[0]) && isNumber(args[1])){
        var number = parseInt([args[0]])
        var amount = parseInt(args[1])
        const a = number
        if(amount <= 1) return message.channel.send("Roll amount needs to at least be 2.")
        var string = ""
        var total = 0
        while(number > 0){
            var num = Math.floor(Math.random() * (amount))+1
            total += num
            string += num + "|"
            number --;
        }
        string += "\n" + "Avg: " + (total/a)
        message.channel.send(string);
    }
}

//See if n can be parsed as integer
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }