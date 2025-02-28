
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  city: { type: String, required: true },
  type: { type: String, required: true }, 
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Alert', alertSchema);