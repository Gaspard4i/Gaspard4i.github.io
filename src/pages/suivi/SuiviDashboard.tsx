import { Link } from 'react-router-dom'
import { Briefcase, UserRound, Send, Bell, Star, CheckCircle2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import { relanceDates, isDue } from '@/lib/alternance'
import { DOMAINES } from '@/types/alternance'
import type { AlternanceItem } from '@/types/alternance'

function StatCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: number | string; accent?: string }) {
  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body p-4 flex-row items-center gap-3">
        <div className={`p-2 rounded-box ${accent ?? 'bg-primary/10 text-primary'}`}>{icon}</div>
        <div>
          <div className="text-2xl font-bold text-base-content leading-none">{value}</div>
          <div className="text-xs text-base-content/60 mt-1">{label}</div>
        </div>
      </div>
    </div>
  )
}

const ENVOI_STATUTS = ['Candidature envoyée', 'Envoyé', 'Relancé', 'Relance 1 faite', 'Relance 2 faite', 'Entretien', 'Réponse +', 'Réponse -', 'Accepté', 'Refusé']

export default function SuiviDashboard() {
  const { data: items, loading } = useSupabase<AlternanceItem[]>(() =>
    supabase.from('alternance_items').select('*')
  )

  if (loading) {
    return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg" /></div>
  }

  const all = items ?? []
  const offs = all.filter((i) => i.type === 'Offre')
  const libres = all.filter((i) => i.type === 'Candidature libre')
  const envoyees = all.filter((i) => ENVOI_STATUTS.includes(i.statut)).length
  const entretiens = all.filter((i) => i.statut === 'Entretien' || i.statut === 'Accepté').length
  const prio = all.filter((i) => i.priorite === 'Haute').length

  const relancesDues = libres.filter((p) => {
    const { r1, r2 } = relanceDates(p.date_action)
    if (['Clôturé', 'Réponse -', 'Réponse +', 'À envoyer'].includes(p.statut)) return false
    return (p.statut === 'Envoyé' && isDue(r1)) || (p.statut === 'Relance 1 faite' && isDue(r2))
  })

  const byDomaine = DOMAINES.map((d) => ({ d, n: offs.filter((o) => o.domaine === d).length })).filter((x) => x.n > 0)
  const maxDom = Math.max(1, ...byDomaine.map((x) => x.n))

  return (
    <div className="p-4 sm:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-base-content">Tableau de bord</h1>
        <p className="text-sm text-base-content/60">Vue d'ensemble de ta recherche d'alternance.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Briefcase size={20} />} label="Offres suivies" value={offs.length} />
        <StatCard icon={<UserRound size={20} />} label="Candidatures libres" value={libres.length} />
        <StatCard icon={<Send size={20} />} label="Candidatures envoyées" value={envoyees} accent="bg-info/10 text-info" />
        <StatCard icon={<CheckCircle2 size={20} />} label="Entretiens / acceptées" value={entretiens} accent="bg-success/10 text-success" />
        <StatCard icon={<Star size={20} />} label="Prioritaires" value={prio} accent="bg-warning/10 text-warning" />
        <StatCard icon={<Bell size={20} />} label="Relances à faire" value={relancesDues.length} accent="bg-error/10 text-error" />
      </div>

      <div className="card bg-base-100 border border-base-300">
        <div className="card-body p-4">
          <h2 className="font-semibold text-base-content flex items-center gap-2 mb-2">
            <Bell size={16} className="text-error" /> Relances à faire
          </h2>
          {relancesDues.length === 0 ? (
            <p className="text-sm text-base-content/50">Aucune relance en attente. Tout est à jour.</p>
          ) : (
            <ul className="divide-y divide-base-200">
              {relancesDues.map((p) => {
                const { r1, r2 } = relanceDates(p.date_action)
                const which = p.statut === 'Envoyé' ? 'Relance 1' : 'Relance 2'
                const when = p.statut === 'Envoyé' ? r1 : r2
                return (
                  <li key={p.id} className="py-2 flex items-center justify-between gap-3 text-sm">
                    <span className="text-base-content">
                      <span className="font-medium">{p.entreprise}</span>
                      {p.contact && <span className="text-base-content/60"> — {p.contact}</span>}
                    </span>
                    <span className="flex items-center gap-2 shrink-0">
                      <span className="badge badge-error badge-sm">{which}</span>
                      <span className="text-base-content/50 text-xs">échéance {when}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
          <Link to="/suivi-alternance/candidatures" className="link link-primary text-xs mt-2">
            Voir les candidatures →
          </Link>
        </div>
      </div>

      <div className="card bg-base-100 border border-base-300">
        <div className="card-body p-4">
          <h2 className="font-semibold text-base-content mb-3">Offres par domaine</h2>
          {byDomaine.length === 0 ? (
            <p className="text-sm text-base-content/50">
              Aucune offre. <Link to="/suivi-alternance/import" className="link link-primary">Importer des données →</Link>
            </p>
          ) : (
            <div className="space-y-2">
              {byDomaine.map(({ d, n }) => (
                <div key={d} className="flex items-center gap-3">
                  <span className="w-40 text-sm text-base-content/70 shrink-0">{d}</span>
                  <div className="flex-1 bg-base-200 rounded-full h-4 overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${(n / maxDom) * 100}%` }} />
                  </div>
                  <span className="w-8 text-right text-sm font-medium text-base-content">{n}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
