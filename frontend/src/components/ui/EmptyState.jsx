import { Database } from 'lucide-react'

export default function EmptyState({ title = 'No data available', description = 'Load the sample dataset to get started.', action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
        <Database size={22} className="text-slate-400" />
      </div>
      <h3 className="text-sm font-semibold text-slate-700 mb-1">{title}</h3>
      <p className="text-sm text-slate-400 max-w-xs">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
