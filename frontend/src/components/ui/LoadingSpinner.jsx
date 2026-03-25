export default function LoadingSpinner({ size = 'md', text = '' }) {
  const sizeMap = { sm: 'w-4 h-4', md: 'w-7 h-7', lg: 'w-10 h-10' }
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className={`${sizeMap[size]} border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin`} />
      {text && <p className="text-sm text-slate-400">{text}</p>}
    </div>
  )
}
