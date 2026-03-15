import { Link } from 'react-router-dom'
import { FolderKanban, Wrench, Briefcase, ArrowRight } from 'lucide-react'

const CARDS = [
  { to: '/admin/projects', label: 'Projets', icon: <FolderKanban size={24} /> },
  { to: '/admin/skills', label: 'Compétences', icon: <Wrench size={24} /> },
  { to: '/admin/experiences', label: 'Expériences', icon: <Briefcase size={24} /> },
]

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-base-content mb-1">Dashboard</h1>
      <p className="text-base-content/50 text-sm mb-8">Gérez le contenu de votre portfolio.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CARDS.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="card bg-base-100 hover:shadow-lg transition-shadow"
          >
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div className="text-primary">{card.icon}</div>
                <ArrowRight size={16} className="text-base-content/30" />
              </div>
              <p className="text-base-content/60 text-sm mt-2">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
