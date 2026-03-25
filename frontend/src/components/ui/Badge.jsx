const variants = {
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  danger:  'bg-red-50 text-red-600 border border-red-100',
  warning: 'bg-amber-50 text-amber-700 border border-amber-100',
  info:    'bg-brand-50 text-brand-700 border border-brand-100',
  neutral: 'bg-slate-100 text-slate-600 border border-slate-200',
}

export default function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
