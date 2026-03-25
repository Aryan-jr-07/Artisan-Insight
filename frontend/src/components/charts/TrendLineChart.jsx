import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-card-md px-4 py-3 text-left min-w-[160px]">
      <p className="text-xs font-semibold text-slate-700 mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-slate-500">{p.name}</span>
          </span>
          <span className="font-semibold text-slate-800">{p.value?.toLocaleString('en-IN')}</span>
        </div>
      ))}
    </div>
  )
}

export default function TrendLineChart({ data = [], lines = [], showLegend = false, height = 280 }) {
  const defaultLines = lines.length > 0 ? lines : [
    { key: 'beneficiaries', name: 'Beneficiaries', color: '#6366f1' },
  ]

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: '#94a3b8' }}
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
        <Tooltip content={<CustomTooltip />} />
        {showLegend && <Legend iconType="circle" iconSize={8} wrapperStyle={{ paddingTop: 12 }} />}
        <ReferenceLine x="2020" stroke="#fca5a5" strokeDasharray="4 3" label={{ value: 'COVID-19', position: 'top', fontSize: 9, fill: '#94a3b8' }} />
        {defaultLines.map(line => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            name={line.name || line.key}
            stroke={line.color || '#6366f1'}
            strokeWidth={2}
            dot={{ r: 3.5, fill: line.color || '#6366f1', strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
