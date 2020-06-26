var bars = document.querySelector(".fa-align-left");
var close = document.querySelector(".fa-times");
var city = document.querySelector(".fa-city");
var locate = document.querySelector(".fa-map-marker-alt");
var menu = document.querySelector(".extraStats");
var search = document.querySelector(".search");
var loupe = document.querySelector(".fa-search");
var arrowLeft = document.querySelector(".fa-arrow-circle-left");
var arrowRight = document.querySelector(".fa-arrow-circle-right");
var itemPicker;
var hourPicker;
var localisationCords = [];
var stylesheet = document.styleSheets[0];
var weatherSlider = [
    document.querySelector(".weatherItem1").children,
    document.querySelector(".weatherItem2").children,
    document.querySelector(".weatherItem3").children,
    document.querySelector(".weatherItem4").children,
    document.querySelector(".weatherItem5").children,
    document.querySelector(".weatherItem6").children,
    document.querySelector(".weatherItem7").children,
    document.querySelector(".weatherItem8").children
];
let j;
let weather, future, citys;
let lat, lon;
bars.addEventListener("click", function () {
    bars.classList.toggle("off");
    close.classList.toggle("off");
    menu.classList.toggle("extraStatsActive");
})
arrowLeft.addEventListener("click", function () {
    arrowLeft.classList.toggle("off");
    arrowRight.classList.toggle("off");
    stylesheet.cssRules[21].style.transform = "translate(0,0)";
})
arrowRight.addEventListener("click", function () {
    arrowLeft.classList.toggle("off");
    arrowRight.classList.toggle("off");
    stylesheet.cssRules[21].style.transform = "translate(-50%,0)";
})
close.addEventListener("click", function () {
    bars.classList.toggle("off");
    close.classList.toggle("off");
    menu.classList.toggle("extraStatsActive");
})
city.addEventListener("click", function () {
    search.classList.toggle("searchActive");
    loupe.classList.toggle("searchActive");
})
var weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

function addZero(insert) {
    if (insert < 10) {
        insert = "0" + insert;
    }
    return insert;
}

function timer() {
    var date = new Date();
    var weekDay = date.getDay();
    var weekDayName = weekDays[weekDay - 1 % 7];
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    hour = addZero(hour);
    minute = addZero(minute);
    second = addZero(second);
    month = addZero(month);
    day = addZero(day);
    var time = weekDayName + " " + day + "." + month + "." + year + ", " + hour + ":" + minute + ":" + second;
    document.querySelector(".clock").innerHTML = time;
    setTimeout(timer, 1000);
}
timer();

