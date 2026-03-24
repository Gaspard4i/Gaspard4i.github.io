import { useState } from 'react'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import type { Experience, ExperienceType } from '@/types/experience'

const TYPES: { key: ExperienceType; label: string }[] = [
  { key: 'stage', label: 'Stage' },
  { key: 'alternance', label: 'Alternance' },
  { key: 'education', label: 'Formation' },
  { key: 'job', label: 'Emploi' },
  { key: 'other', label: 'Autre' },
]

const EMPTY: Omit<Experience, 'id'> = {
  company: '',
  company_en: null,
  role: '',
  role_en: null,
  description: null,
  description_en: null,
  start_date: '',
  end_date: null,
  current: false,
  type: 'education',
  context_fr: null,
  context_en: null,
  missions_fr: null,
  missions_en: null,
  autonomy_fr: null,
  autonomy_en: null,
  interactions_fr: null,
  interactions_en: null,
}

export default function AdminExperiences() {
  const { data: experiences, loading, refetch } = useSupabase<Experience[]>(() =>
    supabase.from('experiences').select('*').order('start_date', { ascending: false })
  )

  const [editing, setEditing] = useState<Partial<Experience> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)

  const isPro = editing?.type === 'stage' || editing?.type === 'alternance'

  async function handleSave() {
    if (!editing) return
    setSaving(true)
    const payload = { ...editing, end_date: editing.current ? null : editing.end_date }
    if (isNew) {
      await supabase.from('experiences').insert([payload])
    } else {
      await supabase.from('experiences').update(payload).eq('id', editing.id)
    }
    setSaving(false)
    setEditing(null)
    setIsNew(false)
    refetch()
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette expérience ?')) return
    await supabase.from('experiences').delete().eq('id', id)
    refetch()
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-base-content">Expériences</h1>
        <button className="btn btn-primary btn-sm gap-2" onClick={() => { setEditing({ ...EMPTY }); setIsNew(true) }}>
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {editing && (
        <div className="card bg-base-100 mb-6">
          <div className="card-body">
            <h2 className="card-title text-base-content text-base">
              {isNew ? 'Nouvelle expérience' : `Modifier — ${editing.role}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Base fields */}
              <div className="form-control">
                <label className="label"><span className="label-text">Type *</span></label>
                <select className="select select-bordered" value={editing.type ?? 'education'} onChange={(e) => setEditing({ ...editing, type: e.target.value as ExperienceType })}>
                  {TYPES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Entreprise / École FR *</span></label>
                <input className="input input-bordered" value={editing.company ?? ''} onChange={(e) => setEditing({ ...editing, company: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Entreprise / École EN</span></label>
                <input className="input input-bordered" value={editing.company_en ?? ''} onChange={(e) => setEditing({ ...editing, company_en: e.target.value || null })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Rôle FR *</span></label>
                <input className="input input-bordered" value={editing.role ?? ''} onChange={(e) => setEditing({ ...editing, role: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Rôle EN</span></label>
                <input className="input input-bordered" value={editing.role_en ?? ''} onChange={(e) => setEditing({ ...editing, role_en: e.target.value || null })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Description FR</span></label>
                <textarea className="textarea textarea-bordered" rows={2} value={editing.description ?? ''} onChange={(e) => setEditing({ ...editing, description: e.target.value || null })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Description EN</span></label>
                <textarea className="textarea textarea-bordered" rows={2} value={editing.description_en ?? ''} onChange={(e) => setEditing({ ...editing, description_en: e.target.value || null })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Date de début *</span></label>
                <input className="input input-bordered" type="date" value={editing.start_date ?? ''} onChange={(e) => setEditing({ ...editing, start_date: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Date de fin</span></label>
                <input className="input input-bordered" type="date" value={editing.end_date ?? ''} disabled={editing.current} onChange={(e) => setEditing({ ...editing, end_date: e.target.value || null })} />
              </div>
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" className="checkbox checkbox-primary" checked={editing.current ?? false} onChange={(e) => setEditing({ ...editing, current: e.target.checked, end_date: null })} />
                  <span className="label-text">Poste actuel</span>
                </label>
              </div>

              {/* Pro detail fields — only for stage/alternance */}
              {isPro && (
                <>
                  <div className="md:col-span-2 divider text-sm text-base-content/50">Détails professionnels</div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Contexte FR</span></label>
                    <textarea className="textarea textarea-bordered" rows={3} value={editing.context_fr ?? ''} onChange={(e) => setEditing({ ...editing, context_fr: e.target.value || null })} />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Contexte EN</span></label>
                    <textarea className="textarea textarea-bordered" rows={3} value={editing.context_en ?? ''} onChange={(e) => setEditing({ ...editing, context_en: e.target.value || null })} />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Missions FR</span></label>
                    <textarea className="textarea textarea-bordered" rows={4} value={editing.missions_fr ?? ''} onChange={(e) => setEditing({ ...editing, missions_fr: e.target.value || null })} />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Missions EN</span></label>
                    <textarea className="textarea textarea-bordered" rows={4} value={editing.missions_en ?? ''} onChange={(e) => setEditing({ ...editing, missions_en: e.target.value || null })} />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Autonomie FR</span></label>
                    <textarea className="textarea textarea-bordered" rows={3} value={editing.autonomy_fr ?? ''} onChange={(e) => setEditing({ ...editing, autonomy_fr: e.target.value || null })} />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Autonomie EN</span></label>
                    <textarea className="textarea textarea-bordered" rows={3} value={editing.autonomy_en ?? ''} onChange={(e) => setEditing({ ...editing, autonomy_en: e.target.value || null })} />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Interactions FR</span></label>
                    <textarea className="textarea textarea-bordered" rows={3} value={editing.interactions_fr ?? ''} onChange={(e) => setEditing({ ...editing, interactions_fr: e.target.value || null })} />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Interactions EN</span></label>
                    <textarea className="textarea textarea-bordered" rows={3} value={editing.interactions_en ?? ''} onChange={(e) => setEditing({ ...editing, interactions_en: e.target.value || null })} />
                  </div>
                </>
              )}
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-ghost btn-sm gap-1" onClick={() => { setEditing(null); setIsNew(false) }}><X size={14} /> Annuler</button>
              <button className="btn btn-primary btn-sm gap-1" onClick={handleSave} disabled={saving}><Check size={14} /> {saving ? 'Enregistrement...' : 'Enregistrer'}</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><span className="loading loading-spinner loading-lg" /></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra bg-base-100">
            <thead>
              <tr>
                <th>Rôle</th>
                <th>Entreprise</th>
                <th>Type</th>
                <th>Période</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {experiences?.map((exp) => (
                <tr key={exp.id}>
                  <td className="font-medium">{exp.role}</td>
                  <td>{exp.company}</td>
                  <td><span className="badge badge-ghost badge-sm">{TYPES.find((t) => t.key === exp.type)?.label}</span></td>
                  <td className="text-sm text-base-content/60">
                    {formatDate(exp.start_date)} — {exp.current ? 'Présent' : exp.end_date ? formatDate(exp.end_date) : ''}
                  </td>
                  <td>
                    <div className="flex gap-2 justify-end">
                      <button className="btn btn-ghost btn-xs" onClick={() => { setEditing(exp); setIsNew(false) }}><Pencil size={13} /></button>
                      <button className="btn btn-ghost btn-xs text-error" onClick={() => handleDelete(exp.id)}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
