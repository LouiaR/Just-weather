const axios = require('axios');
const helpers = require('../helpers');

// Get user weather for city user requested
exports.getWeather = (async (req, res) => {

  const {
    city,
    country
  } = req.body;
  const {
    API_KEY,
    WEATHER_URL
  } = process.env
  
  try {
    if (!API_KEY || !WEATHER_URL) throw new Error('MISSING_ENV_VARS');
    let url = country ? `${WEATHER_URL }${city},${country}${API_KEY}` : `${WEATHER_URL }${city}${API_KEY}`;
    const response = await axios(url);
    const weather = await response.data;
    if (weather && weather.sys.country) {
      // City
      const cityName = weather.name;

      // Country 
      const country = weather.sys.country;
      
      // Time & date   
      const time = weather.dt;

      // sunrise 
      const sunris = new Date(weather.sys.sunrise * 1000);
      const sunrise = `${helpers.twoDigits(sunris.getHours())} : ${helpers.twoDigits(sunris.getMinutes())}`;

      // Sunset 
      const sunse = new Date(weather.sys.sunset * 1000);
      const sunset =` ${helpers.twoDigits(sunse.getHours())} : ${helpers.twoDigits(sunse.getMinutes())}`;
      // temperatures
      const temp = Math.round(weather.main.temp);
      const tempMin = Math.round(weather.main.temp_min);
      const tempMax = Math.round(weather.main.temp_max);

      // Humidity 
      const humidity = weather.main.humidity;

      // Description
      const desc = weather.weather[0].description;
      
      // icon
      const icon = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

      // Wind speed 
      const wind = Math.round(weather.wind.speed);

      res.status(200).render('home', {
        addClass: 'weather-box',
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
  } catch (err) {
    res.render('error', {
      error:`We have not been able to find weather base on the information you have provided. Please make sure the name you have enter is correct or follow the instruction below`
    })
  }
})
