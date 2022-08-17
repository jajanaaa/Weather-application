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

// let cityName = document.querySelector("#city-name");

// let visibility = document.querySelector("#visibility");
// let pressure = document.querySelector("#pressure");
// let weatherIcon = Array.from(document.querySelectorAll(".weather-icon"));
//
// let temperature;
// function showCityTemperature(response) {
//   cityName.innerHTML = response.data.name;
//   let temp = document.querySelector("#temp");
//   temperature = Math.round(response.data.main.temp);
//   temp.innerHTML = `${temperature}°C`;
//   let description = document.querySelector("#desc");
//   description.innerHTML = response.data.weather[0].main;
//   let windSpeed = document.querySelector("#wind-speed");
//   windSpeed.innerHTML = `${response.data.wind.speed} meter/sec`;
//   let arrow = document.querySelector(".fa-location-arrow");
//   let degrees = response.data.wind.deg;
//   console.log(degrees);
//   arrow.style.transform = `rotate(${degrees}deg)`;
//   console.log(response.data);
//   let humidityDisplay = document.querySelector("#humidity");
//   let humidity = response.data.main.humidity;
//   humidityDisplay.innerHTML = `${humidity} %`;
//   let humidityPersent = document.querySelector("#slider-persent");
//   humidityPersent.style.width = `${humidity}%`;
//   console.log(visibility);
//   visibility.innerHTML = `${response.data.visibility / 1000} km`;
//   pressure.innerHTML = `${response.data.main.pressure} hPa`;
//   let icon = response.data.weather[0].icon;
//   console.log(icon);

//   getForecast(response.data.coord);
//   let mainIcon = document.querySelector("#main-icon");
//   mainIcon.src = `icons/${response.data.weather[0].icon}.png`;
//   // checkIcons(response.data.weather[0].icon);
// }

let days = Array.from(document.querySelectorAll(".temp"));
let maxTemp = Array.from(document.querySelectorAll(".temp-max"));
let temperatureMinC;
let temperatureMaxC;

function displayForecast(response) {
  for (let i = 0; i < days.length; i++) {
    temperatureMinC = Math.round(response.data.daily[i + 1].temp.min);
    days[i].innerHTML = `${temperatureMinC}°C`;
    temperatureMaxC = Math.round(response.data.daily[i + 1].temp.max);
    maxTemp[i].innerHTML = `${temperatureMaxC}°C`;
    weatherIcon[i].src = `icons/${
      response.data.daily[i + 1].weather[0].icon
    }.png`;
    let dayName = Array.from(document.querySelectorAll(".day-name"));
    let date = new Date(response.data.daily[i].dt * 1000);
    let dayNumber = date.getDay();
    const daysNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    dayName[i].innerHTML = daysNames[dayNumber + 1];
    displayF(temperatureMinC, temperatureMaxC);
  }
}
// function displayF(temperatureMinC, temperatureMaxC) {
//   // console.log(temperatureMinC, temperatureMaxC);
//   let temperatureMinF = Array.from(Math.round((temperatureMinC * 9) / 5 + 32));
//   let temperatureMaxF = Math.round((temperatureMaxC * 9) / 5 + 32);
//   console.log(temperatureMinF);
//   for (let i = 0; i < days.length; i++) {
//     // days[i].innerHTML = `${temperatureMinF}°F`;
//     // maxTemp[i].innerHTML = `${temperatureMaxF}°F`;
//   }
// }

// displayF();
// function getForecast(coordinates) {
//   console.log(coordinates);
//   let units = "metric";
//   let apiKey = "0db8ad6210652fd3a85cc58f74987b5a";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=${units}`;
//   axios.get(apiUrl).then(displayForecast);
//   console.log(apiUrl);
// }

// function searchCity(city) {
//   cityName.innerHTML = city;
//   let units = "metric";
//   let apiKey = "0db8ad6210652fd3a85cc58f74987b5a";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
//   axios.get(apiUrl).then(showCityTemperature);
// }

// searchCity("Kyiv");

// let form = document.querySelector("form");
// let input = document.querySelector("input");

// function showCity(event) {
//   event.preventDefault();
//   alert("red");
//   city = input.value;
//   cityName.innerHTML = city;
//   searchCity(city);
// }

// form.addEventListener("submit", showCity);

// MY LOCATION
// const myLocation = document.querySelector("#my-location");
//

// let units = "metric";
// function showPosition(position) {
//   lat = position.coords.latitude;
//   lon = position.coords.longitude;
//   units = "metric";
//   let apiKey = "0db8ad6210652fd3a85cc58f74987b5a";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
//   axios.get(apiUrl).then(showCityTemperature);
//   console.log(position);
//   console.log(position.coords.latitude);
//   console.log(position.coords.longitude);
// }

// function getCurrentPosition() {
//   //   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(showPosition);
// }

// myLocation.addEventListener("click", getCurrentPosition);

// CONVERT TO FARANGAITS
// // const buttonF = document.querySelector("#button-F");
// const buttonC = document.querySelector("#button-C");

// let temperatureF = Math.round((temperature * 9) / 5 + 32);

// buttonF.addEventListener("click", function () {
//   temperatureF = Math.round((temperature * 9) / 5 + 32);
//   temp.innerHTML = `${temperatureF}°F`;
//   // temp.innerHTML = Math.round((temp.textContent * 9) / 5 + 32);
//   for (let i = 0; i < days.length; i++) {
//     let temperatureMinF = Math.round((temperatureMinC * 9) / 5 + 32);
//     let temperatureMaxF = Math.round((temperatureMaxC * 9) / 5 + 32);
//     days[i].innerHTML = `${temperatureMinF}°F`;
//     maxTemp[i].innerHTML = `${temperatureMaxF}°F`;
//     console.log(temperatureMinF);
//     buttonF.disabled = true;
//     buttonC.disabled = false;
//   }
// });

// // (0°F − 32) × 5/9
// buttonC.addEventListener("click", function () {
//   temp.innerHTML = `${Math.round(((temperatureF - 32) * 5) / 9)}°C`;
//   for (let i = 0; i < days.length; i++) {
//     // days[i].innerHTML = Math.round(((temperatureMinF - 32) * 5) / 9);
//     // maxTemp[i].innerHTML = Math.round(((temperatureMaxF - 32) * 5) / 9);
//     days[i].innerHTML = `${temperatureMinC}°C`;
//     maxTemp[i].innerHTML = `${temperatureMinC}°C`;
//   }
//   buttonC.disabled = true;
//   buttonF.disabled = false;
// });

//  for (let i = 0; i < days.length; i++) {
//     let temperatureMinF = Math.round((temperatureMinC * 9) / 5 + 32);
//     let temperatureMaxF = Math.round((temperatureMaxC * 9) / 5 + 32);
//     days[i].innerHTML = `${temperatureMinF}°F`;
//     maxTemp[i].innerHTML = `${temperatureMaxF}°F`;

// function showF() {
//   // alert("red");
//   // // temp.innerHTML = response.data.main.temp;
//   // console.log(temp.textContent);
//   temp.innerHTML = (temp.textContent * 9) / 5 + 32;
//   console.log(units);

// }, {once : true});
