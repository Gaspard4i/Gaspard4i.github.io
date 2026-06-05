import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import type { Note } from '@/types/alternance'
import { Info, ExternalLink } from 'lucide-react'
import SkeletonBox from '@/components/atoms/SkeletonBox'

export default function SuiviInfos() {
  const { data: notes, loading, error } = useSupabase<Note[]>(() =>
    supabase.from('alternance_notes').select('*').order('ordre')
  )

  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-base-content mb-1 flex items-center gap-2">
        <Info size={22} className="text-primary" />
        Sources &amp; infos
      </h1>
      <p className="text-sm text-base-content/60 mb-6">
        Consignes et liens utiles issus du partage IMT (filière ITR). À garder sous la main avant chaque candidature.
      </p>

      {loading && (
        <div className="flex flex-col gap-3">
          <SkeletonBox className="h-20 w-full rounded-box" count={4} />
        </div>
      )}

      {error && (
        <div className="alert alert-error text-sm py-2">
          <span>Impossible de charger les infos : {error.message}</span>
        </div>
      )}

      {!loading && !error && notes && notes.length === 0 && (
        <div className="alert text-sm py-2 bg-base-200">
          <span>Aucune note pour l&apos;instant.</span>
        </div>
      )}

      {!loading && !error && notes && notes.length > 0 && (
        <div className="flex flex-col gap-3">
          {notes.map((n) => (
            <div key={n.id} className="card bg-base-100 border border-base-300 rounded-box">
              <div className="card-body p-4">
                <h2 className="font-semibold text-base-content text-sm">{n.titre}</h2>
                {n.contenu && (
                  <p className="text-sm text-base-content/70 leading-relaxed whitespace-pre-line">{n.contenu}</p>
                )}
                {n.lien && (
                  <a
                    href={n.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-primary text-sm inline-flex items-center gap-1 break-all w-fit"
                  >
                    <ExternalLink size={14} className="shrink-0" />
                    {n.lien}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
