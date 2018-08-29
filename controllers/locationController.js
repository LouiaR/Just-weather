const axios = require('axios');

exports.getWeather = (async (req, res ) => {
  console.log(req, 'allo')

  const { city, country } = req.body;
  let url = country  ? process.env.WEATHER_URL + city +','+ country + process.env.API_KEY : process.env.WEATHER_URL + city + process.env.API_KEY ;
  url = (city && process.env.WEATHER_URL + city + process.env.API_KEY)
  try{
    const fetchResult = await axios(url);
    const data = await fetchResult;
    // console.log(data.data)
    if ( data.data && data.data.sys.country) {
    res.render('home', { data: data.data})
    } 
    
  } catch(err){
    res.redirect('/error')
  } 
})
