const axios = require('axios');
const Weather = require('../models/Weather');
const City = require('../models/City'); 
const checkAlerts = require("../services/alertService")

const fetchWeatherData = async (city) => {
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const { main, weather } = response.data;
    const temperature = main.temp;
    const condition = weather[0].main;

    const newWeather = new Weather({ city, temperature, condition });
    await newWeather.save();

    console.log(`Weather data fetched for ${city}:`, { temperature, condition });

    return { city, temperature, condition };
  } catch (err) {
    console.error(`Error fetching weather data for ${city}:`, err.message);
    return null;
  }
};

module.exports = { fetchWeatherData };