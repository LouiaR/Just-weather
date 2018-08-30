const element = document.querySelector("#container");

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  } else {
    element.innerHTML = "Geolocation is not supported by this browser.";
  }
}

const twoDigits = (value) => {
  if(value < 10) {
   return '0' + value;
  }
  return value;
}

const select = (element) => {
  return document.querySelector(element)
}

const convertTimeToHour = (dt) => {
 return twoDigits(new Date(dt * 1000)).getHours() + ":" + twoDigits(new Date(dt * 1000)).getMinutes()
}

const successFunction = (position) => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
 
  if (!lat || !long) element.innerHTML = "We have not been able to ";
  if (lat && long) {
    fetch('https://openweathermap.org/data/2.5/weather?' + 'lat=' + lat + '&' + 'lon=' + long + '&appid=b6907d289e10d714a6e88b30761fae22')
      .then(data => data.json())
      .then(res => {

      // City and country  
       select('.weather-location').innerHTML = `<p> Current weather in  ${res.name}, ${res.sys.country} </p>` ;

      // Icon 
       select('.icon').innerHTML = `<img src=http://openweathermap.org/img/w/${res.weather[0].icon}.png alt=weather-icon >`

       // Temperature
       select('.temp').innerHTML = `${res.main.temp} &#x2103;`

       // Description
       select('.desc').innerHTML = `${res.weather[0].description}`;

       // Humidity
       select('.humidity').innerHTML = `${res.main.humidity} &#x25;`;

       // Speed
       select('.weather-wind').innerHTML = `Wind: ${res.wind.speed} m/s`;

       // Sunrise
       select('.sunrise').innerHTML = `Sunrise: ${convertTimeToHour(res.sys.sunrise)} &#xa0;&#xa0;|&#xa0;&#xa0;`;

       // Sunset
       select('.sunset').innerHTML = `Sunset: ${convertTimeToHour(res.sys.sunset)}`;

       // Temp min
       select('.tempmin').innerHTML = `${res.main.temp_min} &#x2103  &#xa0;&#xa0;|&#xa0;&#xa0;`;

       // Temp max
       select('.tempmax').innerHTML = `  ${res.main.temp_max} &#x2103`;
      })
      .catch(err => {
        element.innerHTML = "Ooops something went wrong"
      })
  }
}

const errorFunction = () => {
  element.innerHTML = "We couldn't get your location because it seems  like geolocation is not enable or disabled or your browser ";
}
