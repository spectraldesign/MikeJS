const axios = require('axios');
const url = "https://api.met.no/weatherapi/locationforecast/2.0/compact?";
const weatherMap = {
    'cloudy' : ':cloud:',
    'heavyrain' : ':cloud_rain:',
    'fair_day' : ':white_sun_small_cloud:',
    'clearsky_day' : ':sunny:',
    'partlycloudy_day' : ':partly_sunny:', 
    'lightrainshowers_day' : ':white_sun_rain_cloud:',
    'rainshowers_day' : ':white_sun_rain_cloud:',
    'lightrain' : ':cloud_rain:',
    'rain' : ':cloud_rain:',
    'rainshowers_night': ':white_sun_rain_cloud:',
    'partlycloudy_night': ':partly_sunny:',
    'clearsky_night' : ':sunny:',
    'fair_night' : ':white_sun_small_cloud:',
    'snow' : ':cloud_snow:',
    'lightrainshowers_night' : ':white_sun_rain_cloud:'
}
const positionstack = "475698d03e1914873c67204d7219bcd6"

exports.run = async (client, message, args) => {
    var lat = ""
    var lon = ""
    if(args.length > 0){
        let place = args.join(" ").toLowerCase()
        place = place.replace(/ø/g, 'oe').replace(/æ/g, 'ae').replace(/å/g, 'aa')
        if(!/^[a-zA-Z\s]+$/.test(place)){
            return message.channel.send("Illegal characters in location")
        }
        await axios.get(`http://api.positionstack.com/v1/forward?access_key=${positionstack}&query=${place}&output=json`).then(response => {
            lat = response.data.data[0]?.latitude
            lon = response.data.data[0]?.longitude
        })
        .catch(error => {
            console.log(error)
        })
        if((!lat || !lon)){
            message.channel.send("Illegal location")
        }
        else{
            lat = Math.round(lat * 100) / 100
            lon = Math.round(lon * 100) / 100
            let latLon = `Lat: ${lat}, Lon: ${lon}`
            getWeather(url+`lat=${lat}&lon=${lon}`, place, message, client, latLon)
        }
    }
    else{
        let latLon = `Lat: 60.38, Lon: 5.33`
        getWeather(url+"lat=60.38&lon=5.33", "Bergen", message, client, latLon)
    }
}

function getWeather(weatherURL, location, message, client, latLon){
    location = location.replace(/oe/g, 'ø')
    location = location.replace(/ae/g, 'æ')
    location = location.replace(/aa/g, 'å')
    location = (location.slice(0,1).toUpperCase() + location.slice(1,))
    let isForecast = false
    if(message.content.slice(client.config.prefix.length).trim().split(/ +/g).slice(0,1) == "forecast"){
        isForecast = true
    }
    axios.get(weatherURL).then(response => {
        let time_series = response.data.properties.timeseries
        let string = `Weather forecast for ${location} (${latLon}):\n`
        if(!isForecast){
            let temp = time_series[0].data.instant.details.air_temperature
            let weather = time_series[0].data?.next_1_hours?.summary?.symbol_code
            if(!weather){
                weather = time_series[0].data?.next_6_hours?.summary?.symbol_code
            }
            weather = weatherMap[weather]
            string += `**${temp}°C** ${weather}\n`
        }
        else{
            for (const entry in time_series) {
                if (Object.hasOwnProperty.call(time_series, entry)) {
                    const element = time_series[entry];
                    let temp = element.data.instant.details.air_temperature
                    let date = element.time.slice(0,10)
                    let dateMo = date.slice(5,7)
                    let dateDa = date.slice(8,)
                    date = `${dateDa}/${dateMo}`
                    let time = element.time.slice(11, 16)
                    if(time != '12:00'){
                        continue;
                    }
                    let weather = element.data?.next_1_hours?.summary?.symbol_code
                    if(!weather){
                        weather = element.data?.next_6_hours?.summary?.symbol_code
                        if(!weatherMap.get(weather)){
                            console.log(weather)
                        }
                    }
                    weather = weatherMap[weather]
                    string += `${date}: **${temp}°C** ${weather}\n`
                }
            }
        }
        message.channel.send(string)
    })
    .catch(error => {
        console.log(error)
    })
}

const { MessageEmbed } = require('discord.js')
module.exports.help = () => {
    let embed = new MessageEmbed()
	embed.setTitle("!weather help:")
	embed.setDescription(`\`!weather <location>\` | Provides weather for the given location\n
                        \`!weather\` | Provides weather forecast for Bergen\n
                        \`!forecast <location>\` | Provides forecast for the given location\n
                        \`!forecast\` | Provides forecast for Bergen`)
    embed.setFooter("Data provided by yr.no")
	return embed
}

module.exports.conf = {
    aliases: ['forecast', 'yr', 'værmelding', 'været', 'vær', 'værmelding']
}