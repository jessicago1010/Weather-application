let currentDate = document.querySelector("#date");

let currentTime = new Date();

let day = currentTime.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let hours = currentTime.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentTime.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentDate.innerHTML = ` ${days[day]} ${hours}:${minutes} `;

let form = document.querySelector("#currentCity");

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${temperature}`;
  document.querySelector("h2").innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = "Humidity: " + response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = "Wind: " + Math.round(response.data.wind.speed) + " MPH";
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute (
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

}


function inputCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "a9d385397e6bd4076a3c48f247270367";
  let unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(displayWeather);
}

form.addEventListener("submit", inputCity);
