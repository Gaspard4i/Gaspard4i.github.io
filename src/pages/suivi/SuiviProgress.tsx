import { useMemo } from 'react'
import { CheckCircle2, Circle, XCircle, MinusCircle, Ban } from 'lucide-react'
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

export default function SuiviProgress() {
  const { data, loading } = useSupabase<ProgressRow[]>(() =>
    supabase.from('alternance_progress_public').select('*').order('domaine').order('entreprise')
  )

  const rows = useMemo(() => data ?? [], [data])
  const fait = rows.filter((r) => r.etat === 'Fait').length
  const refuse = rows.filter((r) => r.etat === 'Refusé').length
  const abandonne = rows.filter((r) => r.etat === 'Abandonné').length
  const pct = rows.length ? Math.round((fait / rows.length) * 100) : 0

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-3xl mx-auto p-4 sm:p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-base-content">Recherche d'alternance — avancement</h1>
          <p className="text-sm text-base-content/60">Suivi de Gaspard Catry · vue simplifiée (lecture seule).</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg" /></div>
        ) : rows.length === 0 ? (
          <p className="text-base-content/50 text-sm">Aucune candidature enregistrée pour le moment.</p>
        ) : (
          <>
            <div className="card bg-base-100 border border-base-300 mb-6">
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

            <div className="overflow-x-auto border border-base-300 rounded-box bg-base-100">
              <table className="table table-sm">
                <thead>
                  <tr><th>Entreprise</th><th>Poste</th><th>Domaine</th><th className="text-center">État</th></tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => {
                    const m = etatMeta(r.etat)
                    const Icon = m.icon
                    return (
                      <tr key={i} className="hover">
                        <td className="font-medium text-base-content">{r.entreprise}</td>
                        <td className="text-sm text-base-content/70 max-w-xs"><span className="line-clamp-2">{r.poste}</span></td>
                        <td className="text-xs text-base-content/50">{r.domaine}</td>
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
