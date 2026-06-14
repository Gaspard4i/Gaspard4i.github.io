import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2, Pencil, ExternalLink, Search, X, Mail, Linkedin, Briefcase, UserRound } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import { useSortable } from '@/hooks/useSortable'
import SortableTh from '@/components/atoms/SortableTh'
import { DOMAINES, ITEM_STATUTS, ITEM_TYPES, PRIORITES, ZONES, SOURCE_CATS } from '@/types/alternance'
import type { AlternanceItem } from '@/types/alternance'

const STATUT_BADGE: Record<string, string> = {
  'À postuler': 'badge-ghost',
  'À envoyer': 'badge-ghost',
  'Candidature envoyée': 'badge-info',
  'Envoyé': 'badge-info',
  'Relancé': 'badge-warning',
  'Relance 1 faite': 'badge-warning',
  'Relance 2 faite': 'badge-warning',
  'Entretien': 'badge-success',
  'Réponse +': 'badge-success',
  'Réponse -': 'badge-error',
  'Refusé': 'badge-error',
  'Accepté': 'badge-success',
  'Abandonné': 'badge-ghost',
  'Clôturé': 'badge-ghost',
  'Plus disponible': 'badge-neutral',
}

const EMPTY: Partial<AlternanceItem> = { type: 'Offre', domaine: 'Autre / à trier', statut: 'À postuler', source_cat: 'Autre' }

