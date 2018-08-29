const express = require('express');
const route = express.Router();
const controllers = require('../controllers/locationController');

route.get('/', (req, res) => {
  console.log(req.body)
  res.render('home', { data: '' });
})

route.post('/', controllers.getWeather);

route.get('/error', (req, res) => {
  res.render('error', { error : 'no match found'});
});

route.get('/howitworks', (req, res) => {
  res.render('howItWorks');
})
module.exports = route;
