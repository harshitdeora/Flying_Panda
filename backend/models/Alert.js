const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  visaType: {
    type: String,
    required: true,
    enum: ['Tourist', 'Business', 'Student']
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Booked', 'Expired'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Alert', alertSchema);

