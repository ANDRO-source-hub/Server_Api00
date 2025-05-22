const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// POST: Simpan lokasi
router.post('/add', async (req, res) => {
  const { device_id, latitude, longitude } = req.body;
  try {
    const location = new Location({ device_id, latitude, longitude });
    await location.save();
    res.json({ success: true, message: 'Location saved' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET: Semua lokasi dari device
router.get('/:device_id', async (req, res) => {
  try {
    const locations = await Location.find({ device_id: req.params.device_id }).sort({ timestamp: -1 });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET: Lokasi terakhir dari device
router.get('/last/:device_id', async (req, res) => {
  try {
    const location = await Location.findOne({ device_id: req.params.device_id }).sort({ timestamp: -1 });
    res.json(location);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
