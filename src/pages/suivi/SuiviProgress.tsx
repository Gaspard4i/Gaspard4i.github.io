import { useMemo, useState } from 'react'
import { CheckCircle2, Circle, XCircle, MinusCircle, Ban, Briefcase, UserRound } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import type { ProgressRow } from '@/types/alternance'

const ETAT_META: Record<string, { label: string; cls: string; icon: typeof Circle }> = {
  Fait: { label: 'Fait', cls: 'text-success', icon: CheckCircle2 },
  Refusé: { label: 'Refusé', cls: 'text-error', icon: XCircle },
  Abandonné: { label: 'Abandonné', cls: 'text-warning', icon: MinusCircle },
  'Plus disponible': { label: 'Plus disponible', cls: 'text-base-content/40', icon: Ban },
  'Pas encore': { label: 'Pas encore', cls: 'text-base-content/40', icon: Circle },
}

function etatMeta(etat: string) {
  return ETAT_META[etat] ?? ETAT_META['Pas encore']
}

type TypeFilter = 'all' | 'Offre' | 'Candidature libre'

export default function SuiviProgress() {
  const { data, loading } = useSupabase<ProgressRow[]>(() =>
    supabase.from('alternance_progress_public').select('*').order('entreprise')
  )
  const [fType, setFType] = useState<TypeFilter>('all')

  const all = useMemo(() => data ?? [], [data])
  const rows = useMemo(() => (fType === 'all' ? all : all.filter((r) => r.type === fType)), [all, fType])

  const fait = rows.filter((r) => r.etat === 'Fait').length
  const refuse = rows.filter((r) => r.etat === 'Refusé').length
  const abandonne = rows.filter((r) => r.etat === 'Abandonné').length
  const pct = rows.length ? Math.round((fait / rows.length) * 100) : 0

  const nbOffres = all.filter((r) => r.type === 'Offre').length
  const nbContacts = all.filter((r) => r.type === 'Candidature libre').length

  const TABS: { key: TypeFilter; label: string; count: number }[] = [
    { key: 'all', label: 'Tout', count: all.length },
    { key: 'Offre', label: 'Offres', count: nbOffres },
    { key: 'Candidature libre', label: 'Candidatures libres', count: nbContacts },
  ]

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-3xl mx-auto p-4 sm:p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-base-content">Recherche d'alternance — avancement</h1>
          <p className="text-sm text-base-content/60">Suivi de Gaspard Catry · vue simplifiée (lecture seule).</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg" /></div>
        ) : all.length === 0 ? (
          <p className="text-base-content/50 text-sm">Aucune candidature enregistrée pour le moment.</p>
        ) : (
          <>
            <div className="card bg-base-100 border border-base-300 mb-4">
              <div className="card-body p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-base-content/70">Candidatures faites</span>
                  <span className="font-bold text-base-content">{fait} / {rows.length}</span>
                </div>
                <progress className="progress progress-primary w-full" value={pct} max={100} />
                <div className="flex flex-wrap gap-3 mt-3 text-xs">
                  <span className="inline-flex items-center gap-1 text-success"><CheckCircle2 size={13} /> {fait} faites</span>
                  <span className="inline-flex items-center gap-1 text-error"><XCircle size={13} /> {refuse} refusées</span>
                  <span className="inline-flex items-center gap-1 text-warning"><MinusCircle size={13} /> {abandonne} abandonnées</span>
                </div>
              </div>
            </div>

            <div role="tablist" className="tabs tabs-boxed mb-4 w-fit">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  className={`tab ${fType === t.key ? 'tab-active' : ''}`}
                  onClick={() => setFType(t.key)}
                >
                  {t.label} <span className="ml-1 text-xs opacity-60">({t.count})</span>
                </button>
              ))}
            </div>

            <div className="overflow-x-auto border border-base-300 rounded-box bg-base-100">
              <table className="table table-sm">
                <thead>
                  <tr><th>Type</th><th>Entreprise</th><th>Poste / Secteur</th><th className="text-center">État</th></tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => {
                    const m = etatMeta(r.etat)
                    const Icon = m.icon
                    const isContact = r.type === 'Candidature libre'
                    return (
                      <tr key={i} className="hover">
                        <td>
                          <span className={`badge badge-sm ${isContact ? 'badge-accent' : 'badge-ghost'} gap-1`}>
                            {isContact ? <UserRound size={11} /> : <Briefcase size={11} />}
                            {isContact ? 'Contact' : 'Offre'}
                          </span>
                        </td>
                        <td className="font-medium text-base-content">{r.entreprise}</td>
                        <td className="text-sm text-base-content/70 max-w-xs">
                          <span className="line-clamp-2">{r.poste ?? r.domaine}</span>
                        </td>
                        <td className="text-center">
                          <span className={`inline-flex items-center gap-1 text-sm ${m.cls}`}><Icon size={15} /> {m.label}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
