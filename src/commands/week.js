exports.run = (client, message, args) => {
    if(args.length == 1 && isNumber(args[0])){
        var week = parseInt(args[0])
        if(week > 52 || week < 1) return message.channel.send("Thats not a valid week bruv...") 
        let weekInfo = getDateRangeOfWeek(week)
        return message.channel.send(`Week ${week} starts on ${weekInfo.start} and ends on ${weekInfo.end} :calendar:`)
    }
    let date = new Date(Date.now())
    let nowString = `${date.getUTCDate()}.${date.getMonth()+1}.${date.getFullYear()}`

    let weekNum = getWeekNumber(new Date())
    message.channel.send(`It is currently week ${weekNum}, the date is ${nowString} :calendar:`)
}
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}

function getDateRangeOfWeek(weekNo){
    var d1 = new Date();
    let numOfdaysPastSinceLastMonday = eval(d1.getDay()- 1);
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
    var weekNoToday = getWeek(d1);
    var weeksInTheFuture = eval( weekNo - weekNoToday );
    d1.setDate(d1.getDate() + eval( 7 * weeksInTheFuture ));
    var rangeIsFrom = d1.getDate() + "." + eval(d1.getMonth()+1) + "." + d1.getFullYear();
    d1.setDate(d1.getDate() + 6);
    var rangeIsTo =  d1.getDate() + "." + eval(d1.getMonth()+1) + "." + d1.getFullYear() ;
    return {
        start: rangeIsFrom,
        end: rangeIsTo
    }
}

function getWeek(date) { 
    // Create a copy of this date object  
    var target  = new Date(date.valueOf());  
  
    // ISO week date weeks start on monday, so correct the day number  
    var dayNr   = (date.getDay() + 6) % 7;  
  
    // Set the target to the thursday of this week so the  
    // target date is in the right year  
    target.setDate(target.getDate() - dayNr + 3);  
  
    // ISO 8601 states that week 1 is the week with january 4th in it  
    var jan4    = new Date(target.getFullYear(), 0, 4);  
  
    // Number of days between target date and january 4th  
    var dayDiff = (target - jan4) / 86400000;    
  
    if(new Date(target.getFullYear(), 0, 1).getDay() < 5) {
      // Calculate week number: Week 1 (january 4th) plus the    
      // number of weeks between target date and january 4th    
      return 1 + Math.ceil(dayDiff / 7);    
    }
    else {  // jan 4th is on the next week (so next week is week 1)
      return Math.ceil(dayDiff / 7); 
    }
  }


//See if n can be parsed as integer
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports.conf = {
    aliases: ['w']
}

