let date = new Date();
let p = document.querySelector('#today-date');
let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
let day = days[date.getDay()];
let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
p.innerHTML = `${day} ${hours}:${minutes}`;

function showTheWether(response) {
    document.querySelector('#city-name').innerHTML = response.data.name;
    document.querySelector('#tempt').innerHTML = Math.round(
        response.data.main.temp
    );
    document.querySelector('#rainy').innerHTML =
        response.data.weather[0].description;
    document.querySelector(
        '#wind'
    ).innerHTML = `Wind:${response.data.wind.speed}km/h`;
    document.querySelector(
        '#humidity'
    ).innerHTML = `Humidity:${response.data.main.humidity}%`;
}
function searchCity(city) {
    let keyApi = 'f780c0d502a8ff8e3281f45912fc9955';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyApi}&units=metric`;
    axios.get(apiUrl).then(showTheWether);
}

function enterCity(event) {
    event.preventDefault();
    let city = document.querySelector('#searched').value;
    searchCity(city);
}

function showPosition(position) {
    let keyApi = 'f780c0d502a8ff8e3281f45912fc9955';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${keyApi}&units=metric`;
    axios.get(apiUrl).then(showTheWether);
}
function currentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector('#current');
currentButton.addEventListener('click', currentLocation);
let searchButton = document.querySelector('#search-id');
searchButton.addEventListener('submit', enterCity);
searchCity('Tehran');

function celsiosTemperature(event) {
    event.preventDefault();
    let celTempt = document.querySelector('#tempt');
    celTempt.innerHTML = 12;
}
let celLink = document.querySelector('#celsios');
celLink.addEventListener('click', celsiosTemperature);

function fahrenheitTemperature(event) {
    event.preventDefault();
    let fahTempt = document.querySelector('#tempt');
    let tempt = fahTempt.innerHTML;
    fahTempt.innerHTML = Math.round((tempt * 9) / 5 + 32);
}
let fahLink = document.querySelector('#fahrenheit');
fahLink.addEventListener('click', fahrenheitTemperature);
