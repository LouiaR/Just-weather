const axios = require('axios');
const helpers = require('../helpers');

exports.getWeather = (async (req, res ) => {

  const { city, country } = req.body;
  let url = country  ? process.env.WEATHER_URL + city +','+ country + process.env.API_KEY : process.env.WEATHER_URL + city + process.env.API_KEY ;
  url = (city && process.env.WEATHER_URL + city + process.env.API_KEY);
  try{
    const response = await axios(url);
    const weather = await response.data;
    if ( city && weather && weather.sys.country) {

    // City
    const cityName =  'Current weather in ' + weather.name; 

    // Country 
    const country = weather.sys.country;
`   `
    // Time & date   
    const time = weather.dt;

    // sunrise 
    const sunris = new Date(weather.sys.sunrise * 1000);
    const sunrise = helpers.twoDigits(sunris.getHours()) + ':' + helpers.twoDigits(sunris.getMinutes());

    // Sunset 
    const sunse = new Date(weather.sys.sunset * 1000);
    const sunset = helpers.twoDigits(sunse.getHours()) + ':' + helpers.twoDigits(sunse.getMinutes());
    // temperatures
      const temp = Math.round(weather.main.temp);
      const tempMin = Math.round(weather.main.temp_min);
      const tempMax = Math.round(weather.main.temp_max);
    
    // Humidity 
    const humidity = weather.main.humidity;

    // Description
    const desc = weather.weather[0].description;
    
    // icon
    const icon = "http://openweathermap.org/img/w/"+weather.weather[0].icon+".png";

    // Wind speed 
    const wind = Math.round(weather.wind.speed);

    res.render('home', { 
      city: cityName,
      country: country,
      temp: temp,
      tempMax: tempMax,
      tempMin: tempMin,
      icon: icon,
      sunrise: sunrise,
      sunset: sunset,
      desc: desc,
      time: time,
      wind: wind,
      humidity: humidity,
    })
    } 
  } catch(err){
    res.redirect('/error')
  } 
})
