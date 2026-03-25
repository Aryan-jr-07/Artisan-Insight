import { useState, useEffect } from 'react'
import { getInsights } from '../utils/api'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import Badge from '../components/ui/Badge'
import {
  TrendingUp, TrendingDown, AlertTriangle, AlertCircle,
  Minus, Rocket, CheckCircle, Zap, Copy, Megaphone,
  RefreshCw, ArrowUpRight, FileText, Database
} from 'lucide-react'

const ICON_MAP = {
  TrendingUp, TrendingDown, AlertTriangle, AlertCircle, Minus, Rocket,
  CheckCircle, Zap, Copy, Megaphone, RefreshCw, ArrowUpRight, FileText, Database
}

const TYPE_STYLES = {
  success: {
    badge: 'success',
    border: 'border-l-emerald-400',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    labelBg: 'bg-emerald-50 text-emerald-700',
  },
  danger: {
    badge: 'danger',
    border: 'border-l-rose-400',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
    labelBg: 'bg-rose-50 text-rose-700',
  },
  warning: {
    badge: 'warning',
    border: 'border-l-amber-400',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    labelBg: 'bg-amber-50 text-amber-700',
  },
  info: {
    badge: 'info',
    border: 'border-l-brand-400',
    iconBg: 'bg-brand-50',
    iconColor: 'text-brand-600',
    labelBg: 'bg-brand-50 text-brand-700',
  },
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
          {item.states?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {item.states.slice(0, 8).map(s => (
                <span key={s} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                  {s}
                </span>
              ))}
              {item.states.length > 8 && (
                <span className="text-[10px] text-slate-400 px-2 py-0.5">+{item.states.length - 8} more</span>
              )}
            </div>
          )}
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
  if (!data?.insights) return <EmptyState title="No data to analyze" description="Load data first to generate insights." />

  const { summary, insights, recommendations } = data

  return (
    <div className="space-y-6">
      {/* Summary strip */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Beneficiaries', value: summary.totalBeneficiaries?.toLocaleString('en-IN'), color: 'bg-brand-50 text-brand-700' },
          { label: 'States Analyzed', value: summary.stateCount, color: 'bg-slate-100 text-slate-700' },
          { label: 'Under-supported States', value: summary.underSupportedCount, color: 'bg-rose-50 text-rose-700' },
          { label: 'Top Performers', value: summary.topPerformerCount, color: 'bg-emerald-50 text-emerald-700' },
        ].map(c => (
          <div key={c.label} className={`card p-4 flex flex-col gap-1`}>
            <p className="text-[11px] text-slate-400 font-medium">{c.label}</p>
            <p className={`text-2xl font-bold px-0 ${c.color.split(' ')[1]}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200">
        {[
          { key: 'insights', label: `Insights (${insights.length})` },
          { key: 'recommendations', label: `Recommendations (${recommendations.length})` },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              tab === t.key
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {tab === 'insights' && (
          insights.length > 0
            ? insights.map((item, i) => <InsightCard key={i} item={item} />)
            : <EmptyState title="No insights generated" description="Data may be insufficient for analysis." />
        )}
        {tab === 'recommendations' && (
          recommendations.length > 0
            ? recommendations.map((item, i) => <RecommendationCard key={i} item={item} />)
            : <EmptyState title="No recommendations" description="Run analysis with sufficient data." />
        )}
      </div>
    </div>
  )
}
