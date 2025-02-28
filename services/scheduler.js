const cron = require('node-cron');
const { fetchWeatherData } = require('./weatherService');
const { checkAlerts } = require('./alertService');

const cities = ['Kochi', 'Aluva', 'Ernakulam'];
const startScheduler = () => {
  cron.schedule('*/1 * * * *', async () => {
    console.log('Fetching weather data...');
    for (const city of cities) {
      const weatherData = await fetchWeatherData(city);
      if (weatherData) {
        checkAlerts(weatherData.city, weatherData.temperature, weatherData.condition);
      }
    }
  });
};

module.exports = { startScheduler };