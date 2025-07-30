const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { Parser } = require('json2csv');

router.post('/', async (req, res) => {
  try {
    const {
      selectedServices,
      vehicleNumber,
      email,
      expectedDeliveryTime,
      totalAmount,
      customerNote,
      pickupDropRequested,
      pickupAddress
    } = req.body;

    if (!selectedServices || selectedServices.length === 0 || !vehicleNumber ||!email || !expectedDeliveryTime || !totalAmount) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const booking = new Booking({
      selectedServices,
      vehicleNumber,
      email,
      expectedDeliveryTime,
      totalAmount,
      customerNote,
      pickupDropRequested,
      pickupAddress
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { status, serviceType, startDate, endDate } = req.query;
    const query = {};

    if (status) query.status = status;
    if (serviceType) query.selectedServices = serviceType;

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const bookings = await Booking.find(query);
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/export', async (req, res) => {
  try {
    const bookings = await Booking.find();

    const formattedBookings = bookings.map((b) => ({
      id: b._id,
      vehicleNumber: b.vehicleNumber,
      email: b.email,
      totalAmount: b.totalAmount,
      status: b.status,
      createdAt: b.createdAt,
      serviceNames: b.selectedServices?.join(', ') || '',
      deliveryTime: b.expectedDeliveryTime
    }));

    const fields = ['id', 'vehicleNumber','email', 'totalAmount', 'status', 'createdAt', 'serviceNames', 'deliveryTime'];
    const parser = new Parser({ fields });
    const csv = parser.parse(formattedBookings);

    res.header('Content-Type', 'text/csv');
    res.attachment('bookings.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/analytics', async (req, res) => {
  try {
    const total = await Booking.countDocuments();
    const confirmed = await Booking.countDocuments({ status: 'confirmed' });
    const rejected = await Booking.countDocuments({ status: 'rejected' });
    const pending = await Booking.countDocuments({ status: 'pending' });

    const serviceStats = await Booking.aggregate([
      { $unwind: "$selectedServices" },
      {
        $group: {
          _id: "$selectedServices",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          serviceName: "$_id",
          count: 1
        }
      }
    ]);

    res.json({ total, confirmed, rejected, pending, serviceStats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:action', async (req, res) => {
  const { action } = req.params;
  const { id } = req.body;

  if (!['confirmed', 'rejected'].includes(action)) {
    return res.status(400).json({ error: 'Invalid action' });
  }

  try {
    const booking = await Booking.findByIdAndUpdate(id, { status: action }, { new: true });
    console.log(`Booking ${id} updated to ${action}`);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    console.log(`Booking ${req.params.id} deleted`);
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
