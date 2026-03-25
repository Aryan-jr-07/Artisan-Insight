/**
 * Rule-Based Recommendation Engine for Artisan Insight
 * Generates insights and recommendations from ASI score data
 */

const THRESHOLDS = {
  HIGH_PERFORMER: 70,
  MODERATE: 45,
  LOW_PERFORMER: 45,
  HIGH_CAGR: 8,
  STAGNANT_CAGR: 1,
  NEGATIVE_CAGR: 0,
  HIGH_CONSISTENCY: 75,
  LOW_CONSISTENCY: 40,
};

function generateInsights(asiScores, allData) {
  const insights = [];
  const recommendations = [];

  const topPerformers = asiScores.filter(s => s.asiScore >= THRESHOLDS.HIGH_PERFORMER);
  const moderate = asiScores.filter(
    s => s.asiScore >= THRESHOLDS.MODERATE && s.asiScore < THRESHOLDS.HIGH_PERFORMER
  );
  const underSupported = asiScores.filter(s => s.asiScore < THRESHOLDS.LOW_PERFORMER);
  const stagnant = asiScores.filter(
    s => s.cagr <= THRESHOLDS.STAGNANT_CAGR && s.cagr >= 0 && s.asiScore < 60
  );
  const declining = asiScores.filter(s => s.cagr < THRESHOLDS.NEGATIVE_CAGR);
  const highGrowth = asiScores.filter(
    s => s.cagr >= THRESHOLDS.HIGH_CAGR && s.asiScore < THRESHOLDS.HIGH_PERFORMER
  );
  const withZeroYears = asiScores.filter(s => s.zeroYears > 0);

  // ── Top Performers ──
  if (topPerformers.length > 0) {
    insights.push({
      type: 'success',
      category: 'High-Performing Regions',
      icon: 'TrendingUp',
      title: `${topPerformers.length} state${topPerformers.length > 1 ? 's' : ''} leading artisan welfare`,
      description: `${topPerformers.map(s => s.state).join(', ')} ${
        topPerformers.length > 1 ? 'are' : 'is'
      } performing exceptionally with ASI scores above ${THRESHOLDS.HIGH_PERFORMER}. These states show strong beneficiary coverage, consistent growth, and sustained policy implementation.`,
      states: topPerformers.map(s => s.state),
      metrics: topPerformers.map(s => ({
        state: s.state,
        asiScore: s.asiScore,
        cagr: s.cagr,
      })),
    });

    recommendations.push({
      type: 'success',
      category: 'Policy Replication',
      icon: 'Copy',
      title: 'Replicate successful models from top-performing states',
      description: `Study and document implementation strategies from ${topPerformers
        .slice(0, 3)
        .map(s => s.state)
        .join(', ')} and create a national best-practices framework.`,
      priority: 'Medium',
      states: topPerformers.map(s => s.state),
    });
  }

  // ── Under-Supported Regions ──
  if (underSupported.length > 0) {
    const criticalStates = underSupported.filter(s => s.asiScore < 25);
    insights.push({
      type: 'danger',
      category: 'Under-Supported Regions',
      icon: 'AlertTriangle',
      title: `${underSupported.length} states require urgent policy attention`,
      description: `${underSupported
        .slice(0, 5)
        .map(s => s.state)
        .join(', ')}${
        underSupported.length > 5 ? ` and ${underSupported.length - 5} more states` : ''
      } have critically low ASI scores, indicating poor beneficiary coverage and weak scheme implementation.`,
      states: underSupported.map(s => s.state),
      metrics: underSupported.map(s => ({
        state: s.state,
        asiScore: s.asiScore,
        avgBeneficiaries: s.avgBeneficiaries,
      })),
    });

    recommendations.push({
      type: 'danger',
      category: 'Immediate Intervention',
      icon: 'Zap',
      title: 'Launch targeted registration drives in under-supported states',
      description: `Deploy field officers and mobile registration units to ${criticalStates
        .slice(0, 4)
        .map(s => s.state)
        .join(
          ', '
        )}. Set quarterly beneficiary enrollment targets and track progress monthly.`,
      priority: 'High',
      states: underSupported.map(s => s.state),
    });

    recommendations.push({
      type: 'warning',
      category: 'Awareness Campaign',
      icon: 'Megaphone',
      title: 'Run multilingual awareness campaigns in low-coverage states',
      description:
        'Partner with state governments and local NGOs to conduct awareness camps about PM Vishwakarma scheme benefits. Use vernacular media and community radio for outreach.',
      priority: 'High',
      states: underSupported.map(s => s.state),
    });
  }

  // ── Stagnant Regions ──
  if (stagnant.length > 0) {
    insights.push({
      type: 'warning',
      category: 'Stagnant Regions',
      icon: 'Minus',
      title: `${stagnant.length} states show near-zero growth — policy inertia detected`,
      description: `${stagnant
        .slice(0, 4)
        .map(s => s.state)
        .join(', ')} have CAGR below ${THRESHOLDS.STAGNANT_CAGR}%, suggesting that existing schemes are not expanding reach. These regions need process-level reforms to unlock growth.`,
      states: stagnant.map(s => s.state),
      metrics: stagnant.map(s => ({ state: s.state, cagr: s.cagr, asiScore: s.asiScore })),
    });

    recommendations.push({
      type: 'warning',
      category: 'Process Reform',
      icon: 'RefreshCw',
      title: 'Conduct beneficiary identification audits in stagnant states',
      description:
        'Commission independent audits to identify implementation bottlenecks. Review gram panchayat-level enrollment data and simplify documentation requirements to reduce barriers.',
      priority: 'Medium',
      states: stagnant.map(s => s.state),
    });
  }

  // ── High-growth but low-coverage ──
  if (highGrowth.length > 0) {
    insights.push({
      type: 'info',
      category: 'Emerging Regions',
      icon: 'Rocket',
      title: `${highGrowth.length} state${highGrowth.length > 1 ? 's are' : ' is'} growing fast but need scale`,
      description: `${highGrowth
        .map(s => s.state)
        .join(', ')} show${highGrowth.length === 1 ? 's' : ''} high growth momentum (CAGR ≥ ${
        THRESHOLDS.HIGH_CAGR
      }%) but remain below top performers in coverage. With investment, these states can rapidly improve their ASI rank.`,
      states: highGrowth.map(s => s.state),
      metrics: highGrowth.map(s => ({ state: s.state, cagr: s.cagr, asiScore: s.asiScore })),
    });

    recommendations.push({
      type: 'info',
      category: 'Scale-up Investment',
      icon: 'ArrowUpRight',
      title: 'Increase budget allocation for high-growth emerging states',
      description: `Channel additional central assistance to ${highGrowth
        .slice(0, 3)
        .map(s => s.state)
        .join(
          ', '
        )}. These states have demonstrated capacity to absorb and deploy resources effectively.`,
      priority: 'Medium',
      states: highGrowth.map(s => s.state),
    });
  }

  // ── Declining States ──
  if (declining.length > 0) {
    insights.push({
      type: 'danger',
      category: 'Declining Coverage',
      icon: 'TrendingDown',
      title: `${declining.length} state${declining.length > 1 ? 's show' : ' shows'} negative growth — beneficiary count declining`,
      description: `${declining
        .map(s => s.state)
        .join(', ')} have recorded a negative CAGR, meaning the actual number of artisans receiving scheme benefits has dropped over time. This may indicate beneficiary dropout or scheme mismanagement.`,
      states: declining.map(s => s.state),
      metrics: declining.map(s => ({ state: s.state, cagr: s.cagr, lastVal: s.lastVal })),
    });
  }

  // ── States with zero-benefit years ──
  if (withZeroYears.length > 0) {
    insights.push({
      type: 'warning',
      category: 'Data & Implementation Gaps',
      icon: 'AlertCircle',
      title: `${withZeroYears.length} states reported zero beneficiaries in at least one year`,
      description: `${withZeroYears
        .map(s => `${s.state} (${s.zeroYears} yr${s.zeroYears > 1 ? 's' : ''})`)
        .join(', ')}. Zero-benefit years indicate either complete scheme failure or data reporting gaps — both requiring investigation.`,
      states: withZeroYears.map(s => s.state),
    });

    recommendations.push({
      type: 'warning',
      category: 'Data Quality',
      icon: 'Database',
      title: 'Establish mandatory real-time reporting for all state schemes',
      description:
        'Set up a centralized digital reporting portal requiring monthly beneficiary data submissions from all state nodal officers, with automated alerts for missing or anomalous reports.',
      priority: 'High',
      states: withZeroYears.map(s => s.state),
    });
  }

  // ── National-level recommendation ──
  recommendations.push({
    type: 'info',
    category: 'Policy Framework',
    icon: 'FileText',
    title: 'Introduce performance-linked funding for state artisan schemes',
    description:
      'Tie central grant allocations to ASI scores and year-over-year improvement. States showing consistent growth should receive incremental funding boosts; stagnant states should trigger mandatory policy reviews.',
    priority: 'Medium',
    states: [],
  });

  return { insights, recommendations };
}

module.exports = { generateInsights };
