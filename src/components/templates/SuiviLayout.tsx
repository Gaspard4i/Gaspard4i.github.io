import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { LayoutDashboard, ListChecks, Mail, Upload, LogOut, Eye, Info } from 'lucide-react'
import ThemeSwitcher from '@/components/molecules/ThemeSwitcher'

const NAV = [
  { to: '/suivi-alternance', label: 'Tableau de bord', icon: <LayoutDashboard size={16} />, end: true },
  { to: '/suivi-alternance/candidatures', label: 'Candidatures', icon: <ListChecks size={16} /> },
  { to: '/suivi-alternance/emails', label: 'Emails', icon: <Mail size={16} /> },
  { to: '/suivi-alternance/infos', label: 'Sources & infos', icon: <Info size={16} /> },
  { to: '/suivi-alternance/import', label: 'Import / Export', icon: <Upload size={16} /> },
]

export default function SuiviLayout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/suivi-alternance/login')
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-60 bg-base-100 border-b md:border-b-0 md:border-r border-base-300 flex flex-col">
        <div className="p-4 border-b border-base-300 flex items-start justify-between gap-2">
          <div>
            <a href="/" className="font-mono font-bold text-primary text-sm">
              ← gaspard4i
            </a>
            <p className="text-xs text-base-content/50 mt-0.5">Suivi alternance</p>
          </div>
          <ThemeSwitcher />
        </div>
        <nav className="flex-1 p-2 flex flex-row md:flex-col gap-1 overflow-x-auto">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 text-sm rounded-field whitespace-nowrap transition-colors ${
                  isActive ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-200'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-2 border-t border-base-300 flex flex-col gap-1">
          <a
            href="/suivi-alternance/avancement"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-base-content hover:bg-base-200 rounded-field transition-colors"
          >
            <Eye size={16} />
            Vue partage (père)
          </a>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-base-200 rounded-field transition-colors"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
