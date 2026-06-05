import { useMemo, useState } from 'react'
import { Plus, Trash2, Pencil, ExternalLink, Search, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import { DOMAINES, OFFER_STATUTS, PRIORITES, ZONES } from '@/types/alternance'
import type { Offer } from '@/types/alternance'

const DOMAINE_BADGE: Record<string, string> = {
  'Développement': 'badge-primary',
  'Réseaux & Télécom': 'badge-success',
  'Data': 'badge-warning',
  'IA': 'badge-info',
  'Cybersécurité': 'badge-secondary',
  'Autre / à trier': 'badge-ghost',
}

const STATUT_BADGE: Record<string, string> = {
  'À postuler': 'badge-ghost',
  'Candidature envoyée': 'badge-info',
  'Relancé': 'badge-warning',
  'Entretien': 'badge-success',
  'Refusé': 'badge-error',
  'Accepté': 'badge-success',
  'Abandonné': 'badge-ghost',
}

const EMPTY: Partial<Offer> = { domaine: 'Autre / à trier', entreprise: '', poste: '', statut: 'À postuler' }

export default function SuiviOffers() {
  const { data: offers, loading, refetch } = useSupabase<Offer[]>(() =>
    supabase.from('alternance_offers').select('*').order('domaine').order('entreprise')
  )
  const [q, setQ] = useState('')
  const [fDom, setFDom] = useState('')
  const [fZone, setFZone] = useState('')
  const [fStatut, setFStatut] = useState('')
  const [editing, setEditing] = useState<Partial<Offer> | null>(null)
  const [saving, setSaving] = useState(false)

  const filtered = useMemo(() => {
    return (offers ?? []).filter((o) => {
      if (fDom && o.domaine !== fDom) return false
      if (fZone && o.zone_carte !== fZone) return false
      if (fStatut && o.statut !== fStatut) return false
      if (q) {
        const hay = `${o.entreprise} ${o.poste} ${o.localisation ?? ''} ${o.ref ?? ''}`.toLowerCase()
        if (!hay.includes(q.toLowerCase())) return false
      }
      return true
    })
  }, [offers, q, fDom, fZone, fStatut])

  async function updateStatut(o: Offer, statut: string) {
    await supabase.from('alternance_offers').update({ statut }).eq('id', o.id)
    refetch()
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette offre ?')) return
    await supabase.from('alternance_offers').delete().eq('id', id)
    refetch()
  }

  async function handleSave() {
    if (!editing?.entreprise || !editing?.poste) {
      alert('Entreprise et poste sont requis.')
      return
    }
    setSaving(true)
    const payload = { ...editing }
    delete (payload as Record<string, unknown>).created_at
    delete (payload as Record<string, unknown>).updated_at
    if (editing.id) {
      await supabase.from('alternance_offers').update(payload).eq('id', editing.id)
    } else {
      await supabase.from('alternance_offers').insert(payload)
    }
    setSaving(false)
    setEditing(null)
    refetch()
  }

  const resetFilters = () => { setQ(''); setFDom(''); setFZone(''); setFStatut('') }
  const hasFilters = q || fDom || fZone || fStatut

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Offres</h1>
          <p className="text-sm text-base-content/60">{filtered.length} affichée{filtered.length > 1 ? 's' : ''} sur {offers?.length ?? 0}</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setEditing({ ...EMPTY })}>
          <Plus size={16} /> Nouvelle offre
        </button>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-4">
        <label className="input input-bordered input-sm flex items-center gap-2 grow max-w-xs">
          <Search size={14} className="opacity-50" />
          <input type="text" className="grow" placeholder="Rechercher…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <select className="select select-bordered select-sm" value={fDom} onChange={(e) => setFDom(e.target.value)}>
          <option value="">Tous domaines</option>
          {DOMAINES.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select className="select select-bordered select-sm" value={fZone} onChange={(e) => setFZone(e.target.value)}>
          <option value="">Toutes zones</option>
          {ZONES.map((z) => <option key={z} value={z}>Zone : {z}</option>)}
        </select>
        <select className="select select-bordered select-sm" value={fStatut} onChange={(e) => setFStatut(e.target.value)}>
          <option value="">Tous statuts</option>
          {OFFER_STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {hasFilters && (
          <button className="btn btn-ghost btn-sm" onClick={resetFilters}><X size={14} /> Réinitialiser</button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><span className="loading loading-spinner loading-lg" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-base-content/50">
          <p>Aucune offre.</p>
          <p className="text-sm mt-1">Ajoute-en une, ou importe ton fichier dans l'onglet Import / Export.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-base-300 rounded-box">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Domaine</th>
                <th>Entreprise</th>
                <th>Poste</th>
                <th>Lieu</th>
                <th>Zone</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="hover">
                  <td><span className={`badge badge-sm ${DOMAINE_BADGE[o.domaine] ?? 'badge-ghost'}`}>{o.domaine}</span></td>
                  <td className="font-medium text-base-content">
                    {o.entreprise}
                    {o.priorite === 'Haute' && <span className="badge badge-warning badge-xs ml-1">Haute</span>}
                  </td>
                  <td className="max-w-xs"><span className="line-clamp-2">{o.poste}</span>{o.ref && <span className="block text-xs text-base-content/40">{o.ref}</span>}</td>
                  <td className="text-sm text-base-content/70">{o.localisation ?? '—'}</td>
                  <td>{o.zone_carte && <span className={`badge badge-xs ${o.zone_carte === 'OUI' ? 'badge-success' : o.zone_carte === 'NON' ? 'badge-ghost' : 'badge-warning'}`}>{o.zone_carte}</span>}</td>
                  <td>
                    <select
                      className={`select select-xs ${STATUT_BADGE[o.statut] ? '' : ''}`}
                      value={o.statut}
                      onChange={(e) => updateStatut(o, e.target.value)}
                    >
                      {OFFER_STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <div className="flex gap-0.5 justify-end">
                      {o.lien && o.lien.startsWith('http') && (
                        <a href={o.lien} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-xs" title="Ouvrir l'offre"><ExternalLink size={14} /></a>
                      )}
                      <button className="btn btn-ghost btn-xs" title="Éditer" onClick={() => setEditing(o)}><Pencil size={14} /></button>
                      <button className="btn btn-ghost btn-xs text-error" title="Supprimer" onClick={() => handleDelete(o.id)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modale édition */}
      {editing && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4 text-base-content">{editing.id ? 'Éditer l\'offre' : 'Nouvelle offre'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Entreprise *"><input className="input input-bordered input-sm w-full" value={editing.entreprise ?? ''} onChange={(e) => setEditing({ ...editing, entreprise: e.target.value })} /></Field>
              <Field label="Domaine"><select className="select select-bordered select-sm w-full" value={editing.domaine} onChange={(e) => setEditing({ ...editing, domaine: e.target.value })}>{DOMAINES.map((d) => <option key={d} value={d}>{d}</option>)}</select></Field>
              <Field label="Poste *" full><textarea className="textarea textarea-bordered textarea-sm w-full" rows={2} value={editing.poste ?? ''} onChange={(e) => setEditing({ ...editing, poste: e.target.value })} /></Field>
              <Field label="Localisation"><input className="input input-bordered input-sm w-full" value={editing.localisation ?? ''} onChange={(e) => setEditing({ ...editing, localisation: e.target.value })} /></Field>
              <Field label="Référence"><input className="input input-bordered input-sm w-full" value={editing.ref ?? ''} onChange={(e) => setEditing({ ...editing, ref: e.target.value })} /></Field>
              <Field label="Lien" full><input className="input input-bordered input-sm w-full" value={editing.lien ?? ''} onChange={(e) => setEditing({ ...editing, lien: e.target.value })} placeholder="https://…" /></Field>
              <Field label="Statut"><select className="select select-bordered select-sm w-full" value={editing.statut} onChange={(e) => setEditing({ ...editing, statut: e.target.value })}>{OFFER_STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}</select></Field>
              <Field label="Priorité"><select className="select select-bordered select-sm w-full" value={editing.priorite ?? ''} onChange={(e) => setEditing({ ...editing, priorite: e.target.value || null })}><option value="">—</option>{PRIORITES.map((p) => <option key={p} value={p}>{p}</option>)}</select></Field>
              <Field label="Zone carte"><select className="select select-bordered select-sm w-full" value={editing.zone_carte ?? ''} onChange={(e) => setEditing({ ...editing, zone_carte: e.target.value || null })}><option value="">—</option>{ZONES.map((z) => <option key={z} value={z}>{z}</option>)}</select></Field>
              <Field label="Source"><input className="input input-bordered input-sm w-full" value={editing.source ?? ''} onChange={(e) => setEditing({ ...editing, source: e.target.value })} /></Field>
              <Field label="Date candidature"><input type="date" className="input input-bordered input-sm w-full" value={editing.date_candidature ?? ''} onChange={(e) => setEditing({ ...editing, date_candidature: e.target.value || null })} /></Field>
              <Field label="Contact"><input className="input input-bordered input-sm w-full" value={editing.contact ?? ''} onChange={(e) => setEditing({ ...editing, contact: e.target.value })} /></Field>
              <Field label="Notes" full><textarea className="textarea textarea-bordered textarea-sm w-full" rows={2} value={editing.notes ?? ''} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} /></Field>
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

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={`form-control ${full ? 'sm:col-span-2' : ''}`}>
      <label className="label py-1"><span className="label-text text-xs">{label}</span></label>
      {children}
    </div>
  )
}
