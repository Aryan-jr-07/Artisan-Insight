const express = require('express');
const router = express.Router();
const ArtisanData = require('../models/ArtisanData');

// GET /api/dashboard — main dashboard aggregated data
router.get('/', async (req, res) => {
  try {
    const { yearFrom, yearTo, states } = req.query;
    const filter = {};
    if (yearFrom || yearTo) {
      filter.year = {};
      if (yearFrom) filter.year.$gte = parseInt(yearFrom);
      if (yearTo) filter.year.$lte = parseInt(yearTo);
    }
    if (states) {
      const stateList = Array.isArray(states) ? states : states.split(',');
      if (stateList.length > 0 && stateList[0] !== '') filter.state = { $in: stateList };
    }

    const allData = await ArtisanData.find(filter).sort({ state: 1, year: 1 });
    if (allData.length === 0) {
      return res.json({ success: true, data: null, message: 'No data found. Please load sample data.' });
    }

    // ── Summary stats ──
    const totalBeneficiaries = allData.reduce((s, d) => s + d.beneficiaries, 0);
    const totalBudget = allData.reduce((s, d) => s + d.budget_allocated, 0);
    const uniqueStates = [...new Set(allData.map(d => d.state))];
    const uniqueYears = [...new Set(allData.map(d => d.year))].sort((a, b) => a - b);

    // Latest year comparison
    const latestYear = Math.max(...allData.map(d => d.year));
    const prevYear = latestYear - 1;
    const latestYearData = allData.filter(d => d.year === latestYear);
    const prevYearData = allData.filter(d => d.year === prevYear);
    const latestTotal = latestYearData.reduce((s, d) => s + d.beneficiaries, 0);
    const prevTotal = prevYearData.reduce((s, d) => s + d.beneficiaries, 0);
    const yoyGrowth = prevTotal > 0 ? (((latestTotal - prevTotal) / prevTotal) * 100).toFixed(2) : 0;

    // ── State-wise aggregation ──
    const stateMap = {};
    for (const d of allData) {
      if (!stateMap[d.state]) stateMap[d.state] = { total: 0, count: 0, years: [] };
      stateMap[d.state].total += d.beneficiaries;
      stateMap[d.state].count += 1;
      stateMap[d.state].years.push({ year: d.year, beneficiaries: d.beneficiaries });
    }

    const stateComparison = Object.entries(stateMap)
      .map(([state, val]) => ({
        state,
        total: val.total,
        average: Math.round(val.total / val.count),
      }))
      .sort((a, b) => b.total - a.total);

    // Top 5 and Bottom 5
    const top5 = stateComparison.slice(0, 5);
    const bottom5 = [...stateComparison].sort((a, b) => a.total - b.total).slice(0, 5);

    // ── Year-wise trend ──
    const yearMap = {};
    for (const d of allData) {
      if (!yearMap[d.year]) yearMap[d.year] = { beneficiaries: 0, male: 0, female: 0 };
      yearMap[d.year].beneficiaries += d.beneficiaries;
      yearMap[d.year].male += d.male_beneficiaries || 0;
      yearMap[d.year].female += d.female_beneficiaries || 0;
    }

    const yearlyTrend = uniqueYears.map(year => ({
      year: year.toString(),
      beneficiaries: yearMap[year]?.beneficiaries || 0,
      male: yearMap[year]?.male || 0,
      female: yearMap[year]?.female || 0,
    }));

    // ── Best CAGR state ──
    let bestCAGRState = null;
    let bestCAGR = -Infinity;
    for (const [state, val] of Object.entries(stateMap)) {
      const sorted = val.years.sort((a, b) => a.year - b.year);
      const first = sorted[0]?.beneficiaries;
      const last = sorted[sorted.length - 1]?.beneficiaries;
      const n = sorted.length - 1;
      if (first > 0 && n > 0) {
        const cagr = (Math.pow(last / first, 1 / n) - 1) * 100;
        if (cagr > bestCAGR) {
          bestCAGR = cagr;
          bestCAGRState = state;
        }
      }
    }

    res.json({
      success: true,
      data: {
        summary: {
          totalBeneficiaries,
          totalBudgetLakhs: Math.round(totalBudget),
          statesCount: uniqueStates.length,
          yearsRange: `${uniqueYears[0]}–${uniqueYears[uniqueYears.length - 1]}`,
          latestYearTotal: latestTotal,
          yoyGrowth: parseFloat(yoyGrowth),
          bestCAGRState,
          bestCAGR: parseFloat(bestCAGR.toFixed(2)),
        },
        stateComparison,
        top5,
        bottom5,
        yearlyTrend,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
