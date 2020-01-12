var theDate = moment().format("(M/D/YYYY)");
var apikey = "6ad58c387533b011c868da37071d9cec";
var cityNames = [];
var lat;
var lon;
var cityID;
var iconNum;
var queryURL;
var userCity;
var dayCount;
var days = $(".fiveDays");

function displayCityInfo() {
    userCity = $(this).attr("data-name");
    queryURL =
        "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" +
        userCity +
        "&units=imperial&appid=" +
        apikey;

    ajaxCity();
    fiveDayW();
}

function city() {
    $(".weatherInfo").remove();
    userCity = $("#citySearch")
        .val()
        .trim();
    cityNames.push(userCity);

    queryURL =
        "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" +
        userCity +
        "&units=imperial&appid=" +
        apikey;

    ajaxCity();
}

function uv() {
    var queryUVURL =
        "https://api.openweathermap.org/data/2.5/uvi?appid=" +
        apikey +
        "&lat=" +
        lat +
        "&lon=" +
        lon;

    $.ajax({
        url: queryUVURL,
        method: "GET"
    }).then(function (response) {
        $(".uv").text("UV Index: " + response.value);
        $(".cityBtns").empty();

        for (var i = 0; i < cityNames.length; ++i) {
            var cities = $("<button>");
            cities.addClass("cities");
            cities.attr("data-name", cityNames[i]);
            cities.text(cityNames[i]);
            $(".cityBtns").append(cities);
        }
    });
}

function ajaxCity() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        iconNum = response.weather[0].icon;

        $(".cityName").text(response.name + " " + theDate + " ");
        $(".temp").text("Temperature: " + response.main.temp + " °F");
        $(".hum").text("Humidity: " + response.main.humidity + "%");
        $(".wind").text("Wind Speed: " + response.wind.speed);

        var iconURL = "https://openweathermap.org/img/w/" + iconNum + ".png";
        var cityImg = $("<img>");
        cityImg.attr("src", iconURL);
        $(".cityName").append(cityImg);

        lat = response.coord.lat;
        lon = response.coord.lon;
        cityID = response.id;
        uv();
    });
}


function fiveDayW() {
    var daysSection = document.getElementById("title5D");
    daysSection.removeAttribute("class", "hidden");

    var fiveURL =
        "https://api.openweathermap.org/data/2.5/forecast?appid=" +
        apikey +
        "&q=" +
        userCity +
        "&units=imperial";

    $.ajax({
        url: fiveURL,
        method: "GET"
    }).then(function (response) {
        var dayBoxes = $(".fiveBoxes");
        dayBoxes.empty();
        dayCount = 1;

        for (var x = 0; x < response.list.length; ++x) {
            if (response.list[x].dt_txt.includes("00:00:00")) {
                iconNum = response.list[x].weather[0].icon;
                var extraDays = $("<div>");
                var thatDate = $("<h6>");
                var dayImg = $("<img>");
                var extraTemp = $("<h6>");
                var extraHum = $("<h6>");
                var iconURL = "https://openweathermap.org/img/w/" + iconNum + ".png";
                var today = new Date();
                var newDays = new Date();
                newDays.setDate(today.getDate() + dayCount);
                var forecast = moment(newDays).format("MM/D/YYYY");
                thatDate.text(forecast);
                dayImg.attr("src", iconURL);
                extraTemp.text("Temperature: " + response.list[x].main.temp + " °F ");
                extraHum.text("Humidity: " + response.list[x].main.humidity + "% ");

                extraDays.append(thatDate, dayImg, extraTemp, extraHum);
                extraDays.attr("class", "days");
                dayBoxes.append(extraDays);
                ++dayCount;
            }
        }
    });
}

$(".searchBtn").on("click", function () {
    city();
    fiveDayW();
});

$(document).on("click", ".cities", displayCityInfo);