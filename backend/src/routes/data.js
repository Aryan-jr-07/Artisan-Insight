const express = require('express');
const router = express.Router();
const ArtisanData = require('../models/ArtisanData');

// GET /api/data — list all records with optional filters
router.get('/', async (req, res) => {
  try {
    const { state, year, page = 1, limit = 100 } = req.query;
    const filter = {};
    if (state) filter.state = { $in: Array.isArray(state) ? state : [state] };
    if (year) filter.year = parseInt(year);

    const data = await ArtisanData.find(filter)
      .sort({ state: 1, year: 1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await ArtisanData.countDocuments(filter);
    res.json({ success: true, total, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/data/states — distinct states
router.get('/states', async (req, res) => {
  try {
    const states = await ArtisanData.distinct('state');
    res.json({ success: true, states: states.sort() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/data/years — distinct years
router.get('/years', async (req, res) => {
  try {
    const years = await ArtisanData.distinct('year');
    res.json({ success: true, years: years.sort((a, b) => a - b) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/data/load-sample — load sample data
router.post('/load-sample', async (req, res) => {
  try {
    const sampleData = require('../data/sampleData');
    await ArtisanData.deleteMany({});
    await ArtisanData.insertMany(sampleData);
    res.json({
      success: true,
      message: `Loaded ${sampleData.length} sample records`,
      count: sampleData.length,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/data — clear all data
router.delete('/', async (req, res) => {
  try {
    const result = await ArtisanData.deleteMany({});
    res.json({ success: true, deleted: result.deletedCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
