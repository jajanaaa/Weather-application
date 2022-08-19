"use strict";

// CALL API TO DISPLAY CURRENT TEMPERATURE IN A CITY
searchCity("Lviv");

function searchCity(city) {
  let units = "metric";
  let apiKey = "0db8ad6210652fd3a85cc58f74987b5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityTemperature);
}

const mainIcon = document.querySelector("#main-icon");
const temp = document.querySelector("#temp");
const desc = document.querySelector("#desc");
const cityName = document.querySelector("#city-name");
const windSpeed = document.querySelector("#wind-speed");
const arrow = document.querySelector(".fa-location-arrow");
const humidity = document.querySelector("#humidity");
const humiditySlider = document.querySelector("#slider-inner");
const visibility = document.querySelector("#visibility");
const pressure = document.querySelector("#pressure");

let tempC;

function showCityTemperature(response) {
  mainIcon.src = `icons/${response.data.weather[0].icon}.png`;
  tempC = Math.round(response.data.main.temp);
  temp.innerHTML = `${tempC}°C`;
  desc.innerHTML = response.data.weather[0].main;
  cityName.innerHTML = response.data.name;
  windSpeed.innerHTML = `${response.data.wind.speed} m/s`;
  arrow.style.transform = `rotate(${response.data.wind.deg}deg)`;
  humidity.innerHTML = `${response.data.main.humidity} %`;
  humiditySlider.style.width = `${response.data.main.humidity}%`;
  visibility.innerHTML = `${response.data.visibility / 1000} km`;
  pressure.innerHTML = `${response.data.main.pressure} hPa`;
  getForecast(response.data.coord);
  buttonF.disabled = false;
  buttonC.disabled = true;
  buttonF.classList.add("active");
  buttonC.classList.remove("active");
}
// DATE API
let date = document.querySelector("#date");

const now = new Date();
const options = {
  day: "numeric",
  month: "long",
};
date.textContent = `${new Intl.DateTimeFormat("en-GB", options).format(now)}`;

// SEARCH CITY BY INPUT
const form = document.querySelector("form");
const input = document.querySelector("input");
form.addEventListener("submit", inputCity);

function inputCity(event) {
  event.preventDefault();
  let city = input.value;
  searchCity(city);
}

// SHOW WEATHER DEPENDING ON CURRENT LOCATION
const myLocation = document.querySelector("#my-location");

myLocation.addEventListener("click", getCurrentPosition);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "0db8ad6210652fd3a85cc58f74987b5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityTemperature);
}

// DISPLAY FORECAST
const tempMin = Array.from(document.querySelectorAll(".temp-min"));
const tempMax = Array.from(document.querySelectorAll(".temp-max"));
const dayName = Array.from(document.querySelectorAll(".day-name"));
const smallIcon = Array.from(document.querySelectorAll(".small-icon"));
const tomorrow = document.querySelector("#tomorrow");
let arrayTemperatureMinC = [];
let arrayTemperatureMaxC = [];

function displayForecast(response) {
  for (let i = 0; i < tempMin.length; i++) {
    let cutArray = response.data.daily.slice(1);
    let temperatureMinC = Math.round(cutArray[i].temp.min);
    let temperatureMaxC = Math.round(cutArray[i].temp.max);
    arrayTemperatureMinC.push(temperatureMinC);
    arrayTemperatureMaxC.push(temperatureMaxC);
    tempMin[i].innerHTML = `${temperatureMinC}°C`;
    tempMax[i].innerHTML = `${temperatureMaxC}°C`;

    smallIcon[i].src = `icons/${cutArray[i].weather[0].icon}.png`;

    let date = new Date(cutArray[i].dt * 1000);
    let dayNumber = date.getDay();
    const daysNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayName[i].innerHTML = daysNames[dayNumber];
    tomorrow.innerHTML = "Tomorrow";
  }
}
function getForecast(coordinates) {
  let units = "metric";
  let apiKey = "0db8ad6210652fd3a85cc58f74987b5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

// CONVERT TO FAHRENHEIT
const buttonF = document.querySelector("#button-F");

buttonF.addEventListener("click", function () {
  let tempF = Math.round((tempC * 9) / 5 + 32);
  temp.innerHTML = `${tempF}°F`;
  for (let i = 0; i < tempMin.length; i++) {
    let tempMinF = Math.round((arrayTemperatureMinC[i] * 9) / 5 + 32);
    let tempMaxF = Math.round((arrayTemperatureMaxC[i] * 9) / 5 + 32);
    tempMin[i].innerHTML = `${tempMinF}°F`;
    tempMax[i].innerHTML = `${tempMaxF}°F`;
  }
  buttonF.disabled = true;
  buttonC.disabled = false;
  buttonF.classList.toggle("active");
  buttonC.classList.toggle("active");
});

// CONVERT BACK TO CELSIUS
const buttonC = document.querySelector("#button-C");

buttonC.addEventListener("click", function () {
  temp.innerHTML = `${tempC}°C`;
  for (let i = 0; i < tempMin.length; i++) {
    tempMin[i].innerHTML = `${arrayTemperatureMinC[i]}°C`;
    tempMax[i].innerHTML = `${arrayTemperatureMaxC[i]}°C`;
  }
  buttonF.disabled = false;
  buttonC.disabled = true;
  buttonF.classList.toggle("active");
  buttonC.classList.toggle("active");
});
