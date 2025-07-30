const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  username: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
