/**
 * Artisan Support Index (ASI) Calculator
 * 
 * ASI = 0.40 × Coverage Score + 0.40 × Growth Score + 0.20 × Consistency Score - Zero Penalty
 * 
 * Coverage Score:    Normalized average beneficiary count (0–100)
 * Growth Score:      Normalized CAGR (Compound Annual Growth Rate) (0–100)
 * Consistency Score: % of years with positive YoY growth (0–100)
 * Zero Penalty:      -10 per year with zero beneficiaries
 */

function computeRawMetrics(dataPoints) {
  const sorted = [...dataPoints].sort((a, b) => a.year - b.year);
  const n = sorted.length;

  // Average beneficiaries
  const totalBeneficiaries = sorted.reduce((s, d) => s + d.beneficiaries, 0);
  const avg = totalBeneficiaries / n;

  // CAGR
  const firstVal = sorted[0].beneficiaries;
  const lastVal = sorted[n - 1].beneficiaries;
  const years = n - 1;
  let cagr = 0;
  if (firstVal > 0 && years > 0) {
    cagr = (Math.pow(lastVal / firstVal, 1 / years) - 1) * 100;
  }

  // Consistency: % of years with positive YoY growth
  let positiveGrowthCount = 0;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].beneficiaries > sorted[i - 1].beneficiaries) positiveGrowthCount++;
  }
  const consistency = years > 0 ? (positiveGrowthCount / years) * 100 : 0;

  // Zero penalty: -10 per zero year
  const zeroYears = sorted.filter(d => d.beneficiaries === 0).length;

  // Stagnation penalty: years where growth < 1%
  const stagnantYears = [];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i - 1].beneficiaries > 0) {
      const growth = ((sorted[i].beneficiaries - sorted[i - 1].beneficiaries) / sorted[i - 1].beneficiaries) * 100;
      if (Math.abs(growth) < 1) stagnantYears.push(sorted[i].year);
    }
  }

  return {
    avg,
    cagr,
    consistency,
    zeroYears,
    stagnantYears,
    totalBeneficiaries,
    firstYear: sorted[0]?.year,
    lastYear: sorted[n - 1]?.year,
    firstVal,
    lastVal,
  };
}

function calculateASIScores(groupedByState) {
  const rawMetrics = {};
  for (const [state, dataPoints] of Object.entries(groupedByState)) {
    rawMetrics[state] = computeRawMetrics(dataPoints);
  }

  const allAvgs = Object.values(rawMetrics).map(m => m.avg);
  const allCagrs = Object.values(rawMetrics).map(m => m.cagr);

  const maxAvg = Math.max(...allAvgs);
  const minAvg = Math.min(...allAvgs);
  const maxCagr = Math.max(...allCagrs);
  const minCagr = Math.min(...allCagrs);

  const results = [];

  for (const [state, raw] of Object.entries(rawMetrics)) {
    const coverageScore =
      maxAvg > minAvg ? ((raw.avg - minAvg) / (maxAvg - minAvg)) * 100 : 50;

    const growthScore =
      maxCagr > minCagr
        ? Math.max(0, ((raw.cagr - minCagr) / (maxCagr - minCagr)) * 100)
        : 50;

    const consistencyScore = raw.consistency;

    const penalty = raw.zeroYears * 10;

    const rawASI =
      0.4 * coverageScore + 0.4 * growthScore + 0.2 * consistencyScore - penalty;
    const asiScore = Math.max(0, Math.min(100, rawASI));

    results.push({
      state,
      asiScore: parseFloat(asiScore.toFixed(2)),
      coverageScore: parseFloat(coverageScore.toFixed(2)),
      growthScore: parseFloat(growthScore.toFixed(2)),
      consistencyScore: parseFloat(consistencyScore.toFixed(2)),
      cagr: parseFloat(raw.cagr.toFixed(2)),
      avgBeneficiaries: Math.round(raw.avg),
      totalBeneficiaries: raw.totalBeneficiaries,
      zeroYears: raw.zeroYears,
      stagnantYears: raw.stagnantYears,
      firstYear: raw.firstYear,
      lastYear: raw.lastYear,
      firstVal: raw.firstVal,
      lastVal: raw.lastVal,
    });
  }

  // Sort by ASI descending and assign rank
  results.sort((a, b) => b.asiScore - a.asiScore);
  results.forEach((r, i) => (r.rank = i + 1));

  return results;
}

module.exports = { calculateASIScores, computeRawMetrics };
