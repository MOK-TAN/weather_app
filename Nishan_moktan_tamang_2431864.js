window.onload = function () {
  getWeatherData("Bradford");
};

// function to get ID easily
function getId(id) {
  return document.getElementById(id);
}

// GET NECESSARY DOM

// for access input value and button
let input_text = getId("input_text");
let search_btn = getId("search_btn");

//for weather icons, placename, temperature, condition
let weather_condition_icon_img = getId("weather_condition_icon_img");
let weather_location = getId("weather_location");
let temp_number = getId("temp_number");
let temperature_condition = getId("temperature_condition");

// for humidity, wind speed, pressure
let humidity_no = getId("humidity_no");
let pressure_no = getId("pressure_no");
let windspeed_no = getId("windspeed_no");

// FUNCTION TO SEARCH INPUT CITY WEATHER
function searchWeather() {
  let input_text = getId("input_text");

  if (input_text.value === "") {
    document.getElementById("body").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML = "Please </br>Enter City";

    return;
  }
  getWeatherData(input_text.value);

  input_text.value = "";
}

// TO ADD EVENT TO OUR SEARCH BUTTON
search_btn.addEventListener("click", searchWeather);

// TO DISPLAY DATA TO DOM
function displayData(weather) {
  weather_condition_icon_img.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  weather_location.innerHTML = weather.name;
  temperature_condition.innerHTML = weather.weather[0].description;
  document.getElementById("date").innerHTML = new Date().toLocaleDateString();
  temp_number.innerHTML = parseInt(weather.main.temp);
  humidity_no.innerHTML = weather.main.humidity + " %";
  pressure_no.innerHTML = weather.main.pressure + " Pa";
  windspeed_no.innerHTML = weather.wind.speed + " km/h";
}

// ASYNCHRONOUS FUNCTION THAT USES PROMISE TO FETCH DATA FROM SERVER
async function getWeatherData(cityName) {
  let API_KEY = "e39aa35bd0e1e4d110a09f7697313b25";

  let city = cityName;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    let response = await fetch(url);
    console.log(response.status);
    if (!response.ok) {
      throw new Error("Erro while fetching data from server");
    }
    let data = await response.json();
    console.log("data from api ", data);
    document.getElementById("error").style.display = "none";
    document.getElementById("body").style.display = "block";
    displayData(data);
console.log(data);
  } catch (err) {
    document.getElementById("body").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML = "CITY </br>NOT FOUND";
    console.log("error : ", err);
  }
}
