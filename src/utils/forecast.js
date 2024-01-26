const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=454560a9703f737ae899598271140084&query=' + latitude + ',' + longitude
    console.log('URL: '+url)
    request({ url, json: true }, (error, response) => {
        console.log(response.body)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if(response.body.success === false){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, 'Weather is ' + response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degress out. There is ' + response.body.current.precip + '% chance of rain.')
            // callback(undefined, 'Temperature is: '+ response.body.current.temperature
            //     // weather: response.body.current.weather_descriptions
            // )
        }
    })
}

module.exports = forecast