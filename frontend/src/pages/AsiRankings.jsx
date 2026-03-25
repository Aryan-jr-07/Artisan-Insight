import { useState, useEffect } from 'react'
import { getASI } from '../utils/api'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import Badge from '../components/ui/Badge'
import { ArrowUp, ArrowDown, Minus, Trophy, TrendingUp, TrendingDown } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useNavigate } from 'react-router-dom'

function getScoreBadge(score) {
  if (score >= 70) return <Badge variant="success">High</Badge>
  if (score >= 45) return <Badge variant="warning">Moderate</Badge>
  return <Badge variant="danger">Low</Badge>
}

function ScoreBar({ value, color }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-[11px] text-slate-500 w-8 flex-shrink-0">{value}</span>
    </div>
  )
}

function TopPodium({ rankings }) {
  const top3 = rankings.slice(0, 3)
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean)
  const heights = [top3[1] ? 'h-20' : '', 'h-28', top3[2] ? 'h-14' : '']
  const positions = [2, 1, 3]

  return (
    <div className="flex items-end justify-center gap-3 py-4">
      {podiumOrder.map((s, i) => (
        <div key={s.state} className="flex flex-col items-center gap-2">
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-700 max-w-[90px] truncate">{s.state}</p>
            <p className="text-sm font-bold text-slate-900">{s.asiScore}</p>
          </div>
          <div
            className={`${heights[i]} w-20 rounded-t-xl flex items-center justify-center font-bold text-white text-xl`}
            style={{
              background: positions[i] === 1 ? '#f59e0b' : positions[i] === 2 ? '#94a3b8' : '#b45309',
            }}
          >
            {positions[i] === 1 ? <Trophy size={22} /> : positions[i]}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AsiRankings() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState({ key: 'rank', dir: 'asc' })
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getASI()
      .then(r => setData(r))
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner text="Computing ASI scores…" />
  if (!data?.rankings?.length) {
    return (
      <EmptyState
        title="No rankings available"
        description="Please load data first."
        action={<button className="btn-primary" onClick={() => navigate('/upload')}>Go to Upload</button>}
      />
    )
  }

  const { rankings, summary } = data

  const handleSort = (key) => {
    setSort(s => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }))
  }

  const sorted = [...rankings]
    .filter(r => r.state.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const mult = sort.dir === 'asc' ? 1 : -1
      return (a[sort.key] > b[sort.key] ? 1 : -1) * mult
    })

  const SortIcon = ({ k }) => {
    if (sort.key !== k) return <Minus size={10} className="text-slate-300" />
    return sort.dir === 'asc'
      ? <ArrowUp size={10} className="text-brand-500" />
      : <ArrowDown size={10} className="text-brand-500" />
  }

  const topChartData = [...rankings].slice(0, 15).map(r => ({
    state: r.state.split(' ')[0],
    asiScore: r.asiScore,
  }))

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total States Ranked', value: summary.totalStates },
          { label: 'Average ASI Score', value: summary.avgASI },
          { label: 'Median ASI Score', value: summary.medianASI },
          { label: 'Top Ranked State', value: summary.topState?.split(' ').slice(0, 1).join(' ') },
        ].map(c => (
          <div key={c.label} className="card p-4">
            <p className="text-[11px] text-slate-400 font-medium mb-1">{c.label}</p>
            <p className="text-xl font-semibold text-slate-900">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Top 3 + ASI mini-chart */}
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-2 card p-5">
          <h2 className="text-sm font-semibold text-slate-800 mb-1">Top 3 States</h2>
          <p className="text-xs text-slate-400 mb-2">Highest ASI scores nationally</p>
          <TopPodium rankings={rankings} />
        </div>
        <div className="col-span-3 card p-5">
          <h2 className="text-sm font-semibold text-slate-800 mb-0.5">ASI Score Distribution (Top 15)</h2>
          <p className="text-xs text-slate-400 mb-4">Snapshot of top states by score</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={topChartData} barSize={16} margin={{ top: 4, right: 8, left: 0, bottom: 20 }}>
              <XAxis dataKey="state" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} angle={-25} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} domain={[0, 100]} width={30} />
              <Tooltip formatter={(v) => [v, 'ASI Score']} contentStyle={{ borderRadius: 12, fontSize: 12, border: '1px solid #e2e8f0', boxShadow: '0 1px 6px #0001' }} />
              <Bar dataKey="asiScore" radius={[4, 4, 0, 0]}>
                {topChartData.map((_, i) => (
                  <Cell key={i} fill={i < 3 ? '#10b981' : i > topChartData.length - 3 ? '#f43f5e' : '#6366f1'} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rankings Table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Complete State Rankings</h2>
            <p className="text-xs text-slate-400 mt-0.5">Click a column header to sort</p>
          </div>
          <input
            className="input w-52"
            placeholder="Search state…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {[
                  { key: 'rank', label: 'Rank' },
                  { key: 'state', label: 'State' },
                  { key: 'asiScore', label: 'ASI Score' },
                  { key: 'coverageScore', label: 'Coverage' },
                  { key: 'growthScore', label: 'Growth' },
                  { key: 'consistencyScore', label: 'Consistency' },
                  { key: 'cagr', label: 'CAGR %' },
                  { key: 'avgBeneficiaries', label: 'Avg Beneficiaries' },
                ].map(col => (
                  <th
                    key={col.key}
                    className="text-left px-4 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700 transition-colors select-none"
                    onClick={() => handleSort(col.key)}
                  >
                    <span className="flex items-center gap-1">{col.label} <SortIcon k={col.key} /></span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((r, i) => (
                <tr key={r.state} className={`border-b border-slate-50 hover:bg-slate-50/80 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                  <td className="px-4 py-3 text-xs font-bold text-slate-400">#{r.rank}</td>
                  <td className="px-4 py-3 text-xs font-medium text-slate-800">{r.state}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-800">{r.asiScore}</span>
                      {getScoreBadge(r.asiScore)}
                    </div>
                  </td>
                  <td className="px-4 py-3 w-28"><ScoreBar value={r.coverageScore} color="#6366f1" /></td>
                  <td className="px-4 py-3 w-28"><ScoreBar value={r.growthScore} color="#10b981" /></td>
                  <td className="px-4 py-3 w-28"><ScoreBar value={r.consistencyScore} color="#f59e0b" /></td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium flex items-center gap-0.5 ${r.cagr >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {r.cagr >= 5 ? <TrendingUp size={12} /> : r.cagr < 0 ? <TrendingDown size={12} /> : null}
                      {r.cagr}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{r.avgBeneficiaries?.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
