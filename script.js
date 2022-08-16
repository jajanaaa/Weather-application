const now = new Date();

const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long", // also 2-digit
};
let city;
let date = document.querySelector("#date");
date.textContent = new Intl.DateTimeFormat("en-US").format(now);

let title = document.querySelector(".title");

let visibility = document.querySelector("#visibility");
let pressure = document.querySelector("#pressure");
let weatherIcon = document.querySelector("#weather-icon");
//
function showCityTemperature(response) {
  title.innerHTML = response.data.name;
  let temp = document.querySelector("#temp");
  temp.innerHTML = response.data.main.temp;
  let description = document.querySelector("#desc");
  description.innerHTML = response.data.weather[0].main;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed} meter/sec`;
  let arrow = document.querySelector(".fa-location-arrow");
  let degrees = response.data.wind.deg;
  console.log(degrees);
  arrow.style.transform = `rotate(${degrees}deg)`;
  console.log(response.data);
  let humidityDisplay = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityDisplay.innerHTML = `${humidity} %`;
  let humidityPersent = document.querySelector("#slider-persent");
  humidityPersent.style.width = `${humidity}%`;
  console.log(visibility);
  visibility.innerHTML = `${response.data.visibility / 1000} km`;
  pressure.innerHTML = `${response.data.main.pressure} hPa`;
  let icon = response.data.weather[0].icon;
  console.log(icon);
  if (icon === "01d") {
    weatherIcon.src = "icons/sun.png";
  }
  if (icon === "01n") {
    weatherIcon.src = "icons/moon.png";
  }
  if (icon === "02d") {
    weatherIcon.src = "icons/sun-cloud.png";
  }
  if (icon === "02n") {
    weatherIcon.src = "icons/moon-cloud.png";
  }
  if (icon === "03d" || icon === "03n" || icon === "04d" || icon === "04n") {
    weatherIcon.src = "icons/cloud.png";
  }
  if (icon === "09d" || icon === "09n") {
    weatherIcon.src = "icons/cloud-rain.png";
  }
  if (icon === "10d") {
    weatherIcon.src = "icons/sun-rain.png";
  }
  if (icon === "10n") {
    weatherIcon.src = "icons/moon-rain.png";
  }
  if (icon === "11d" || icon === "11n") {
    weatherIcon.src = "icons/lightning.png";
  }
  if (icon === "13d" || icon === "13n") {
    weatherIcon.src = "icons/snow.png";
  }
  if (icon === "50d" || icon === "50n") {
    weatherIcon.src = "icons/mist.png";
  }

  getForecast(response.data.coord);
}

function displayForecast(response) {
  console.log(response.data);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let units = "metric";
  let apiKey = "0db8ad6210652fd3a85cc58f74987b5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

// function showLocationTemperature(response) {
//   title.innerHTML = response.data.name;
//   temp = document.querySelector("#temp");
//   temp.innerHTML = response.data.main.temp;
//   description = document.querySelector("#desc");
//   description.innerHTML = response.data.weather[0].main;
//   windSpeed = document.querySelector("#wind-speed");
//   windSpeed.innerHTML = `${response.data.wind.speed} meter/sec`;
//   arrow = document.querySelector(".fa-location-arrow");
//   degrees = response.data.wind.deg;
//   arrow.style.transform = `rotate(${degrees}deg)`;
//   humidityDisplay = document.querySelector("#humidity");
//   humidity = response.data.main.humidity;
//   humidityDisplay.innerHTML = `${humidity} %`;
//   humidityPersent = document.querySelector("#slider-persent");
//   humidityPersent.style.width = `${humidity}%`;
//   visibility.innerHTML = `${response.data.visibility / 1000} km`;
//   pressure.innerHTML = `${response.data.main.pressure} hPa`;
// }

function searchCity(city) {
  title.innerHTML = city;
  let units = "metric";
  let apiKey = "0db8ad6210652fd3a85cc58f74987b5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityTemperature);
}

searchCity("Kyiv");

let form = document.querySelector("form");
let input = document.querySelector("input");

function showCity(event) {
  event.preventDefault();
  alert("red");
  city = input.value;
  title.innerHTML = city;
  searchCity(city);
}

form.addEventListener("submit", showCity);

// MY LOCATION
const myLocation = document.querySelector("#my-location");
//

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "0db8ad6210652fd3a85cc58f74987b5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityTemperature);
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

function getCurrentPosition() {
  //   event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

myLocation.addEventListener("click", getCurrentPosition);
