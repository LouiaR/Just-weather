const express = require('express');
const route = express.Router();
const controllers = require('../controllers/locationController');

route.get('/', (req, res) => {
  res.render('home',{ 
    city: '',
    country: '',
    temp: '',
    tempMax: '',
    tempMin: '',
    icon: '',
    sunrise: '',
    sunset: '',
    desc: '',
    time: '',
    wind: '',
    humidity: '',
    error: '',
 });
})

route.post('/', controllers.getWeather);

route.get('/error', (req, res) => {
  res.render('error', { error : "We couldn't find any match for the information you have provided, please go to how it works for mor info." });
});

route.get('/howitworks', (req, res) => {
  res.render('howItWorks');
})
module.exports = route;
