exports.run = async (client, message, args) => {
    if(message.author.id != client.config.ownerID) return message.channel.send("You do not have permission to use this command.")

    let res = eval(args.join(' '))
    await message.channel.send(res).catch(e => {});
    console.log(res)

  };