import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2, Pencil, Search, X, Mail, Linkedin, Star, Bell } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import { useSortable } from '@/hooks/useSortable'
import SortableTh from '@/components/atoms/SortableTh'
import { PROSPECT_STATUTS, SOURCE_CATS } from '@/types/alternance'
import type { Prospect } from '@/types/alternance'
import { relanceDates, isDue, formatDateFr } from '@/lib/alternance'

const EMPTY: Partial<Prospect> = { prio: false, statut: 'À envoyer', source_cat: 'Autre' }

const SOURCE_BADGE: Record<string, string> = {
  Nicolas: 'badge-info',
  IMT: 'badge-secondary',
  Claude: 'badge-accent',
  Autre: 'badge-ghost',
}

export default function SuiviProspects() {
  const { data: prospects, loading, refetch } = useSupabase<Prospect[]>(() =>
    supabase.from('alternance_prospects').select('*').order('prio', { ascending: false }).order('entreprise')
  )
  const [q, setQ] = useState('')
  const [prioOnly, setPrioOnly] = useState(false)
  const [fStatut, setFStatut] = useState('')
  const [fSource, setFSource] = useState('')
  const [editing, setEditing] = useState<Partial<Prospect> | null>(null)
  const [saving, setSaving] = useState(false)

  const filtered = useMemo(() => {
    return (prospects ?? []).filter((p) => {
      if (prioOnly && !p.prio) return false
      if (fStatut && p.statut !== fStatut) return false
      if (fSource && p.source_cat !== fSource) return false
      if (q) {
        const hay = `${p.entreprise ?? ''} ${p.nom ?? ''} ${p.prenom ?? ''} ${p.secteur ?? ''} ${p.ville ?? ''} ${p.email ?? ''}`.toLowerCase()
        if (!hay.includes(q.toLowerCase())) return false
      }
      return true
    })
  }, [prospects, q, prioOnly, fStatut, fSource])

  const { sorted, sortKey, sortDir, toggleSort } = useSortable<Prospect>(filtered)

  async function updateField(p: Prospect, patch: Partial<Prospect>) {
    await supabase.from('alternance_prospects').update(patch).eq('id', p.id)
    refetch()
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce contact ?')) return
    await supabase.from('alternance_prospects').delete().eq('id', id)
    refetch()
  }

  async function handleSave() {
    setSaving(true)
    const payload = { ...editing }
    delete (payload as Record<string, unknown>).created_at
    delete (payload as Record<string, unknown>).updated_at
    if (editing?.id) await supabase.from('alternance_prospects').update(payload).eq('id', editing.id)
    else await supabase.from('alternance_prospects').insert(payload)
    setSaving(false)
    setEditing(null)
    refetch()
  }

  const resetFilters = () => { setQ(''); setPrioOnly(false); setFStatut(''); setFSource('') }
  const hasFilters = q || prioOnly || fStatut || fSource

  function relanceCell(p: Prospect) {
    const { r1, r2 } = relanceDates(p.date_envoi)
    if (!p.date_envoi) return <span className="text-base-content/30 text-xs">—</span>
    const r1Due = p.statut === 'Envoyé' && isDue(r1)
    const r2Due = p.statut === 'Relance 1 faite' && isDue(r2)
    return (
      <div className="text-xs space-y-0.5">
        <div className={r1Due ? 'text-error font-semibold flex items-center gap-1' : 'text-base-content/60'}>
          {r1Due && <Bell size={11} />} R1 : {formatDateFr(r1)}
        </div>
        <div className={r2Due ? 'text-error font-semibold flex items-center gap-1' : 'text-base-content/60'}>
          {r2Due && <Bell size={11} />} R2 : {formatDateFr(r2)}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Prospection DRH</h1>
          <p className="text-sm text-base-content/60">{filtered.length} contact{filtered.length > 1 ? 's' : ''} · relances calculées à J+7 / J+20</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setEditing({ ...EMPTY })}>
          <Plus size={16} /> Nouveau contact
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <label className="input input-bordered input-sm flex items-center gap-2 grow max-w-xs">
          <Search size={14} className="opacity-50" />
          <input type="text" className="grow" placeholder="Rechercher…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <select className="select select-bordered select-sm" value={fStatut} onChange={(e) => setFStatut(e.target.value)}>
          <option value="">Tous statuts</option>
          {PROSPECT_STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="select select-bordered select-sm" value={fSource} onChange={(e) => setFSource(e.target.value)}>
          <option value="">Toutes sources</option>
          {SOURCE_CATS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <label className="label cursor-pointer gap-2">
          <input type="checkbox" className="checkbox checkbox-sm checkbox-warning" checked={prioOnly} onChange={(e) => setPrioOnly(e.target.checked)} />
          <span className="label-text text-sm flex items-center gap-1"><Star size={13} /> Prioritaires</span>
        </label>
        {hasFilters && <button className="btn btn-ghost btn-sm" onClick={resetFilters}><X size={14} /> Réinitialiser</button>}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><span className="loading loading-spinner loading-lg" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-base-content/50">
          <p>Aucun contact.</p>
          <p className="text-sm mt-1">Importe ta liste DRH dans l'onglet Import / Export.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-base-300 rounded-box">
          <table className="table table-sm">
            <thead>
              <tr>
                <SortableTh label="" column="prio" activeColumn={sortKey as string | null} direction={sortDir} onSort={(c) => toggleSort(c as keyof Prospect)} />
                <SortableTh label="Contact" column="nom" activeColumn={sortKey as string | null} direction={sortDir} onSort={(c) => toggleSort(c as keyof Prospect)} />
                <SortableTh label="Entreprise" column="entreprise" activeColumn={sortKey as string | null} direction={sortDir} onSort={(c) => toggleSort(c as keyof Prospect)} />
                <SortableTh label="Email" column="email" activeColumn={sortKey as string | null} direction={sortDir} onSort={(c) => toggleSort(c as keyof Prospect)} />
                <SortableTh label="Ville" column="ville" activeColumn={sortKey as string | null} direction={sortDir} onSort={(c) => toggleSort(c as keyof Prospect)} />
                <SortableTh label="Date envoi" column="date_envoi" activeColumn={sortKey as string | null} direction={sortDir} onSort={(c) => toggleSort(c as keyof Prospect)} />
                <th>Relances</th>
                <SortableTh label="Statut" column="statut" activeColumn={sortKey as string | null} direction={sortDir} onSort={(c) => toggleSort(c as keyof Prospect)} />
                <SortableTh label="Source" column="source_cat" activeColumn={sortKey as string | null} direction={sortDir} onSort={(c) => toggleSort(c as keyof Prospect)} />
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr key={p.id} className={p.prio ? 'bg-success/10 hover:bg-success/20' : 'hover'}>
                  <td>{p.prio && <Star size={14} className="text-warning fill-warning" />}</td>
                  <td>
                    <div className="font-medium text-base-content">{p.civilite} {p.prenom} {p.nom}</div>
                    <div className="text-xs text-base-content/50">{p.poste}</div>
                  </td>
                  <td className="text-sm text-base-content/80">{p.entreprise}<div className="text-xs text-base-content/40">{p.secteur}</div></td>
                  <td className="text-xs">
                    {p.email ? (
                      <a href={`mailto:${p.email}`} className="link link-primary break-all">{p.email}</a>
                    ) : (
                      <span className="text-base-content/30">—</span>
                    )}
                  </td>
                  <td className="text-xs text-base-content/60">{p.ville}</td>
                  <td>
                    <input
                      type="date"
                      className="input input-bordered input-xs w-32"
                      value={p.date_envoi ?? ''}
                      onChange={(e) => updateField(p, { date_envoi: e.target.value || null })}
                    />
                  </td>
                  <td>{relanceCell(p)}</td>
                  <td>
                    <select className="select select-xs" value={p.statut} onChange={(e) => updateField(p, { statut: e.target.value })}>
                      {PROSPECT_STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <span className={`badge badge-sm ${SOURCE_BADGE[p.source_cat] ?? 'badge-ghost'} mb-1`}>{p.source_cat}</span>
                    <select
                      className="select select-xs w-full"
                      value={p.source_cat}
                      onChange={(e) => updateField(p, { source_cat: e.target.value })}
                    >
                      {SOURCE_CATS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <div className="flex gap-0.5 justify-end">
                      <Link to={`/suivi-alternance/emails?prospect=${p.id}`} className="btn btn-ghost btn-xs" title="Écrire un email"><Mail size={14} /></Link>
                      {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-xs" title="LinkedIn"><Linkedin size={14} /></a>}
                      <button className="btn btn-ghost btn-xs" title="Éditer" onClick={() => setEditing(p)}><Pencil size={14} /></button>
                      <button className="btn btn-ghost btn-xs text-error" title="Supprimer" onClick={() => handleDelete(p.id)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4 text-base-content">{editing.id ? 'Éditer le contact' : 'Nouveau contact'}</h3>
            <label className="label cursor-pointer justify-start gap-2 mb-2">
              <input type="checkbox" className="checkbox checkbox-warning checkbox-sm" checked={editing.prio ?? false} onChange={(e) => setEditing({ ...editing, prio: e.target.checked })} />
              <span className="label-text flex items-center gap-1"><Star size={14} /> Contact prioritaire (vert)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <F label="Civilité"><input className="input input-bordered input-sm w-full" value={editing.civilite ?? ''} onChange={(e) => setEditing({ ...editing, civilite: e.target.value })} /></F>
              <F label="Entreprise"><input className="input input-bordered input-sm w-full" value={editing.entreprise ?? ''} onChange={(e) => setEditing({ ...editing, entreprise: e.target.value })} /></F>
              <F label="Nom"><input className="input input-bordered input-sm w-full" value={editing.nom ?? ''} onChange={(e) => setEditing({ ...editing, nom: e.target.value })} /></F>
              <F label="Prénom"><input className="input input-bordered input-sm w-full" value={editing.prenom ?? ''} onChange={(e) => setEditing({ ...editing, prenom: e.target.value })} /></F>
              <F label="Poste" full><input className="input input-bordered input-sm w-full" value={editing.poste ?? ''} onChange={(e) => setEditing({ ...editing, poste: e.target.value })} /></F>
              <F label="Email"><input className="input input-bordered input-sm w-full" value={editing.email ?? ''} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></F>
              <F label="Téléphone"><input className="input input-bordered input-sm w-full" value={editing.tel ?? ''} onChange={(e) => setEditing({ ...editing, tel: e.target.value })} /></F>
              <F label="Ville"><input className="input input-bordered input-sm w-full" value={editing.ville ?? ''} onChange={(e) => setEditing({ ...editing, ville: e.target.value })} /></F>
              <F label="Secteur"><input className="input input-bordered input-sm w-full" value={editing.secteur ?? ''} onChange={(e) => setEditing({ ...editing, secteur: e.target.value })} /></F>
              <F label="LinkedIn (URL)" full><input className="input input-bordered input-sm w-full" value={editing.linkedin ?? ''} onChange={(e) => setEditing({ ...editing, linkedin: e.target.value })} /></F>
              <F label="Date d'envoi"><input type="date" className="input input-bordered input-sm w-full" value={editing.date_envoi ?? ''} onChange={(e) => setEditing({ ...editing, date_envoi: e.target.value || null })} /></F>
              <F label="Statut"><select className="select select-bordered select-sm w-full" value={editing.statut} onChange={(e) => setEditing({ ...editing, statut: e.target.value })}>{PROSPECT_STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}</select></F>
              <F label="Source"><select className="select select-bordered select-sm w-full" value={editing.source_cat ?? 'Autre'} onChange={(e) => setEditing({ ...editing, source_cat: e.target.value })}>{SOURCE_CATS.map((s) => <option key={s} value={s}>{s}</option>)}</select></F>
              <F label="Notes" full><textarea className="textarea textarea-bordered textarea-sm w-full" rows={2} value={editing.notes ?? ''} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} /></F>
            </div>
            <div className="modal-action">
              <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)} disabled={saving}>Annuler</button>
              <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>{saving && <span className="loading loading-spinner loading-xs" />}Enregistrer</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setEditing(null)} />
        </div>
      )}
    </div>
  )
}

function F({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={`form-control ${full ? 'sm:col-span-2' : ''}`}>
      <label className="label py-1"><span className="label-text text-xs">{label}</span></label>
      {children}
    </div>
  )
}
