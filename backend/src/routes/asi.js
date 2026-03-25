const express = require('express');
const router = express.Router();
const ArtisanData = require('../models/ArtisanData');
const { calculateASIScores } = require('../utils/asiCalculator');

// GET /api/asi — compute & return ASI rankings
router.get('/', async (req, res) => {
  try {
    const allData = await ArtisanData.find({}).sort({ year: 1 });
    if (allData.length === 0) {
      return res.json({ success: true, rankings: [], message: 'No data available.' });
    }

    // Group data by state
    const grouped = {};
    for (const d of allData) {
      if (!grouped[d.state]) grouped[d.state] = [];
      grouped[d.state].push({ year: d.year, beneficiaries: d.beneficiaries });
    }

    const rankings = calculateASIScores(grouped);

    // Summary stats
    const scores = rankings.map(r => r.asiScore);
    const avgASI = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
    const medianASI = scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)].toFixed(2);

    res.json({
      success: true,
      summary: {
        totalStates: rankings.length,
        avgASI: parseFloat(avgASI),
        medianASI: parseFloat(medianASI),
        topState: rankings[0]?.state,
        bottomState: rankings[rankings.length - 1]?.state,
      },
      rankings,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/asi/:state — ASI detail for a single state
router.get('/:state', async (req, res) => {
  try {
    const stateData = await ArtisanData.find({ state: req.params.state }).sort({ year: 1 });
    if (stateData.length === 0) {
      return res.status(404).json({ success: false, message: 'State not found' });
    }

    // Get all data for normalization context
    const allData = await ArtisanData.find({}).sort({ year: 1 });
    const grouped = {};
    for (const d of allData) {
      if (!grouped[d.state]) grouped[d.state] = [];
      grouped[d.state].push({ year: d.year, beneficiaries: d.beneficiaries });
    }

    const rankings = calculateASIScores(grouped);
    const stateRanking = rankings.find(r => r.state === req.params.state);

    // Historical data for this state
    const history = stateData.map(d => ({
      year: d.year,
      beneficiaries: d.beneficiaries,
      male: d.male_beneficiaries,
      female: d.female_beneficiaries,
      budget: d.budget_allocated,
    }));

    res.json({ success: true, state: req.params.state, ranking: stateRanking, history });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
