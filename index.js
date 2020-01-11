$(document).ready(function () {

    //setIcons(icon, document.getElementById('icon1'));
    var apiKey = "&appid=6ad58c387533b011c868da37071d9cec";

    var latt;
    var longg;
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
                $('#location').append(data.name);
                $('#dateNow').append(date);
                $('#con').append('Current condition: ' + data.weather[0].description);
                $('#temp').append('Temperature: ' + (parseInt(data.main.temp).toFixed(1)) + ' ' + String.fromCharCode(176) + 'F');
                $('#humidity').append('Humidity: ' + data.main.humidity + '%');
                $('#windSpeed').append('Wind Speed: ' + data.wind.speed + ' MPH');
                $('#uV').append('UV Index: ' + getUvIndex(lat, lon));

                var info = getUvIndex(lat, lon);
                console.log(info);

            }
        });

    }



    /*
    *****Search Field*******
    */
    $('#submitCity').click(function () {
        var city = $('#cityName').val();


        if (city !== '') {

            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + apiKey,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                renderButtons(response.name);
            });
        }
        else {
            $('#error').html('Found error on search field');
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

    function renderButtons(city) {
        $('buttons-view').empty();
        console.log(city);
        var a = $("<button id='place'>");
        // Adding a class of movie to our button
        a.addClass('btn btn-dark');
        // Adding a data-attribute
        a.attr('data-name', city);
        // Providing the initial button text
        a.text(city);
        // Adding the button to the buttons-view div
        $('#buttons-view').append(a);
        console.log(a);
    }

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


            }
        });
    }

    function getUvIndex(latt, longg) {
        var value;
        console.log(apiKey);
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/uvi?' + apiKey + '&lat=' + latt + '&lon=' + longg,
            method: "GET"
        }).then(function (response) {
            value = response.value;
            console.log(value);
            return value;



        });


    }


});