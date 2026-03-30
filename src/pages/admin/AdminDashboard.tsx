import { Link } from 'react-router-dom'
import { FolderKanban, Wrench, Briefcase, User, MessageSquare, ArrowRight, Eye, MousePointerClick, RotateCw } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'

const CARDS = [
  { to: '/admin/profile', label: 'Profil', icon: <User size={24} /> },
  { to: '/admin/projects', label: 'Projets', icon: <FolderKanban size={24} /> },
  { to: '/admin/skills', label: 'Compétences', icon: <Wrench size={24} /> },
  { to: '/admin/experiences', label: 'Expériences', icon: <Briefcase size={24} /> },
  { to: '/admin/hero-roles', label: 'Roles Hero', icon: <RotateCw size={24} /> },
  { to: '/admin/messages', label: 'Messages', icon: <MessageSquare size={24} /> },
]

function since(days: number) {
  return new Date(Date.now() - days * 86400000).toISOString()
}

export default function AdminDashboard() {
  const { data: viewsData7 } = useSupabase<any[]>(() =>
    supabase.from('page_views').select('visitor_id').gte('created_at', since(7))
  )
  const { data: viewsData30 } = useSupabase<any[]>(() =>
    supabase.from('page_views').select('visitor_id').gte('created_at', since(30))
  )
  const { data: unreadData } = useSupabase<any[]>(() =>
    supabase.from('contact_messages').select('id').eq('read', false)
  )
  const { data: clicksData } = useSupabase<{ project_title: string }[]>(() =>
    supabase.from('project_clicks').select('project_title').gte('created_at', since(30))
  )

  const v7 = new Set(viewsData7?.map((r) => r.visitor_id).filter(Boolean)).size
  const v30 = new Set(viewsData30?.map((r) => r.visitor_id).filter(Boolean)).size
  const unread = unreadData?.length ?? 0

  // Aggregate clicks by project
  const clickMap: Record<string, number> = {}
  clicksData?.forEach((c) => {
    clickMap[c.project_title] = (clickMap[c.project_title] ?? 0) + 1
  })
  const topProjects = Object.entries(clickMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-base-content mb-1">Dashboard</h1>
      <p className="text-base-content/50 text-sm mb-8">Gérez le contenu de votre portfolio.</p>

      {/* Analytics strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="card bg-base-100">
          <div className="card-body py-4">
            <div className="flex items-center gap-2 text-base-content/50 text-xs mb-1"><Eye size={14} /> Visiteurs uniques (7j)</div>
            <p className="text-3xl font-bold text-base-content">{v7}</p>
          </div>
        </div>
        <div className="card bg-base-100">
          <div className="card-body py-4">
            <div className="flex items-center gap-2 text-base-content/50 text-xs mb-1"><Eye size={14} /> Visiteurs uniques (30j)</div>
            <p className="text-3xl font-bold text-base-content">{v30}</p>
          </div>
        </div>
        <div className="card bg-base-100">
          <div className="card-body py-4">
            <div className="flex items-center gap-2 text-base-content/50 text-xs mb-1"><MessageSquare size={14} /> Messages non lus</div>
            <p className="text-3xl font-bold text-primary">{unread}</p>
          </div>
        </div>
      </div>

      {/* Top clicked projects */}
      {topProjects.length > 0 && (
        <div className="card bg-base-100 mb-8">
          <div className="card-body">
            <h2 className="font-semibold text-base-content flex items-center gap-2 mb-3">
              <MousePointerClick size={16} /> Projets les plus cliqués (30 jours)
            </h2>
            <div className="space-y-2">
              {topProjects.map(([title, count]) => {
                const max = topProjects[0][1]
                return (
                  <div key={title} className="flex items-center gap-3">
                    <span className="text-sm text-base-content/70 w-40 truncate shrink-0">{title}</span>
                    <div className="flex-1 bg-base-200 h-2">
                      <div className="h-2 bg-primary transition-all" style={{ width: `${(count / max) * 100}%` }} />
                    </div>
                    <span className="text-sm font-mono text-base-content/60 w-6 text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Navigation cards */}
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
                {card.to === '/admin/messages' && unread > 0 && (
                  <span className="badge badge-primary badge-sm">{unread}</span>
                )}
                {!(card.to === '/admin/messages' && unread > 0) && (
                  <ArrowRight size={16} className="text-base-content/30" />
                )}
              </div>
              <p className="text-base-content/60 text-sm mt-2">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
