# WTF app! 
(What's The Forecast)

This app uses OpenWeather API to retrieve weather data for cities. An AJAX is used to hook into the API and retrieve data in JSON format. The app runs in the browser and feature dynamically updated HTML and CSS powered by jQuery.

## ALERT!
Users will be asked if they want the app to track their location. 

If yes, the app will output the user's location weather condition.
* Alert prompt: This application will now track your location. Please go to your browser settings and enable location. 

If no, the user will be ask to prompt a city of their choice in the search bar.


![](/image/weather2.PNG)

### User story
As a traveler
I want to see the weather outlook for multiple cities
so that I can plan a trip accordingly


### How does it work?

1. When the app is launched, a geolocation API locates the user's location and uses that coordinates to view the user's current location weather. 
2. The user then can view the current conditions and the 5 day forecast of his/her location.
3. The user can search multiple city location. Each city will display the current conditions and the 5 day forecast.


### Current Condition display:

* City
* Date
* Icon image (visual representation of weather conditions)
* Temperature
* Humidity
* Wind speed
* UV index

### 5-Day Forecast display:

* Date
* Icon image (visual representation of weather conditions)
* Temperature
* Humidity


