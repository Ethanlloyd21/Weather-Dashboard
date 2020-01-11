$(document).ready(function () {

    //setIcons(icon, document.getElementById('icon1'));



    var apiKey = "&appid=6ad58c387533b011c868da37071d9cec";
    var city = "Seattle";
    var latt;
    var longg;
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
                console.log(data);
                console.log(data.main.temp);
                console.log(data.weather[0].main);


                var today = new Date(Date.now() + 1);
                var date = today.toDateString();
                console.log(today);
                console.log(city);
                $('#location').append(data.name);
                $('#dateNow').append(date);
                $('#con').append('Current condition: ' + data.weather[0].description);
                $('#temp').append('Temperature: ' + data.main.temp + ' ' + String.fromCharCode(176) + 'F');
                $('#humidity').append('Humidity: ' + data.main.humidity + '%');
                $('#windSpeed').append('Wind Speed: ' + data.wind.speed + ' MPH');

            }
        });

    }




    $('#submitCity').click(function () {
        var city = $('#cityName').val();


        if (city !== '') {

            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + apiKey,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    console.log(data.main.temp);
                    console.log(data.weather[0].main);


                    var today = new Date(Date.now() + 1);
                    var date = today.toDateString();
                    console.log(today);
                    console.log(city);
                    $('#location').append(data.name);
                    $('#dateNow').append(date);
                    $('#con').append('Current condition: ' + data.weather[0].description);
                    $('#temp').append('Temperature: ' + data.main.temp + ' ' + String.fromCharCode(176) + 'F');
                    $('#humidity').append('Humidity: ' + data.main.humidity + '%');
                    $('#windSpeed').append('Wind Speed: ' + data.wind.speed + ' MPH');


                }


            });

        }
        else {
            $('#error').html('Search cannot be empty');
        }
    });
    /*
    function setIcons(icon, iconID) {
        var skycons = new Skycons({ color: "white"});
        var currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
    */

    function currentTemp(city) {

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + apiKey,
            type: "GET",
            dataType: "json",
            success: function (data) {
                console.log(data);
                console.log(data.main.temp);
                console.log(data.weather[0].main);
                var today = new Date(Date.now() + 1);
                var date = today.toDateString();
                console.log(today);
                console.log(city);
                $('#location').append(data.name);
                $('#dateNow').append(date);
                $('#con').append('Current condition: ' + data.weather[0].main);
                $('#temp').append('Temperature: ' + data.main.temp + ' ' + String.fromCharCode(176) + 'F');
                $('#humidity').append('Humidity: ' + data.main.humidity + '%');
                $('#windSpeed').append('Wind Speed: ' + data.wind.speed + ' MPH');
                $('#uvIndex').append()

            }
        });
    }

    function getUvIndex(city) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + apiKey,
            type: "GET",
            dataType: "json",
            success: function (data) {
                console.log(data);
                console.log(data.weather[0].description);
                console.log(data.weather[0].main);
                var today = new Date(Date.now() + 1);
                var date = today.toDateString();
                console.log(today);
                console.log(city);
                $('#location').append(data.name);
                $('#dateNow').append(date);
                $('#con').append('Current condition: ' + data.weather[0].main);
                $('#temp').append('Temperature: ' + data.main.temp + ' ' + String.fromCharCode(176) + 'F');
                $('#humidity').append('Humidity: ' + data.main.humidity + '%');
                $('#windSpeed').append('Wind Speed: ' + data.wind.speed + ' MPH');


            }
        });
    }


});