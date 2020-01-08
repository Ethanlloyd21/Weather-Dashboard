$(document).read(function() {

    $('#submitCity').click(function(){
        var city = $('#cityName').val();

        if (city !== '') {

        }
        else {
            $('#error').html('Search cannot be empty');
        }
    });

});