const element = document.querySelector("#dimo");
let data = 'undefined'
function twoDigits(value) {
  if(value < 10) {
   return '0' + value;
  }
  return value;
}

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  } else {
    element.innerHTML = "Geolocation is not supported by this browser.";
  }
}

const createChild = (text, classes, tag) => {
  const node = document.createElement("h3"); 
  const parent = document.createElement(tag); 
  const textnode = document.createTextNode(text);
  node.appendChild(textnode);
  parent.appendChild(node);
  parent.classList.add(classes)
  element.appendChild(parent);
}

const createChildImg = (image) => {
  const node = document.createElement("img"); 
  const parent = document.createElement('div'); 
  node.src = "http://openweathermap.org/img/w/" + image + ".png"
  parent.appendChild(node);
  parent.classList.add('weather-icon');
  element.appendChild(parent);
}

const date = (time) => {
 return new Date( time * 1000)
}
const successFunction = (position) => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
 
  if (!lat || !long) element.innerHTML = "We have not been able to ";
  if (lat && long) {
    fetch('https://openweathermap.org/data/2.5/weather?' + 'lat=' + lat + '&' + 'lon=' + long + '&appid=b6907d289e10d714a6e88b30761fae22')
      .then(data => data.json())
      .then(res => {
       createChild('Current weather in ' + res.name + ', ' + res.sys.country, 'weather-country', 'div');
       createChildImg(res.weather[0].icon );
       createChild('Wind: ' + res.wind.speed +' m/s', 'weather-speed', 'div'); 
       createChild('Pressure: ' + res.main.pressure + ' %', 'weather-pressure', 'div'); 
       createChild('Humidity: ' + res.main.humidity + ' %', 'weather-pressure', 'div');
       createChild(`Sunrise: ${date( res.sys.sunrise).getHours()}:${date( res.sys.sunrise).getMinutes()}` , 'weather-sunrise', 'div'); 
       createChild(`Sunset: ${date( res.sys.sunset).getHours()}:${date( res.sys.sunset).getMinutes()}` , 'weather-sunrise', 'div');
      })
      .catch(err => {
        element.innerHTML = "elemn"
      })
  }
}

const errorFunction = () => {
  element.innerHTML = "We couldn't get your location because it seems  like geolocation is not enable or disabled or your browser ";
}
