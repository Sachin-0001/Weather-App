const apikey = "04055903f29a76b06115a5801580976c";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
var apiurl1 = 0;

async function checkWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    var data = await response.json();
    console.log(data);
    
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector('.card-title').innerHTML = data.name;
    document.querySelector('.fs').innerHTML = Math.round(data.main.feels_like) + "°C";
    document.querySelector('.hs').innerHTML = data.main.humidity + "%";
    console.log(data.weather[0].main);
    if (data.weather[0].main == "Mist") {
        document.querySelector('.icon').src = "assets/mist.png";
    } else if (data.weather[0].main == "Clear") {
        document.querySelector('.icon').src = "assets/clear.png";
    } else if (data.weather[0].main == "Rain") {
        document.querySelector('.icon').src = "assets/rain.png";
    } else if (data.weather[0].main == "Clouds") {
        document.querySelector('.icon').src = "assets/clouds.png";
    } else if (data.weather[0].main == "Drizzle") {
        document.querySelector('.icon').src = "assets/drizzle.png";
    } else if (data.weather[0].main == "Snow") {
        document.querySelector('.icon').src = "assets/snow.png";
    } else if (data.weather[0].main == "Wind") {
        document.querySelector('.icon').src = "assets/wind.png";
    }
    lat = data.coord.lat;
    lon = data.coord.lon;
    apiurl1 = `https://timeapi.io/api/time/current/coordinate?latitude=${data.coord.lat}&longitude=${data.coord.lon}`;
    getTime(data.coord.lat, data.coord.lon);
}
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search-btn");




async function getTime(lat, lon) {
    const response = await fetch(apiurl1);
    var data1 = await response.json();
    console.log(data1);
    let h = data1.hour;
    let m = data1.minute;
    let s = data1.seconds;
    if(h>=10)
        document.querySelector('.hours').innerHTML = h + ":";
    else
        document.querySelector('.hours').innerHTML = "0" + h + ":";
    if(m>=10)
        document.querySelector('.min').innerHTML = m + ":";
    else
        document.querySelector('.min').innerHTML = "0" + m + ":";
    if(s>=10)
        document.querySelector('.sec').innerHTML = s;
    else
        document.querySelector('.sec').innerHTML = "0" + s;
    
    
    if (h < 12)
        document.querySelector('.half').innerHTML = "\tAM";
    else
    document.querySelector('.half').innerHTML = "\tPM";

    setTimeout(getTime,1000,lat,lon);
}

document.addEventListener("click", () => {
    checkWeather(searchbox.value);
  });
  
