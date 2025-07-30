const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => /^\d{10}$/.test(phone);

router.post('/', async (req, res) => {
  try {
    const { fullname, mail, subject, phone, interested } = req.body;

    if (!fullname || !mail || !subject || !phone || !interested) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!isValidEmail(mail)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({ message: 'Phone number must be 10 digits.' });
    }

    const newContact = new Contact({ fullname, mail, subject, phone, interested });
    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully.' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
