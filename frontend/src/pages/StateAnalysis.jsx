import { useState, useEffect } from 'react'
import { getASIState, getStates } from '../utils/api'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import TrendLineChart from '../components/charts/TrendLineChart'
import Badge from '../components/ui/Badge'
import { TrendingUp, TrendingDown, Users, Banknote, Calendar, Award } from 'lucide-react'

function getASIVariant(score) {
  if (score >= 70) return 'success'
  if (score >= 45) return 'warning'
  return 'danger'
}

export default function StateAnalysis() {
  const [states, setStates] = useState([])
  const [selected, setSelected] = useState('')
  const [stateData, setStateData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getStates()
      .then(r => {
        setStates(r.states || [])
        if (r.states?.length) setSelected(r.states[0])
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!selected) return
    setLoading(true)
    getASIState(selected)
      .then(r => setStateData(r))
      .catch(() => setStateData(null))
      .finally(() => setLoading(false))
  }, [selected])

  const r = stateData?.ranking
  const history = stateData?.history || []

  // YoY growth for latest year
  const latestYoY = history.length >= 2
    ? (((history[history.length - 1].beneficiaries - history[history.length - 2].beneficiaries) /
        Math.max(history[history.length - 2].beneficiaries, 1)) * 100).toFixed(1)
    : null

  return (
    <div className="space-y-6">
      {/* State Selector */}
      <div className="card p-5">
        <div className="flex items-center gap-4">
          <div>
            <label className="section-label block mb-1.5">Select State</label>
            <select
              className="select w-72"
              value={selected}
              onChange={e => setSelected(e.target.value)}
            >
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {r && (
            <div className="flex items-center gap-3 ml-4">
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <p className="text-[11px] text-slate-400">ASI Rank</p>
                <p className="text-2xl font-bold text-slate-900">#{r.rank}</p>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <p className="text-[11px] text-slate-400">ASI Score</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-2xl font-bold text-slate-900">{r.asiScore}</p>
                  <Badge variant={getASIVariant(r.asiScore)}>
                    {r.asiScore >= 70 ? 'High' : r.asiScore >= 45 ? 'Moderate' : 'Low'}
                  </Badge>
                </div>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <p className="text-[11px] text-slate-400">CAGR</p>
                <p className={`text-2xl font-bold ${r.cagr >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {r.cagr >= 0 ? '+' : ''}{r.cagr}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {loading && <LoadingSpinner text={`Loading data for ${selected}…`} />}

      {!loading && stateData && r && (
        <>
          {/* Stat row */}
          <div className="grid grid-cols-4 gap-4">
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-brand-50 rounded-xl flex items-center justify-center">
                  <Users size={15} className="text-brand-600" />
                </div>
                <p className="text-xs text-slate-500 font-medium">Avg Beneficiaries</p>
              </div>
              <p className="text-xl font-bold text-slate-900">{r.avgBeneficiaries?.toLocaleString('en-IN')}</p>
              <p className="text-[11px] text-slate-400 mt-1">Per year average</p>
            </div>
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <TrendingUp size={15} className="text-emerald-600" />
                </div>
                <p className="text-xs text-slate-500 font-medium">Latest YoY Growth</p>
              </div>
              <p className={`text-xl font-bold ${latestYoY >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {latestYoY !== null ? `${latestYoY >= 0 ? '+' : ''}${latestYoY}%` : '—'}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Vs prior year</p>
            </div>
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Calendar size={15} className="text-amber-600" />
                </div>
                <p className="text-xs text-slate-500 font-medium">Data Range</p>
              </div>
              <p className="text-xl font-bold text-slate-900">{r.firstYear}–{r.lastYear}</p>
              <p className="text-[11px] text-slate-400 mt-1">{history.length} years of data</p>
            </div>
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-rose-50 rounded-xl flex items-center justify-center">
                  <Award size={15} className="text-rose-500" />
                </div>
                <p className="text-xs text-slate-500 font-medium">Consistency Score</p>
              </div>
              <p className="text-xl font-bold text-slate-900">{r.consistencyScore}</p>
              <p className="text-[11px] text-slate-400 mt-1">Growth consistency</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-5 gap-5">
            {/* Line chart */}
            <div className="col-span-3 card p-6">
              <h2 className="text-sm font-semibold text-slate-800 mb-0.5">Beneficiary Trend</h2>
              <p className="text-xs text-slate-400 mb-5">Year-wise beneficiary count for {selected}</p>
              <TrendLineChart
                data={history.map(h => ({ year: h.year.toString(), beneficiaries: h.beneficiaries, male: h.male, female: h.female }))}
                lines={[
                  { key: 'beneficiaries', name: 'Total', color: '#6366f1' },
                  { key: 'female', name: 'Female', color: '#ec4899' },
                  { key: 'male', name: 'Male', color: '#06b6d4' },
                ]}
                showLegend
                height={250}
              />
            </div>

            {/* ASI Score breakdown */}
            <div className="col-span-2 card p-6 flex flex-col gap-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-800 mb-0.5">ASI Score Breakdown</h2>
                <p className="text-xs text-slate-400">Component-wise scores for {selected}</p>
              </div>
              <div className="space-y-5 mt-2">
                {[
                  { label: 'Coverage Score', value: r.coverageScore, color: '#6366f1', desc: '40% weight — Avg beneficiaries' },
                  { label: 'Growth Score', value: r.growthScore, color: '#10b981', desc: '40% weight — CAGR normalized' },
                  { label: 'Consistency Score', value: r.consistencyScore, color: '#f59e0b', desc: '20% weight — YoY positive growth %' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div>
                        <p className="text-xs font-medium text-slate-700">{item.label}</p>
                        <p className="text-[10px] text-slate-400">{item.desc}</p>
                      </div>
                      <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.value}%`, background: item.color }} />
                    </div>
                  </div>
                ))}

                <div className="border-t border-slate-100 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-semibold text-slate-700">Overall ASI Score</p>
                    <span className="text-lg font-bold text-slate-900">{r.asiScore}</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${r.asiScore}%`,
                        background: r.asiScore >= 70 ? '#10b981' : r.asiScore >= 45 ? '#f59e0b' : '#f43f5e',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* History Table */}
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-800">Year-wise Data Table</h2>
              <p className="text-xs text-slate-400 mt-0.5">Detailed breakdown for {selected}</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Year', 'Total Beneficiaries', 'Male', 'Female', 'Budget (₹L)', 'YoY Growth'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((row, i) => {
                  const prev = history[i - 1]
                  const yoy = prev && prev.beneficiaries > 0
                    ? (((row.beneficiaries - prev.beneficiaries) / prev.beneficiaries) * 100).toFixed(1)
                    : null
                  return (
                    <tr key={row.year} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3 text-xs font-semibold text-slate-700">{row.year}</td>
                      <td className="px-5 py-3 text-xs font-bold text-brand-700">{row.beneficiaries?.toLocaleString('en-IN')}</td>
                      <td className="px-5 py-3 text-xs text-slate-600">{row.male?.toLocaleString('en-IN') || '—'}</td>
                      <td className="px-5 py-3 text-xs text-slate-600">{row.female?.toLocaleString('en-IN') || '—'}</td>
                      <td className="px-5 py-3 text-xs text-slate-600">₹{row.budget?.toLocaleString('en-IN') || '—'}</td>
                      <td className="px-5 py-3">
                        {yoy !== null ? (
                          <span className={`text-xs font-medium flex items-center gap-0.5 ${parseFloat(yoy) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                            {parseFloat(yoy) >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {yoy}%
                          </span>
                        ) : <span className="text-xs text-slate-300">—</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!loading && !stateData && selected && (
        <EmptyState title="No data for this state" description="The selected state has no records in the database." />
      )}
    </div>
  )
}
