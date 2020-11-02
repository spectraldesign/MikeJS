module.exports.run = (message, time) => {
    let duration = 0
    if(time.match(/\d+d\d+h\d+m/)){
        let timeS = time.match(/\d+/g)
        if(timeS[0] > 1825) return message.channel.send('Amount of days cannot exceed 1825 (5 years)')
        else if(timeS[1] > 24) return message.channel.send('Amount of hours cannot exceed 24 (1 day)')
        else if(timeS[2] > 60) return message.channel.send('Amount of minutes cannot exceed 60 (1 hour)')
        let durDay = timeS[0]*24*60*60*1000
        let durHour = timeS[1]*60*60*1000
        let durMin = timeS[2]*60*1000
        duration = durDay + durHour + durMin
        return duration
        
    }
    else if(time.match(/\d+d\d+h/)){
        let timeS = time.match(/\d+/g)
        if(timeS[0] > 1825) return message.channel.send('Amount of days cannot exceed 1825 (5 years)')
        else if(timeS[1] > 24) return message.channel.send('Amount of hours cannot exceed 24 (1 day)')
        let durDay = timeS[0]*24*60*60*1000
        let durHour = timeS[1]*60*60*1000
        duration = durDay + durHour
        return duration
    }
    else if(time.match(/\d+h\d+m/)){
        let timeS = time.match(/\d+/g)
        if(timeS[0] > 24) return message.channel.send('Amount of hours cannot exceed 24 (1 day)')
        else if(timeS[1] > 60) return message.channel.send('Amount of minutes cannot exceed 60 (1 hour)')
        else{
            let durHour = timeS[0]*60*60*1000
            let durMin = timeS[1]*60*1000
            duration = durHour+ durMin
            return duration
        }
        
    }
    else if(time.match(/\d+d/)){
        let timeS = time.match(/\d+/g)
        if(timeS[0] > 1825) return message.channel.send('Amount of days cannot exceed 1825 (5 years)')
        let durDay = timeS[0]*24*60*60*1000
        duration = durDay
        return duration
    }
    else if(time.match(/\d+h/)){
        let timeS = time.match(/\d+/g)
        if(timeS[0] > 24) return message.channel.send('Amount of hours cannot exceed 24 (1 day)')
        let durHour = timeS[0]*60*60*1000
        duration = durHour
        return duration
    }
    else if(time.match(/\d+m/)){
        let timeS = time.match(/\d+/g)
        if(timeS[0] > 60) return message.channel.send('Amount of minutes cannot exceed 60 (1 hour)')
        let durMin = timeS[0]*60*1000
        duration = durMin
        return duration
    }
    else{
        return message.channel.send("Incorrect use of command, to see proper usage do `!<name of command>`")
    }
}