async function startUp() {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=Warszawa&appid=6301f16c27be5c2dadd4ba2f11f1b761&units=metric";
    await fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            weather = data;
            lat = weather.coord.lat;
            lon = weather.coord.lon;
            document.querySelector(".city").innerHTML = weather.name;
            document.querySelector(".temp").innerHTML = weather.main.temp + "°C";
            document.querySelector(".sky").innerHTML = weather.weather[0].main;
            document.querySelector(".skySmall").innerHTML = weather.weather[0].description;
            document.querySelector(".bar1").innerHTML = weather.main.humidity + "%";
            document.querySelector(".bar2").innerHTML = weather.main.pressure + " hPa";
            document.querySelector(".bar3").innerHTML = weather.clouds.all + "%";
            stylesheet.cssRules[29].style.width = weather.main.humidity + "%";
            stylesheet.cssRules[30].style.width = (weather.main.pressure - 965) * 100 / 89 + "%";
            stylesheet.cssRules[31].style.width = weather.clouds.all + "%";
        })
        .catch(function (error) {
            console.log(error);
        });
    link = "https://api.openweathermap.org/data/2.5/onecall?lat=52.23&lon=21.01&exclude=daily&appid=6301f16c27be5c2dadd4ba2f11f1b761&units=metric";
    await fetch(link)
        .then((resp) => resp.json())
        .then(function (data) {
            future = data;
        })
        .catch(function (error) {
            console.log(error);
        });
    textChanger(future, 0, 3);
    textChanger(future, 1, 6);
    textChanger(future, 2, 9);
    textChanger(future, 3, 12);
    textChanger(future, 4, 15);
    textChanger(future, 5, 18);
    textChanger(future, 6, 21);
    textChanger(future, 7, 24);
}
startUp();
//function to change stuff in weatherBar
function textChanger(future, itemPicker, hourPicker) {
    let date = new Date();
    let hour = date.getHours();
    let weatherItemIndex = hourPicker - hour % 3;
    let weatherItemunix = future.hourly[weatherItemIndex].dt;
    let dateItem = new Date(weatherItemunix * 1000);
    var weekDay = dateItem.getDay();
    var weekDayName = weekDays[weekDay - 1 % 7];
    hour = dateItem.getHours();
    var day = dateItem.getDate();
    var month = dateItem.getMonth();
    day = addZero(day);
    month = addZero(month);
    var year = dateItem.getFullYear();
    weatherSlider[itemPicker][0].innerHTML = day + "." + month + "." + year;
    weatherSlider[itemPicker][1].innerHTML = hour + ":00";
    weatherSlider[itemPicker][2].innerHTML = weekDayName;
    weatherSlider[itemPicker][3].innerHTML = future.hourly[weatherItemIndex].temp + "°C";
    weatherSlider[itemPicker][4].src = "http://openweathermap.org/img/wn/" + future.hourly[weatherItemIndex].weather[0].icon + "@2x.png";
}
loupe.addEventListener("click", async function () {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + search.value + "&appid=6301f16c27be5c2dadd4ba2f11f1b761&units=metric";
    await fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            weather = data;
            lat = weather.coord.lat;
            lon = weather.coord.lon;
            document.querySelector(".city").innerHTML = weather.name;
            document.querySelector(".temp").innerHTML = weather.main.temp + "°C";
            document.querySelector(".sky").innerHTML = weather.weather[0].main;
            document.querySelector(".skySmall").innerHTML = weather.weather[0].description;
            document.querySelector(".bar1").innerHTML = weather.main.humidity + "%";
            document.querySelector(".bar2").innerHTML = weather.main.pressure + " hPa";
            document.querySelector(".bar3").innerHTML = weather.clouds.all + "%";
            stylesheet.cssRules[29].style.width = weather.main.humidity + "%";
            stylesheet.cssRules[30].style.width = (weather.main.pressure - 965) * 100 / 89 + "%";
            stylesheet.cssRules[31].style.width = weather.clouds.all + "%";
        })
        .catch(function (error) {
            console.log(error);
        });
    link = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=daily&appid=6301f16c27be5c2dadd4ba2f11f1b761&units=metric";
    await fetch(link)
        .then((resp) => resp.json())
        .then(function (data) {
            future = data;
        })
        .catch(function (error) {
            console.log(error);
        });
    textChanger(future, 0, 3);
    textChanger(future, 1, 6);
    textChanger(future, 2, 9);
    textChanger(future, 3, 12);
    textChanger(future, 4, 15);
    textChanger(future, 5, 18);
})

function getLongAndLat() {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );
}


var onSuccess = function (position) {
    localisationCords[0] = position.coords.latitude;
    localisationCords[1] = position.coords.longitude;
};

function onError(error) {
    alert('Error: ' + error.message);
}
const locateButtonFetch = async () => {
    try {
        let position = await getLongAndLat(),
            {
                coords
            } = position,
            url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coords.latitude + "&lon=" + coords.longitude + "&exclude=daily&appid=6301f16c27be5c2dadd4ba2f11f1b761&units=metric";
        await fetch(url)
            .then(resp => resp.json())
            .then(data => {
                let future = data;
                console.log(future);
                document.querySelector(".city").innerHTML = weather.name;
                document.querySelector(".temp").innerHTML = future.current.temp + "°C";
                document.querySelector(".sky").innerHTML = future.current.weather[0].main;
                document.querySelector(".skySmall").innerHTML = future.current.weather[0].description;
                document.querySelector(".bar1").innerHTML = future.current.humidity + "%";
                document.querySelector(".bar2").innerHTML = future.current.pressure + " hPa";
                document.querySelector(".bar3").innerHTML = future.current.clouds + "%";
                stylesheet.cssRules[29].style.width = future.current.humidity + "%";
                stylesheet.cssRules[30].style.width = (future.current.pressure - 965) * 100 / 89 + "%";
                stylesheet.cssRules[31].style.width = future.current.clouds + "%";
                textChanger(future, 0, 3);
                textChanger(future, 1, 6);
                textChanger(future, 2, 9);
                textChanger(future, 3, 12);
                textChanger(future, 4, 15);
                textChanger(future, 5, 18);

                link = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coords.latitude + "," + coords.longitude + "&sensor=true&key=AIzaSyBXZ-eYwr57hvckL0FZu_h4ER2pgBKp8JY";
                fetch(link)
                    .then((resp) => resp.json())
                    .then(function (data) {
                        citys = data;
                        console.log(citys);
                        document.querySelector(".city").innerHTML = citys.results[0].address_components[4].long_name;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(e => console.log(error));
    } catch (e) {
        alert('Error: ' + e.message);
    }
}

locate.addEventListener("click", locateButtonFetch);