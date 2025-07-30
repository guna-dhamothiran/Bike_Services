const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  selectedServices: [String],
  email: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  customerNote: { type: String },
  pickupDropRequested: { type: Boolean, default: false },
  pickupAddress: { type: String },
  expectedDeliveryTime: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
}, { timestamps: true });


module.exports = mongoose.model('Booking', bookingSchema); // <-- add this
