$(document).ready(function () {

    //setIcons(icon, document.getElementById('icon1'));
    var apiKey = "&appid=6ad58c387533b011c868da37071d9cec";

    var latt;
    var longg;
    var cityNames = [];
    var city = $('#cityName')
        .val()
        .trim();
    cityNames.push(city);
    getLocation();

    //getting the user's location via geoLocation
    function getLocation() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccess);
        }
        else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    //if the user is successfuly located via geoLocation
    function geoSuccess(position) {
        var latt = position.coords.latitude;
        var longg = position.coords.longitude;

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latt + "&lon=" + longg + "&units=imperial" + apiKey,
            type: "GET",
            dataType: "json",
            success: function (data) {
                console.log(data);
                console.log(data.coord.lat);
                var today = new Date(Date.now());
                var date = today.toDateString();
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                console.log(lon);
                //append result
                $('#location').text(data.name);
                $('#dateNow').text(date);
                $('#con').text('Current condition: ' + data.weather[0].description);
                $('#temp').text('Temperature: ' + (parseInt(data.main.temp).toFixed(1)) + ' ' + String.fromCharCode(176) + 'F');
                $('#humidity').text('Humidity: ' + data.main.humidity + '%');
                $('#windSpeed').text('Wind Speed: ' + data.wind.speed + ' MPH');
                updateUvIndex(lat, lon);
                /*$('#uV').append('UV Index: ' + getUvIndex(lat, lon));*/

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

    $('#place').click(function () {
        var loc = $(this).attr("data-name");
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + loc + "&units=imperial" + apiKey,
            method: "GET"
        }).then(function (response) {
            currentCity(city);
            fiveDayFor(city);
        });

    });


    /*
    function setIcons(icon, iconID) {
        var skycons = new Skycons({ color: "white"});
        var currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
    */

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
                console.log(lon);
                //append result
                $('#location').text(data.name);
                $('#dateNow').text(date);
                $('#con').text('Current condition: ' + data.weather[0].description);
                $('#temp').text('Temperature: ' + (parseInt(data.main.temp).toFixed(1)) + ' ' + String.fromCharCode(176) + 'F');
                $('#humidity').text('Humidity: ' + data.main.humidity + '%');
                $('#windSpeed').text('Wind Speed: ' + data.wind.speed + ' MPH');
                updateUvIndex(lat, lon);


            }
        });
    }

    function getUvIndex(latt, longg) {
        var value;
        return $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/uvi?' + apiKey + '&lat=' + latt + '&lon=' + longg,
            method: "GET"
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
                    tempForecast.text("Temperature: " + response.list[x].main.temp + " °F ");
                    humidityFor.text("Humidity: " + response.list[x].main.humidity + "% ");

                    daysForecast.append(dayDate, dayImg, tempForecast, humidityFor);
                    daysForecast.attr("class", "days");
                    box.append(daysForecast);
                    ++count;
                }
            }
        });


    }





});

