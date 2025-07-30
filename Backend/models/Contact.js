const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  fullname: String,
  mail: String,
  subject: String,
  phone: String,
  interested: String,
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
