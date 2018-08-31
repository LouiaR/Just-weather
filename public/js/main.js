const app = document.querySelector("#container");
const twoDigits = (value) => {
  if (value < 10) {
    return '0' + value;
  }
  return value;
}

// Select dom element
const select = (element) => {
  return document.querySelector(element);
}

const convertTimeToHour = (dt) => {
  return twoDigits(new Date(dt * 1000)).getHours() + ":" + twoDigits(new Date(dt * 1000)).getMinutes()
}

// Get user Location
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  } else {
    app.innerHTML = "Geolocation is not supported by this browser.";
  }
}

const successFunction = (position) => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;

  if (!lat || !long) app.innerHTML = "We have not been able to ";
  if (lat && long) {
    fetch('https://openweathermap.org/data/2.5/weather?' + 'lat=' + lat + '&' + 'lon=' + long + '&appid=b6907d289e10d714a6e88b30761fae22')
      .then(data => data.json())
      .then(res => {

        const addClass = document.querySelector(".weather").classList.add("weather-box");

        // City and country  
        select('.weather-location').innerHTML = `<h3>${res.name} - ${res.sys.country} </h3>`;

        // Icon 
        select('.icon').innerHTML = `<img src=http://openweathermap.org/img/w/${res.weather[0].icon}.png alt=weather-icon >`

        // // Temperature
        select('.temp').innerHTML = `${Math.round(res.main.temp)} &#x2103;`

        // // Description
        select('.desc').innerHTML = `<h4> ${res.weather[0].description} </h4>`;

        // // Humidity
        select('.humidity').innerHTML = `<img src="/images/wet.png">${res.main.humidity} &#x25;
        <p> Humidity </p>  `;

        // Wind Speed
        select('.weather-wind').innerHTML = `
        <span> <img src="/images/air-element.png"> </span> 
        ${res.wind.speed} m/s 
        <p> Wind speed </p>`;

        //Temp min & max 
        select('.tempmin').innerHTML = 
        `<span class="icon-center"> 
            <img src="/images/temperature.png"> 
        </span> 
        ${Math.round(res.main.temp_min)}&#x2103;&#xa0;&#xa0;|&#xa0;&#xa0; ${Math.round(res.main.temp_max)}&#x2103;
        <p> Temp Low | High </p>`

        // Sunrise && sunset
        select('.sunrise').innerHTML = 
        `<span class="icon-center"> <img src="/images/summer.png"> </span> 
        <p> ${convertTimeToHour(res.sys.sunrise)} &#xa0;&#xa0;|&#xa0;&#xa0;${convertTimeToHour(res.sys.sunset)} </p>
        <p> Sunrise | Sunset </p>`;
      })
      .catch(err => {
        element.innerHTML = "Ooops something went wrong"
      })
  }
}

const errorFunction = () => {
  element.innerHTML = `<div class=error > We couldn't get your location because it seems  like geolocation is not enable or disabled or your browser or you are offline </div >`;
}