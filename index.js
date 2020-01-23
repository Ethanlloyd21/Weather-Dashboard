$(document).ready(function () {

    var apiKey = "&appid=6ad58c387533b011c868da37071d9cec";

    var latt;
    var longg;
    var cityNames = [];

    var question = confirm('Do you want this app to track your location? Ok for Yes , Cancel for No');
    if (question === true) {
        alert("This application will now track your location. Please go to your browser's setting and enable location.");
        getLocation();
    }
    else {
        $('#info').text('Enter a city on the search box!');
        $('#info2').text('Forget the weather person on your local cable network. Today, smartphone and web apps provide up-to-the-minute weather alerts and updates that can’t be found anywhere else.');

    }


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
        $('#info').remove();
        $('#info2').remove();

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?lat=" + latt + "&lon=" + longg + "&units=imperial" + apiKey,
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
                $('#temp').text('Now: ' + (parseInt(data.main.temp).toFixed(1)) + ' ' + String.fromCharCode(176) + 'F');
                $('#humidity').text('Humidity: ' + data.main.humidity + '%');
                $('#windSpeed').text('Wind Speed: ' + data.wind.speed + ' MPH');
                $('#like').text('Feels like: ' + (parseInt(data.main.feels_like).toFixed(1) + ' ' + String.fromCharCode(176) + 'F'));
                $('#low').text('Lows for today : ' + (parseInt(data.main.temp_min).toFixed(1) + ' ' + String.fromCharCode(176) + 'F'));
                $('#high').text('Highs for today: ' + (parseInt(data.main.temp_max).toFixed(1) + ' ' + String.fromCharCode(176) + 'F'));
                $('#rise').text('Sunrise: ' + unix_Time(data.sys.sunrise));
                $('#set').text('Sunset: ' + unix_Time(data.sys.sunset));
                $('#pressure').text('Pressure: ' + data.main.pressure + ' ' + 'Pa');
                console.log(unix_Time(data.sys.sunrise));
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
        $('#info').remove();
        $('#info2').remove();


        if (city !== '') {

            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + apiKey,
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
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + apiKey,
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
                $('#temp').text('Now: ' + (parseInt(data.main.temp).toFixed(1)) + ' ' + String.fromCharCode(176) + 'F');
                $('#humidity').text('Humidity: ' + data.main.humidity + '%');
                $('#windSpeed').text('Wind Speed: ' + data.wind.speed + ' MPH');
                $('#like').text('Feels like: ' + (parseInt(data.main.feels_like).toFixed(1) + ' ' + String.fromCharCode(176) + 'F'));
                $('#low').text('Lows for today : ' + (parseInt(data.main.temp_min).toFixed(1) + ' ' + String.fromCharCode(176) + 'F'));
                $('#high').text('Highs for today: ' + (parseInt(data.main.temp_max).toFixed(1) + ' ' + String.fromCharCode(176) + 'F'));
                $('#rise').text('Sunrise: ' + unix_Time(data.sys.sunrise));
                $('#set').text('Sunset: ' + unix_Time(data.sys.sunset));
                $('#pressure').text('Pressure: ' + data.main.pressure + ' ' + 'Pa');
                console.log(unix_Time(data.sys.sunrise));
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
            url: 'https://api.openweathermap.org/data/2.5/uvi?' + apiKey + '&lat=' + latt + '&lon=' + longg,
            method: "GET"
        }).then(function (response) {
            $('#uV').text('UV Index: ' + response.value);

        });

    }

    function fiveDayFor(userCity) {

        var APIKey = '6ad58c387533b011c868da37071d9cec';
        var fiveURL =
            "https://api.openweathermap.org/data/2.5/forecast?appid=" +
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
                if (response.list[x].dt_txt.includes('00:00:00')) {
                    iconObj = response.list[x].weather[0].icon;
                    var daysForecast = $('<div class="col-sm-12 col-md-auto col-lg-0" id="days">');

                    var dayDate = $('<h6>');
                    var dayImg = $('<img>');
                    var desc = $('<h6>');
                    var tempForecastMax = $('<h6>');
                    var tempForecastMin = $('<h6>');

                    var humidityFor = $('<h6>');
                    var iconURL = "https://openweathermap.org/img/w/" + iconObj + ".png";
                    var today = new Date();
                    var futureDate = new Date();
                    futureDate.setDate(today.getDate() + count);
                    var forecast = moment(futureDate).format("MM/D");
                    dayDate.text(forecast);
                    dayImg.attr("src", iconURL);
                    desc.text(response.list[x].weather[0].description);
                    tempForecastMin.text("Min.: " + parseInt(response.list[x].main.temp_min).toFixed(1) + " °F ");
                    tempForecastMax.text("Max: " + parseInt(response.list[x].main.temp_max).toFixed(1) + " °F ");
                    humidityFor.text("Humidity: " + response.list[x].main.humidity + "% ");
                    console.log(response);
                    console.log(unix_Time(response.list[x].dt));
                    daysForecast.append(dayDate, dayImg, desc, tempForecastMax, tempForecastMin, humidityFor);


                    //daysForecast.attr("class", "days");
                    box.append(daysForecast);
                    ++count;
                }
            }
        });


    }

    function unix_Time(t) {
        var dt = new Date(t * 1000);
        var hr = dt.getHours();
        var m = "0" + dt.getMinutes();

        var time;
        if (hr > 12) {
            time = "pm"
        }
        else {
            time = "am"
        }

        return hr + ':' + m.substr(-2) + ' ' + time;
    }

    function displayCityInfo() {
        var userCity = $(this).attr("data-name");

        currentCity(userCity);
        fiveDayFor(userCity);
    }

    $(document).on('click', '#place', displayCityInfo);


});

