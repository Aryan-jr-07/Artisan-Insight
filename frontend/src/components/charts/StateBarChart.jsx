import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

const COLORS = { default: '#6366f1', top: '#10b981', bottom: '#f43f5e' }

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-card-md px-4 py-3 text-left">
      <p className="text-xs font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="text-xs text-slate-500">
          {p.name === 'total' ? 'Total' : p.name === 'average' ? 'Avg/yr' : p.name}:{' '}
          <span className="font-semibold text-slate-800">{p.value?.toLocaleString('en-IN')}</span>
        </p>
      ))}
    </div>
  )
}

export default function StateBarChart({ data = [], highlightTop = 5, highlightBottom = 5, dataKey = 'total' }) {
  const sorted = [...data].sort((a, b) => b[dataKey] - a[dataKey])
  const topStates = sorted.slice(0, highlightTop).map(d => d.state)
  const bottomStates = sorted.slice(-highlightBottom).map(d => d.state)

  const getColor = (state) => {
    if (topStates.includes(state)) return COLORS.top
    if (bottomStates.includes(state)) return COLORS.bottom
    return COLORS.default
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={sorted} margin={{ top: 4, right: 12, left: 0, bottom: 60 }} barSize={18}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          dataKey="state"
          tick={{ fontSize: 10, fill: '#94a3b8' }}
          angle={-40}
          textAnchor="end"
          interval={0}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          tickLine={false}
          axisLine={false}
          width={42}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
        <Bar dataKey={dataKey} radius={[4, 4, 0, 0]}>
          {sorted.map((entry, i) => (
            <Cell key={i} fill={getColor(entry.state)} fillOpacity={0.9} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
