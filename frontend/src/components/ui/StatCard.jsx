export default function StatCard({ label, value, sub, icon: Icon, iconBg = 'bg-brand-50', iconColor = 'text-brand-600', trend, trendLabel }) {
  const isPositive = trend >= 0
  return (
    <div className="card p-5 flex flex-col gap-4 animate-slide-up">
      <div className="flex items-start justify-between">
        <div className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon size={17} className={iconColor} />
        </div>
        {trend !== undefined && (
          <span className={`badge text-[11px] ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
            {isPositive ? '▲' : '▼'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-semibold text-slate-900 leading-tight">{value}</p>
        <p className="text-xs text-slate-400 mt-1">{label}</p>
        {sub && <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>}
        {trendLabel && <p className="text-[11px] text-slate-400 mt-0.5">{trendLabel}</p>}
      </div>
    </div>
  )
}
