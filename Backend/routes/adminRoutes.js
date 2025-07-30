const express = require('express');
const router = express.Router();
const { loginAdmin, createAdmin } = require('../controllers/adminController');

router.post('/login', loginAdmin);
router.post('/signup', (req, res, next) => {
  console.log('✅ /signup route hit');
  next();
}, createAdmin);


module.exports = router;
