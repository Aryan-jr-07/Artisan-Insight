import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Upload, BarChart3, Lightbulb, Map, Sparkles
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/upload', icon: Upload, label: 'Upload Data' },
  { to: '/asi', icon: BarChart3, label: 'ASI Rankings' },
  { to: '/insights', icon: Lightbulb, label: 'Insights' },
  { to: '/states', icon: Map, label: 'State Analysis' },
]

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-60 bg-white border-r border-slate-100 flex flex-col z-30">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 leading-tight">Artisan Insight</p>
            <p className="text-[10px] text-slate-400 leading-tight mt-0.5">Welfare Analytics</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="section-label px-2 mb-3">Navigation</p>
        <ul className="space-y-0.5">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={16}
                      className={`flex-shrink-0 transition-colors ${
                        isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span>{label}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-slate-100">
        <p className="text-[10px] text-slate-400 leading-relaxed">
          Data source: data.gov.in
          <br />
          PM Vishwakarma Scheme
        </p>
      </div>
    </aside>
  )
}
