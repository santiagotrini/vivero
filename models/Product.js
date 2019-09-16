const mongoose = require('mongoose');

// Product schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  minT: {
    type: Number,
    required: true
  },
  maxT: {
    type: Number,
    required: true
  },
  minH: {
    type: Number,
    required: true
  },
  maxH: {
    type: Number,
    required: true
  }
});

// Product model
module.exports = mongoose.model('Product', ProductSchema);
