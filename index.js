$(document).ready(function () {

    alert("This application tracks your location. Please go to you browser settings and allow location. For Google Chrome browser go to: " +
        "Settings > Advanced > Privacy and Security > Permissions > and then ALLOW Location and Insecure content");

    var apiKey = "&appid=6ad58c387533b011c868da37071d9cec";

    var latt;
    var longg;
    var cityNames = [];

    getLocation();


    function getLocation() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccess);
        }
        else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function geoSuccess(position) {
        var latt = position.coords.latitude;
        var longg = position.coords.longitude;

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latt + "&lon=" + longg + "&units=imperial" + apiKey,
            type: "GET",
            dataType: "json",
            success: function (data) {

                var today = new Date(Date.now());
                var date = today.toDateString();
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                var iconObj = data.weather[0].icon;


                $('#location').text(data.name);
                $('#dateNow').text(date);
                $('#con').text('Current condition: ' + data.weather[0].description);
                $('#temp').text('Temperature: ' + (parseInt(data.main.temp).toFixed(1)) + ' ' + String.fromCharCode(176) + 'F');
                $('#humidity').text('Humidity: ' + data.main.humidity + '%');
                $('#windSpeed').text('Wind Speed: ' + data.wind.speed + ' MPH');
                updateUvIndex(lat, lon);

                var iconURL = "https://openweathermap.org/img/w/" + iconObj + ".png";
                var cityImg = $("<img>");
                cityImg.attr("src", iconURL);
                $('#location').append(cityImg);

                fiveDayFor(data.name);

                /*Spencer gave me this code and I want to keep it here. It is a 2nd solution to the ajax return problem
                $('#uV').append('UV Index: ' + getUvIndex(lat, lon));*/

                /*
                getUvIndex(lat, lon).then(function (response) {
                    console.log(response.value);

                })*/


            }
        });

    }



    /*
    *****Search Field*******
    */
    $('#submitCity').click(function () {

        var city = $('#cityName')
            .val()
            .trim();
        cityNames.push(city);


        if (city !== '') {

            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + apiKey,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                renderButtons(response.name);
                currentCity(city);
                fiveDayFor(city);
            });
        }
        else {
            $('#error').html('Search field cannot be empty');
        }
    });

    function renderButtons(city) {
        $('buttons-view').empty();
        console.log(city);
        var a = $("<button id='place'>");

        a.addClass('btn btn-dark');

        a.attr('data-name', city);

        a.text(city);

        $('#buttons-view').append(a);

    }

    function currentCity(city) {

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + apiKey,
            type: "GET",
            dataType: "json",
            success: function (data) {
                var today = new Date(Date.now());
                var date = today.toDateString();
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                var iconObj = data.weather[0].icon;

                $('#location').text(data.name);
                $('#dateNow').text(date);
                $('#con').text('Current condition: ' + data.weather[0].description);
                $('#temp').text('Temperature: ' + (parseInt(data.main.temp).toFixed(1)) + ' ' + String.fromCharCode(176) + 'F');
                $('#humidity').text('Humidity: ' + data.main.humidity + '%');
                $('#windSpeed').text('Wind Speed: ' + data.wind.speed + ' MPH');
                updateUvIndex(lat, lon);

                var iconURL = "https://openweathermap.org/img/w/" + iconObj + ".png";
                var cityImg = $("<img>");
                cityImg.attr("src", iconURL);
                $('#location').append(cityImg);


            }
        });
    }

    function updateUvIndex(latt, longg) {
        var value;
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/uvi?' + apiKey + '&lat=' + latt + '&lon=' + longg,
            method: "GET"
        }).then(function (response) {
            $('#uV').text('UV Index: ' + response.value);

        });

    }

    function fiveDayFor(userCity) {

        var APIKey = '6ad58c387533b011c868da37071d9cec';
        var fiveURL =
            "http://api.openweathermap.org/data/2.5/forecast?appid=" +
            APIKey +
            "&q=" +
            userCity +
            "&units=imperial";


        $('#fiveForecast').text('5-day Forecast:');

        $.ajax({
            url: fiveURL,
            method: "GET"
        }).then(function (response) {
            var box = $("#forecastbox");
            box.empty();
            count = 1;

            for (var x = 0; x < response.list.length; ++x) {
                if (response.list[x].dt_txt.includes("00:00:00")) {
                    iconObj = response.list[x].weather[0].icon;
                    var daysForecast = $("<div>");
                    var dayDate = $("<h6>");
                    var dayImg = $("<img>");
                    var tempForecast = $("<h6>");
                    var humidityFor = $("<h6>");
                    var iconURL = "https://openweathermap.org/img/w/" + iconObj + ".png";
                    var today = new Date();
                    var futureDate = new Date();
                    futureDate.setDate(today.getDate() + count);
                    var forecast = moment(futureDate).format("MM/D/YYYY");
                    dayDate.text(forecast);
                    dayImg.attr("src", iconURL);
                    tempForecast.text("Temp: " + parseInt(response.list[x].main.temp).toFixed(1) + " °F ");
                    humidityFor.text("Humidity: " + response.list[x].main.humidity + "% ");

                    daysForecast.append(dayDate, dayImg, tempForecast, humidityFor);
                    daysForecast.attr("class", "days");
                    box.append(daysForecast);
                    ++count;
                }
            }
        });


    }

    function displayCityInfo() {
        var userCity = $(this).attr("data-name");

        currentCity(userCity);
        fiveDayFor(userCity);
    }

    $(document).on('click', '#place', displayCityInfo);


});

