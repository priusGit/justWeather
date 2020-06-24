var bars = document.querySelector(".fa-align-left");
var close = document.querySelector(".fa-times");
var city = document.querySelector(".fa-city");
var locate = document.querySelector(".fa-map-marker-alt");
var menu = document.querySelector(".extraStats");
var search = document.querySelector(".search");
var loupe = document.querySelector(".fa-search");
let weather, future;
let lat, lon;
bars.addEventListener("click", function () {
    bars.classList.toggle("off");
    close.classList.toggle("off");
    menu.classList.toggle("extraStatsActive");
})
close.addEventListener("click", function () {
    bars.classList.toggle("off");
    close.classList.toggle("off");
    menu.classList.toggle("extraStatsActive");
})
city.addEventListener("click", function () {
    search.classList.toggle("searchActive");
    loupe.classList.toggle("searchActive");
    //var stylesheet = document.styleSheets[0];
    //stylesheet.cssRules[1].style.backgroundColor = "blue";
})
loupe.addEventListener("click", async function () {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + search.value + "&appid=6301f16c27be5c2dadd4ba2f11f1b761&units=metric";
    await fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            weather = data;
            lat = weather.coord.lat;
            lon = weather.coord.lon;
            console.log(weather);
            document.querySelector(".city").innerHTML = weather.name;
            document.querySelector(".temp").innerHTML = weather.main.temp + "°C";
            document.querySelector(".sky").innerHTML = weather.weather[0].main;
            document.querySelector(".skySmall").innerHTML = weather.weather[0].description;
            document.querySelector(".bar1").innerHTML = weather.main.humidity + "%";
            document.querySelector(".bar2").innerHTML = weather.main.pressure + " hPa";
            document.querySelector(".bar3").innerHTML = weather.clouds.all + "%";
        })
        .catch(function (error) {
            console.log(error);
        });
    console.log(lat + " " + lon);
    link = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=daily&appid=6301f16c27be5c2dadd4ba2f11f1b761";
    fetch(link)
        .then((resp) => resp.json())
        .then(function (data) {
            future = data;
            console.log(future);
        })
        .catch(function (error) {
            console.log(error);
        });
})