export default function SuiviItems() {
  const { data: items, loading, refetch } = useSupabase<AlternanceItem[]>(() =>
    supabase.from('alternance_items').select('*').order('entreprise')
  )
  const [q, setQ] = useState('')
  const [fType, setFType] = useState('')
  const [fDom, setFDom] = useState('')
  const [fStatut, setFStatut] = useState('')
  const [editing, setEditing] = useState<Partial<AlternanceItem> | null>(null)
  const [saving, setSaving] = useState(false)

  const filtered = useMemo(() => {
    return (items ?? []).filter((it) => {
      if (fType && it.type !== fType) return false
      if (fDom && it.domaine !== fDom) return false
      if (fStatut && it.statut !== fStatut) return false
      if (q) {
        const hay = `${it.entreprise} ${it.poste ?? ''} ${it.contact ?? ''} ${it.email ?? ''} ${it.localisation ?? ''} ${it.secteur ?? ''}`.toLowerCase()
        if (!hay.includes(q.toLowerCase())) return false
      }
      return true
    })
  }, [items, q, fType, fDom, fStatut])

  const { sorted, sortKey, sortDir, toggleSort } = useSortable<AlternanceItem>(filtered)

  async function updateField(it: AlternanceItem, patch: Partial<AlternanceItem>) {
    await supabase.from('alternance_items').update(patch).eq('id', it.id)
    refetch()
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cet élément ?')) return
    await supabase.from('alternance_items').delete().eq('id', id)
    refetch()
  }

  async function handleSave() {
    if (!editing?.entreprise) {
      alert('L\'entreprise est requise.')
      return
    }
    setSaving(true)
    const payload = { ...editing }
    delete (payload as Record<string, unknown>).created_at
    delete (payload as Record<string, unknown>).updated_at
    if (editing.id) await supabase.from('alternance_items').update(payload).eq('id', editing.id)
    else await supabase.from('alternance_items').insert(payload)
    setSaving(false)
    setEditing(null)
    refetch()
  }

  const resetFilters = () => { setQ(''); setFType(''); setFDom(''); setFStatut('') }
  const hasFilters = q || fType || fDom || fStatut

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Suivi des candidatures</h1>
          <p className="text-sm text-base-content/60">{filtered.length} affiché{filtered.length > 1 ? 's' : ''} sur {items?.length ?? 0} (offres + candidatures libres)</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setEditing({ ...EMPTY })}>
          <Plus size={16} /> Nouveau
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <label className="input input-bordered input-sm flex items-center gap-2 grow max-w-xs">
          <Search size={14} className="opacity-50" />
          <input type="text" className="grow" placeholder="Rechercher…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <select className="select select-bordered select-sm" value={fType} onChange={(e) => setFType(e.target.value)}>
          <option value="">Tous types</option>
          {ITEM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="select select-bordered select-sm" value={fDom} onChange={(e) => setFDom(e.target.value)}>
          <option value="">Tous domaines</option>
          {DOMAINES.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select className="select select-bordered select-sm" value={fStatut} onChange={(e) => setFStatut(e.target.value)}>
          <option value="">Tous statuts</option>
          {ITEM_STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {hasFilters && <button className="btn btn-ghost btn-sm" onClick={resetFilters}><X size={14} /> Réinitialiser</button>}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><span className="loading loading-spinner loading-lg" /></div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-12 text-base-content/50">
          <p>Aucun élément.</p>
          <p className="text-sm mt-1">Ajoute-en un, ou importe un fichier dans l'onglet Import / Export.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-base-300 rounded-box">
          <table className="table table-sm">
            <thead>
              <tr>
                <SortableTh label="Type" column="type" activeColumn={sortKey as string | null} direction={sortDir} onSort={(c) => toggleSort(c as keyof AlternanceItem)} />
                <SortableTh label="Entreprise" column="entreprise" activeColumn={sortKey as string | null} direction={sortDir} onSort={(c) => toggleSort(c as keyof AlternanceItem)} />
                <SortableTh label="Poste / Contact" column="poste" activeColumn={sortKey as string | null} direction={sortDir} onSort={(c) => toggleSort(c as keyof AlternanceItem)} />
                <SortableTh label="Email" column="email" activeColumn={sortKey as string | null} direction={sortDir} onSort={(c) => toggleSort(c as keyof AlternanceItem)} />
                <SortableTh label="Domaine" column="domaine" activeColumn={sortKey as string | null} direction={sortDir} onSort={(c) => toggleSort(c as keyof AlternanceItem)} />
                <SortableTh label="Statut" column="statut" activeColumn={sortKey as string | null} direction={sortDir} onSort={(c) => toggleSort(c as keyof AlternanceItem)} />
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((it) => {
                const isContact = it.type === 'Candidature libre'
                return (
                  <tr key={it.id} className="hover">
                    <td>
                      <span className={`badge badge-sm gap-1 ${isContact ? 'badge-accent' : 'badge-ghost'}`}>
                        {isContact ? <UserRound size={11} /> : <Briefcase size={11} />}
                        {isContact ? 'Libre' : 'Offre'}
                      </span>
                    </td>
                    <td className="font-medium text-base-content">
                      {it.entreprise}
                      {it.priorite === 'Haute' && <span className="badge badge-warning badge-xs ml-1">Haute</span>}
                    </td>
                    <td className="max-w-xs">
                      <span className="line-clamp-2">{it.poste ?? it.contact ?? '—'}</span>
                      {it.ref && <span className="block text-xs text-base-content/40">{it.ref}</span>}
                    </td>
                    <td className="text-xs">
                      {it.email ? (
                        <a href={`mailto:${it.email}`} className="link link-primary break-all">{it.email}</a>
                      ) : (
                        <span className="text-base-content/30">—</span>
                      )}
                    </td>
                    <td className="text-xs text-base-content/60">{it.domaine}</td>
                    <td>
                      <select
                        className={`select select-xs badge ${STATUT_BADGE[it.statut] ?? ''} border-0`}
                        value={it.statut}
                        onChange={(e) => updateField(it, { statut: e.target.value })}
                      >
                        {ITEM_STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <div className="flex gap-0.5 justify-end">
                        {it.email && (
                          <Link to={`/suivi-alternance/emails?item=${it.id}`} className="btn btn-ghost btn-xs" title="Écrire un email"><Mail size={14} /></Link>
                        )}
                        {it.lien && it.lien.startsWith('http') && (
                          <a href={it.lien} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-xs" title="Ouvrir l'offre"><ExternalLink size={14} /></a>
                        )}
                        {it.linkedin && (
                          <a href={it.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-xs" title="LinkedIn"><Linkedin size={14} /></a>
                        )}
                        <button className="btn btn-ghost btn-xs" title="Éditer" onClick={() => setEditing(it)}><Pencil size={14} /></button>
                        <button className="btn btn-ghost btn-xs text-error" title="Supprimer" onClick={() => handleDelete(it.id)}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4 text-base-content">{editing.id ? 'Éditer' : 'Nouveau'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <F label="Type"><select className="select select-bordered select-sm w-full" value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })}>{ITEM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</select></F>
              <F label="Domaine"><select className="select select-bordered select-sm w-full" value={editing.domaine} onChange={(e) => setEditing({ ...editing, domaine: e.target.value })}>{DOMAINES.map((d) => <option key={d} value={d}>{d}</option>)}</select></F>
              <F label="Entreprise *"><input className="input input-bordered input-sm w-full" value={editing.entreprise ?? ''} onChange={(e) => setEditing({ ...editing, entreprise: e.target.value })} /></F>
              <F label="Poste / Intitulé"><input className="input input-bordered input-sm w-full" value={editing.poste ?? ''} onChange={(e) => setEditing({ ...editing, poste: e.target.value || null })} /></F>
              <F label="Contact (personne)"><input className="input input-bordered input-sm w-full" value={editing.contact ?? ''} onChange={(e) => setEditing({ ...editing, contact: e.target.value || null })} /></F>
              <F label="Email"><input className="input input-bordered input-sm w-full" value={editing.email ?? ''} onChange={(e) => setEditing({ ...editing, email: e.target.value || null })} /></F>
              <F label="Téléphone"><input className="input input-bordered input-sm w-full" value={editing.tel ?? ''} onChange={(e) => setEditing({ ...editing, tel: e.target.value || null })} /></F>
              <F label="Localisation"><input className="input input-bordered input-sm w-full" value={editing.localisation ?? ''} onChange={(e) => setEditing({ ...editing, localisation: e.target.value || null })} /></F>
              <F label="LinkedIn (URL)"><input className="input input-bordered input-sm w-full" value={editing.linkedin ?? ''} onChange={(e) => setEditing({ ...editing, linkedin: e.target.value || null })} /></F>
              <F label="Lien offre (URL)"><input className="input input-bordered input-sm w-full" value={editing.lien ?? ''} onChange={(e) => setEditing({ ...editing, lien: e.target.value || null })} placeholder="https://…" /></F>
              <F label="Statut"><select className="select select-bordered select-sm w-full" value={editing.statut} onChange={(e) => setEditing({ ...editing, statut: e.target.value })}>{ITEM_STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}</select></F>
              <F label="Priorité"><select className="select select-bordered select-sm w-full" value={editing.priorite ?? ''} onChange={(e) => setEditing({ ...editing, priorite: e.target.value || null })}><option value="">—</option>{PRIORITES.map((p) => <option key={p} value={p}>{p}</option>)}</select></F>
              <F label="Source"><select className="select select-bordered select-sm w-full" value={editing.source_cat ?? 'Autre'} onChange={(e) => setEditing({ ...editing, source_cat: e.target.value })}>{SOURCE_CATS.map((s) => <option key={s} value={s}>{s}</option>)}</select></F>
              <F label="Zone carte"><select className="select select-bordered select-sm w-full" value={editing.zone_carte ?? ''} onChange={(e) => setEditing({ ...editing, zone_carte: e.target.value || null })}><option value="">—</option>{ZONES.map((z) => <option key={z} value={z}>{z}</option>)}</select></F>
              <F label="Date action"><input type="date" className="input input-bordered input-sm w-full" value={editing.date_action ?? ''} onChange={(e) => setEditing({ ...editing, date_action: e.target.value || null })} /></F>
              <F label="Notes" full><textarea className="textarea textarea-bordered textarea-sm w-full" rows={2} value={editing.notes ?? ''} onChange={(e) => setEditing({ ...editing, notes: e.target.value || null })} /></F>
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
