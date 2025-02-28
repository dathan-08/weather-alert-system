const express = require('express');
const Weather = require('../models/Weather');
const Alert = require('../models/Alert');
const City = require('../models/City')
const { fetchWeatherData } = require('../services/weatherService');


const router = express.Router();

router.get('/weather', async (req, res) => {
  try {
    const cities = await City.find();

    const weatherData = await Weather.aggregate([
      {
        $sort: { timestamp: -1 }, 
      },
      {
        $group: {
          _id: '$city', 
          latestWeather: { $first: '$$ROOT' }, 
        },
      },
      {
        $replaceRoot: { newRoot: '$latestWeather' }, 
      },
      {
        $match: { city: { $in: cities.map(c => c.name) } }, 
      },
    ]);

    res.json(weatherData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/alerts', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/cities', async (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ message: 'City name is required' });
  }

  try {
    const existingCity = await City.findOne({ name: city });
    if (existingCity) {
      return res.status(400).json({ message: 'City is already being monitored' });
    }

    const newCity = new City({ name: city });
    await newCity.save();

    const weatherData = await fetchWeatherData(city);

    res.status(201).json({ message: 'City added successfully', city: newCity, weather: weatherData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;