const mongoose = require('mongoose');

// Reading schema
const ReadingSchema = new mongoose.Schema({
  sensor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  value: {
    type: Number,
    required: true
  }
});
// Reading model
module.exports = mongoose.model('Reading', ReadingSchema);
