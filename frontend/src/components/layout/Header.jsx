import { useLocation } from 'react-router-dom'
import { Bell, HelpCircle } from 'lucide-react'

const pageTitles = {
  '/dashboard': { title: 'Dashboard', subtitle: 'State-wise artisan welfare overview' },
  '/upload': { title: 'Upload Data', subtitle: 'Import CSV or Excel datasets' },
  '/asi': { title: 'ASI Rankings', subtitle: 'Artisan Support Index by state' },
  '/insights': { title: 'Insights & Recommendations', subtitle: 'AI-powered policy analysis' },
  '/states': { title: 'State Analysis', subtitle: 'Drill down into individual state data' },
}

export default function Header() {
  const { pathname } = useLocation()
  const page = pageTitles[pathname] || { title: 'Artisan Insight', subtitle: '' }

  return (
    <header className="fixed top-0 left-60 right-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-20">
      <div>
        <h1 className="text-base font-semibold text-slate-900">{page.title}</h1>
        {page.subtitle && (
          <p className="text-xs text-slate-400 mt-0.5">{page.subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-1">
        <button className="btn-ghost p-2">
          <HelpCircle size={17} className="text-slate-400" />
        </button>
        <button className="btn-ghost p-2">
          <Bell size={17} className="text-slate-400" />
        </button>
        <div className="ml-2 w-8 h-8 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-semibold">
          AI
        </div>
      </div>
    </header>
  )
}
