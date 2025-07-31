  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const bookingRoutes = require('./routes/bookingRoutes');
  require('dotenv').config();

  const app = express();

  app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
  }));
  app.use(express.json());

  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  });

  app.use('/api/admin', require('./routes/adminRoutes'));
  app.use('/api/booking', bookingRoutes);

  app.get('/', (req, res) => {
    res.send('🚀 Bike Service Booking API is running...');
  });

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
