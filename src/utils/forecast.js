const request = require('request')

const forecast = (lat, lon, callback) => {
    const apikey = `bbe0363084bad453d5b507e6c48c7a37`
    const url = `https://api.darksky.net/forecast/${apikey}/${lat},${lon}`;

    request({method: 'GET', url, json: true}, (error, {body}) => {
        if(error) {
            callback(`Unable to connect to Darksky weather services.`, undefined)
        } else if(body.error) {
            callback(`${body.code} - ${body.error}`, undefined)
        } else {           
            const overview = `${body.daily.data[0].summary} It's currently ${body.currently.temperature} degrees with a ${body.currently.precipProbability}% chance of rain. Temperature high reaching ${body.daily.data[0].temperatureHigh} degrees and low of ${body.daily.data[0].temperatureLow}`
            callback(undefined, overview)
        }
    })
}


module.exports = forecast