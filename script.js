const apiKey = "3a36a2158ea2227fd270cb22323b0ebe";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(cityName) {
    const response = await fetch(apiUrl +`${cityName}`+ `&appid=${apiKey}`);

    if(!response.ok) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    document.querySelector(".error").style.display = "none";

    var data = await response.json();

    console.log(data);
    

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) +"°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity +" %";
    document.querySelector(".wind").innerHTML = data.wind.speed +" km/h";

    if(data.weather[0].main == "Clouds") {
        weatherIcon.src="images/clouds.png";
    } else if(data.weather[0].main == "Clear") {
        weatherIcon.src="images/clear.png";
    } else if(data.weather[0].main == "Rain") {
        weatherIcon.src="images/rain.png";
    } else if(data.weather[0].main == "Drizzle") {
        weatherIcon.src="images/drizzle.png";
    } else if(data.weather[0].main == "Mist") {
        weatherIcon.src="images/mist.png";
    } 

    document.querySelector(".weather").style.display = "block";

}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
});

document.getElementById("input-field").addEventListener("keypress",(e)=>{
    if(e.key == "Enter") {
        e.preventDefault();
        searchBtn.click();
    }
})
