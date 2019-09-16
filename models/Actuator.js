const mongoose = require('mongoose');

const ActuatorSchema = new mongoose.Schema({
  actuatorType: {
    type: String,
    required: true
  },
  statusType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
});

module.exports = mongoose.model('Actuator', ActuatorSchema);
