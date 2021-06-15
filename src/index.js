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


function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  celsiusTemperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
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
iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "a9d385397e6bd4076a3c48f247270367";
  let unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(displayWeather);
}


function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = celsiusTemperature;
}

function displayForecast() {
let forecastElement = document.querySelector("#forecast");
let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]; 
let forecastHTML = `<div class="row">`;
days.forEach(function (day) {
  forecastHTML =
    forecastHTML +
    `<div class="col-2">
          <div class = "weather-forecast-date">
          ${day}
          </div>
            <img 
          src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
          alt="weather icon"
          id="icon"
          width="36"
          />
          <br />
          <span class="weather-forecast-temp-max">
          18
          </span>
          <span class="weather-forecast-temp-min">
          12
          </span>
        </div>
        `;
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

displayForecast();

let celsiusTemperature = null;

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener ("click", displayFahrenheitTemperature);

celsiusTemperature = document.querySelector("#celsius-link");
celsiusTemperature.addEventListener ("click", displayCelsiusTemperature);


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);