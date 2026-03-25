import { useState, useEffect, useCallback } from 'react'
import { Users, TrendingUp, Landmark, Award, RefreshCw } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import StateBarChart from '../components/charts/StateBarChart'
import TrendLineChart from '../components/charts/TrendLineChart'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import Badge from '../components/ui/Badge'
import { getDashboard, getYears, loadSampleData } from '../utils/api'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [years, setYears] = useState([])
  const [filterYear, setFilterYear] = useState('')
  const [loadingDemo, setLoadingDemo] = useState(false)
  const navigate = useNavigate()

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const params = filterYear ? { yearFrom: filterYear, yearTo: filterYear } : {}
      const res = await getDashboard(params)
      setData(res.data)
    } catch {
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [filterYear])

  useEffect(() => {
    fetchData()
    getYears().then(r => setYears(r.years || [])).catch(() => {})
  }, [fetchData])

  const handleLoadDemo = async () => {
    setLoadingDemo(true)
    try {
      await loadSampleData()
      await fetchData()
      const yr = await getYears()
      setYears(yr.years || [])
    } catch {
    } finally {
      setLoadingDemo(false)
    }
  }

  if (loading) return <LoadingSpinner text="Loading dashboard data…" />

  if (!data) {
    return (
      <EmptyState
        title="No data loaded"
        description="Load the sample dataset to explore artisan welfare analytics across India."
        action={
          <button className="btn-primary" onClick={handleLoadDemo} disabled={loadingDemo}>
            {loadingDemo ? 'Loading…' : 'Load Sample Data'}
          </button>
        }
      />
    )
  }

  const { summary, stateComparison, top5, bottom5, yearlyTrend } = data

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 font-medium">Year</label>
            <select
              className="select w-36"
              value={filterYear}
              onChange={e => setFilterYear(e.target.value)}
            >
              <option value="">All Years</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          {filterYear && (
            <button className="btn-ghost text-xs" onClick={() => setFilterYear('')}>
              Clear filter
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{summary.yearsRange}</span>
          <button className="btn-ghost p-2" onClick={fetchData} title="Refresh">
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Total Beneficiaries"
          value={summary.totalBeneficiaries.toLocaleString('en-IN')}
          sub={summary.yearsRange}
          icon={Users}
          iconBg="bg-brand-50"
          iconColor="text-brand-600"
          trend={summary.yoyGrowth}
          trendLabel="vs previous year"
        />
        <StatCard
          label="States Covered"
          value={summary.statesCount}
          sub="All Indian states & UTs"
          icon={Landmark}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          label="Best Growth State"
          value={summary.bestCAGRState?.split(' ').slice(0, 1).join(' ')}
          sub={`${summary.bestCAGR}% CAGR`}
          icon={TrendingUp}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          label="Latest Year Total"
          value={summary.latestYearTotal?.toLocaleString('en-IN')}
          sub="Beneficiaries enrolled"
          icon={Award}
          iconBg="bg-rose-50"
          iconColor="text-rose-500"
          trend={summary.yoyGrowth}
        />
      </div>

      {/* Main Chart */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">State-wise Beneficiary Distribution</h2>
            <p className="text-xs text-slate-400 mt-0.5">Cumulative beneficiary count per state</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Top 5
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Bottom 5
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500 inline-block" /> Others
            </span>
          </div>
        </div>
        <StateBarChart data={stateComparison} />
      </div>

      {/* Two columns: Trend + Top/Bottom */}
      <div className="grid grid-cols-5 gap-5">
        {/* Year-wise Trend */}
        <div className="col-span-3 card p-6">
          <h2 className="text-sm font-semibold text-slate-800 mb-0.5">National Year-wise Trend</h2>
          <p className="text-xs text-slate-400 mb-5">Aggregate beneficiaries across all states</p>
          <TrendLineChart
            data={yearlyTrend}
            lines={[
              { key: 'beneficiaries', name: 'Total', color: '#6366f1' },
              { key: 'female', name: 'Female', color: '#ec4899' },
              { key: 'male', name: 'Male', color: '#06b6d4' },
            ]}
            showLegend
            height={240}
          />
        </div>

        {/* Top 5 & Bottom 5 */}
        <div className="col-span-2 card p-6 flex flex-col gap-5">
          {/* Top 5 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold text-slate-800">Top Performers</h2>
              <Badge variant="success">Top 5</Badge>
            </div>
            <ol className="space-y-2">
              {top5.map((s, i) => (
                <li key={s.state} className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/states')}>
                  <span className="w-5 h-5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700 truncate group-hover:text-brand-600 transition-colors">{s.state}</p>
                    <div className="mt-0.5 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 rounded-full transition-all"
                        style={{ width: `${(s.total / top5[0].total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium flex-shrink-0">
                    {(s.total / 1000).toFixed(0)}k
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="border-t border-slate-100" />

          {/* Bottom 5 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold text-slate-800">Needs Attention</h2>
              <Badge variant="danger">Bottom 5</Badge>
            </div>
            <ol className="space-y-2">
              {bottom5.map((s, i) => (
                <li key={s.state} className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/insights')}>
                  <span className="w-5 h-5 bg-red-50 text-red-500 text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700 truncate group-hover:text-rose-600 transition-colors">{s.state}</p>
                    <div className="mt-0.5 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-400 rounded-full"
                        style={{ width: `${Math.max((s.total / (top5[0]?.total || 1)) * 100, 2)}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium flex-shrink-0">
                    {s.total < 1000 ? s.total : `${(s.total / 1000).toFixed(1)}k`}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
