const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
  username: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);

router.post('/', async (req, res) => {
  try {
    const { username, text } = req.body;

    if (!username || !text) {
      return res.status(400).json({ message: 'Username and review text are required.' });
    }

    const newReview = new Review({ username, text });
    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // Sort by newest first
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
