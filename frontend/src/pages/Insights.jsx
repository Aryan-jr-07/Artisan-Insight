import { useState, useEffect } from 'react'
import { getInsights } from '../utils/api'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import Badge from '../components/ui/Badge'
import PriorityRanking from '../components/charts/PriorityRanking'
import {
  TrendingUp, TrendingDown, AlertTriangle, AlertCircle,
  Minus, Rocket, CheckCircle, Zap, Copy, Megaphone,
  RefreshCw, ArrowUpRight, FileText, Database, ShieldAlert
} from 'lucide-react'

// Mock Data for Priority algorithm demonstration
const MOCK_DIST_DATA = [
  { name: "Aizawl", asi: 42, growth: -5, beneficiaries: 120, consistency: 70, hasZeroYear: false },
  { name: "Lunglei", asi: 55, growth: 12, beneficiaries: 350, consistency: 85, hasZeroYear: false },
  { name: "Champhai", asi: 30, growth: 2, beneficiaries: 80, consistency: 40, hasZeroYear: true },
  { name: "Serchhip", asi: 78, growth: 15, beneficiaries: 500, consistency: 95, hasZeroYear: false },
  { name: "Kolasib", asi: 48, growth: 4, beneficiaries: 150, consistency: 60, hasZeroYear: false },
  { name: "Siaha", asi: 25, growth: -12, beneficiaries: 45, consistency: 30, hasZeroYear: true },
];

const ICON_MAP = {
  TrendingUp, TrendingDown, AlertTriangle, AlertCircle, Minus, Rocket,
  CheckCircle, Zap, Copy, Megaphone, RefreshCw, ArrowUpRight, FileText, Database
}

const TYPE_STYLES = {
  success: { badge: 'success', border: 'border-l-emerald-400', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', labelBg: 'bg-emerald-50 text-emerald-700' },
  danger: { badge: 'danger', border: 'border-l-rose-400', iconBg: 'bg-rose-50', iconColor: 'text-rose-500', labelBg: 'bg-rose-50 text-rose-700' },
  warning: { badge: 'warning', border: 'border-l-amber-400', iconBg: 'bg-amber-50', iconColor: 'text-amber-600', labelBg: 'bg-amber-50 text-amber-700' },
  info: { badge: 'info', border: 'border-l-brand-400', iconBg: 'bg-brand-50', iconColor: 'text-brand-600', labelBg: 'bg-brand-50 text-brand-700' },
}

const PRIORITY_MAP = {
  High: 'bg-rose-50 text-rose-600 border border-rose-100',
  Medium: 'bg-amber-50 text-amber-700 border border-amber-100',
  Low: 'bg-slate-100 text-slate-600 border border-slate-200',
}

function InsightCard({ item }) {
  const style = TYPE_STYLES[item.type] || TYPE_STYLES.info
  const Icon = ICON_MAP[item.icon] || AlertCircle
  return (
    <div className={`card border-l-4 ${style.border} p-5 animate-slide-up`}>
      <div className="flex items-start gap-4">
        <div className={`w-9 h-9 ${style.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
          <Icon size={17} className={style.iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.labelBg}`}>
              {item.category}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mb-1.5">{item.title}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
        </div>
      </div>
    </div>
  )
}

function RecommendationCard({ item }) {
  const style = TYPE_STYLES[item.type] || TYPE_STYLES.info
  const Icon = ICON_MAP[item.icon] || CheckCircle
  return (
    <div className={`card border-l-4 ${style.border} p-5`}>
      <div className="flex items-start gap-4">
        <div className={`w-9 h-9 ${style.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
          <Icon size={17} className={style.iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.labelBg}`}>
              {item.category}
            </span>
            {item.priority && (
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${PRIORITY_MAP[item.priority] || ''}`}>
                {item.priority} Priority
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mb-1.5">{item.title}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
        </div>
      </div>
    </div>
  )
}

export default function Insights() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('insights')

  useEffect(() => {
    getInsights()
      .then(r => setData(r))
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner text="Generating insights…" />

  const summary = data?.summary || { totalBeneficiaries: 0, stateCount: 0, underSupportedCount: 0, topPerformerCount: 0 }
  const insights = data?.insights || []
  const recommendations = data?.recommendations || []

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Beneficiaries', value: summary.totalBeneficiaries?.toLocaleString('en-IN'), color: 'text-brand-700' },
          { label: 'States Analyzed', value: summary.stateCount, color: 'text-slate-700' },
          { label: 'Critical Intervention', value: summary.underSupportedCount, color: 'text-rose-700' },
          { label: 'Top Performers', value: summary.topPerformerCount, color: 'text-emerald-700' },
        ].map(c => (
          <div key={c.label} className={`card p-5 flex flex-col gap-1 hover:shadow-lg transition-all border-none`}>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{c.label}</p>
            <p className={`text-2xl font-black ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 border-b border-slate-200">
        {[
          { key: 'insights', label: `Analysis (${insights.length})` },
          { key: 'recommendations', label: `Directives (${recommendations.length})` },
          { key: 'priority', label: `District Priority Ranking`, icon: ShieldAlert },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-[3px] transition-all -mb-px flex items-center gap-2 ${
              tab === t.key
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {t.icon && <t.icon size={14} />}
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {tab === 'insights' && (
          insights.length > 0
            ? insights.map((item, i) => <InsightCard key={i} item={item} />)
            : <EmptyState title="No insights generated" description="Load data first to generate insights." />
        )}
        {tab === 'recommendations' && (
          recommendations.length > 0
            ? recommendations.map((item, i) => <RecommendationCard key={i} item={item} />)
            : <EmptyState title="No recommendations" description="Run analysis with sufficient data." />
        )}
        {tab === 'priority' && (
           <PriorityRanking data={MOCK_DIST_DATA} />
        )}
      </div>
    </div>
  )
}
