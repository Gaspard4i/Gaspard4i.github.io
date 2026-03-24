import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { LayoutDashboard, FolderKanban, Wrench, Briefcase, User, MessageSquare, LogOut, Heart } from 'lucide-react'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={16} />, end: true },
  { to: '/admin/profile', label: 'Profil', icon: <User size={16} /> },
  { to: '/admin/projects', label: 'Projets', icon: <FolderKanban size={16} /> },
  { to: '/admin/skills', label: 'Compétences', icon: <Wrench size={16} /> },
  { to: '/admin/soft-skills', label: 'Soft Skills', icon: <Heart size={16} /> },
  { to: '/admin/experiences', label: 'Expériences', icon: <Briefcase size={16} /> },
  { to: '/admin/messages', label: 'Messages', icon: <MessageSquare size={16} /> },
]

export default function AdminLayout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-base-200 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-base-100 border-r border-base-300 flex flex-col">
        <div className="p-4 border-b border-base-300">
          <a href="/" className="font-mono font-bold text-primary text-sm">
            ← gaspard4i
          </a>
          <p className="text-xs text-base-content/50 mt-0.5">Admin</p>
        </div>
        <nav className="flex-1 p-2 flex flex-col gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-content'
                    : 'text-base-content hover:bg-base-200'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-2 border-t border-base-300">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-base-200 transition-colors"
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
