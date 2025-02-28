const Alert = require('../models/Alert');

const checkAlerts = (city, temperature, condition) => {
  const alerts = [];

  if (condition.toLowerCase().includes('rain')) {
    alerts.push({ type: 'rain', message: `Rain detected in ${city}` });
  }
  if (temperature > 30) {
    alerts.push({ type: 'high_temperature', message: `High temperature (${temperature}°C) detected in ${city}` });
  }
  if (temperature < 10) {
    alerts.push({ type: 'low_temperature', message: `Low temperature (${temperature}°C) detected in ${city}` });
  }

  alerts.forEach(async (alert) => {
    const newAlert = new Alert({ city, type: alert.type });
    await newAlert.save();
    console.log(`Alert: ${alert.message} at ${new Date()}`);
  });
};

module.exports = { checkAlerts };