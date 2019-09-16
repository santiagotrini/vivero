const mongoose = require('mongoose');

// Sensor schema
const SensorSchema = new mongoose.Schema({
  sensorType: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  status: {
    type: Boolean,
    default: true
  }
});
// Sensor model
module.exports = mongoose.model('Sensor', SensorSchema);
