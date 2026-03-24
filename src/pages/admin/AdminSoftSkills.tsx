import { useState } from 'react'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import type { SoftSkill, SoftSkillCategory } from '@/types/softSkill'

const CATEGORIES: { key: SoftSkillCategory; label: string }[] = [
  { key: 'maniere_etre', label: "Manière d'être" },
  { key: 'maniere_communiquer', label: 'Manière de communiquer' },
  { key: 'maniere_travailler', label: 'Manière de travailler' },
]

const EMPTY: Omit<SoftSkill, 'id'> = {
  category: 'maniere_etre',
  name_fr: '',
  name_en: '',
  description_fr: '',
  description_en: '',
  situation_fr: '',
  situation_en: '',
  analysis_fr: '',
  analysis_en: '',
  icon: null,
  sort_order: 0,
}

export default function AdminSoftSkills() {
  const { data: softSkills, loading, refetch } = useSupabase<SoftSkill[]>(() =>
    supabase.from('soft_skills').select('*').order('sort_order')
  )

  const [editing, setEditing] = useState<Partial<SoftSkill> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!editing) return
    setSaving(true)
    if (isNew) {
      await supabase.from('soft_skills').insert([editing])
    } else {
      await supabase.from('soft_skills').update(editing).eq('id', editing.id)
    }
    setSaving(false)
    setEditing(null)
    setIsNew(false)
    refetch()
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette compétence comportementale ?')) return
    await supabase.from('soft_skills').delete().eq('id', id)
    refetch()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-base-content">Soft Skills</h1>
        <button className="btn btn-primary btn-sm gap-2" onClick={() => { setEditing({ ...EMPTY }); setIsNew(true) }}>
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {editing && (
        <div className="card bg-base-100 mb-6">
          <div className="card-body">
            <h2 className="card-title text-base-content text-base">
              {isNew ? 'Nouvelle soft skill' : `Modifier — ${editing.name_fr}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Catégorie *</span></label>
                <select className="select select-bordered" value={editing.category ?? 'maniere_etre'} onChange={(e) => setEditing({ ...editing, category: e.target.value as SoftSkillCategory })}>
                  {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Ordre d'affichage</span></label>
                <input className="input input-bordered" type="number" min={0} value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Nom FR *</span></label>
                <input className="input input-bordered" value={editing.name_fr ?? ''} onChange={(e) => setEditing({ ...editing, name_fr: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Nom EN *</span></label>
                <input className="input input-bordered" value={editing.name_en ?? ''} onChange={(e) => setEditing({ ...editing, name_en: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Description FR</span></label>
                <textarea className="textarea textarea-bordered" rows={3} value={editing.description_fr ?? ''} onChange={(e) => setEditing({ ...editing, description_fr: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Description EN</span></label>
                <textarea className="textarea textarea-bordered" rows={3} value={editing.description_en ?? ''} onChange={(e) => setEditing({ ...editing, description_en: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Situation concrète FR</span></label>
                <textarea className="textarea textarea-bordered" rows={4} value={editing.situation_fr ?? ''} onChange={(e) => setEditing({ ...editing, situation_fr: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Situation concrète EN</span></label>
                <textarea className="textarea textarea-bordered" rows={4} value={editing.situation_en ?? ''} onChange={(e) => setEditing({ ...editing, situation_en: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Analyse FR</span></label>
                <textarea className="textarea textarea-bordered" rows={3} value={editing.analysis_fr ?? ''} onChange={(e) => setEditing({ ...editing, analysis_fr: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Analyse EN</span></label>
                <textarea className="textarea textarea-bordered" rows={3} value={editing.analysis_en ?? ''} onChange={(e) => setEditing({ ...editing, analysis_en: e.target.value })} />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label"><span className="label-text">Icône (nom lucide)</span></label>
                <input className="input input-bordered" placeholder="brain, heart-pulse, users..." value={editing.icon ?? ''} onChange={(e) => setEditing({ ...editing, icon: e.target.value || null })} />
              </div>
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
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Ordre</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {softSkills?.map((s) => (
                <tr key={s.id}>
                  <td className="font-medium">{s.name_fr}</td>
                  <td><span className="badge badge-ghost badge-sm">{CATEGORIES.find((c) => c.key === s.category)?.label}</span></td>
                  <td className="text-sm text-base-content/60">{s.sort_order}</td>
                  <td>
                    <div className="flex gap-2 justify-end">
                      <button className="btn btn-ghost btn-xs" onClick={() => { setEditing(s); setIsNew(false) }}><Pencil size={13} /></button>
                      <button className="btn btn-ghost btn-xs text-error" onClick={() => handleDelete(s.id)}><Trash2 size={13} /></button>
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
