import { useMemo } from 'react'
import { CheckCircle2, Circle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import type { ProgressRow } from '@/types/alternance'

export default function SuiviProgress() {
  const { data, loading } = useSupabase<ProgressRow[]>(() =>
    supabase.from('alternance_progress_public').select('*').order('domaine').order('entreprise')
  )

  const rows = useMemo(() => data ?? [], [data])
  const fait = rows.filter((r) => r.fait).length
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
              </div>
            </div>

            <div className="overflow-x-auto border border-base-300 rounded-box bg-base-100">
              <table className="table table-sm">
                <thead>
                  <tr><th>Entreprise</th><th>Poste</th><th>Domaine</th><th className="text-center">État</th></tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="hover">
                      <td className="font-medium text-base-content">{r.entreprise}</td>
                      <td className="text-sm text-base-content/70 max-w-xs"><span className="line-clamp-2">{r.poste}</span></td>
                      <td className="text-xs text-base-content/50">{r.domaine}</td>
                      <td className="text-center">
                        {r.fait ? (
                          <span className="inline-flex items-center gap-1 text-success text-sm"><CheckCircle2 size={15} /> Fait</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-base-content/40 text-sm"><Circle size={15} /> Pas encore</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
