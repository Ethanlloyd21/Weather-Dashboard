$(document).ready(function () {

    //setIcons(icon, document.getElementById('icon1'));

    var apiKey = "&APPID=6ad58c387533b011c868da37071d9cec";

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


                    var today = new Date();
                    var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' +
                        today.getFullYear();
                    console.log(date);
                    console.log(city);
                    $('#location').append(city + date);
                    //$('#temp').append()

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

});