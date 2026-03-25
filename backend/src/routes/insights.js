const express = require('express');
const router = express.Router();
const ArtisanData = require('../models/ArtisanData');
const { calculateASIScores } = require('../utils/asiCalculator');
const { generateInsights } = require('../utils/recommendationEngine');

// GET /api/insights — generate insights and recommendations
router.get('/', async (req, res) => {
  try {
    const allData = await ArtisanData.find({}).sort({ year: 1 });
    if (allData.length === 0) {
      return res.json({ success: true, insights: [], recommendations: [], message: 'No data available.' });
    }

    // Group and compute ASI
    const grouped = {};
    for (const d of allData) {
      if (!grouped[d.state]) grouped[d.state] = [];
      grouped[d.state].push({ year: d.year, beneficiaries: d.beneficiaries });
    }

    const asiScores = calculateASIScores(grouped);
    const { insights, recommendations } = generateInsights(asiScores, allData);

    // Quick stat summary for insights header
    const totalBeneficiaries = allData.reduce((s, d) => s + d.beneficiaries, 0);
    const stateCount = Object.keys(grouped).length;
    const underSupportedCount = asiScores.filter(s => s.asiScore < 45).length;
    const topPerformerCount = asiScores.filter(s => s.asiScore >= 70).length;

    res.json({
      success: true,
      summary: { totalBeneficiaries, stateCount, underSupportedCount, topPerformerCount },
      insights,
      recommendations,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
