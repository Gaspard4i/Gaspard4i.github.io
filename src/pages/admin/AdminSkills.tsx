import { useState } from 'react'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import type { Skill, SkillCategory } from '@/types/skill'

const CATEGORIES: SkillCategory[] = ['backend', 'frontend', 'database', 'devops', 'tools', 'system', 'data-science', 'language', 'fullstack']

const EMPTY: Omit<Skill, 'id'> = {
  name: '',
  category: 'backend',
  level: 3,
  icon: null,
  featured: false,
  description: null,
}

export default function AdminSkills() {
  const { data: skills, loading, refetch } = useSupabase<Skill[]>(() =>
    supabase.from('skills').select('*').order('name')
  )

  const [editing, setEditing] = useState<Partial<Skill> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!editing) return
    setSaving(true)
    if (isNew) {
      await supabase.from('skills').insert([editing])
    } else {
      await supabase.from('skills').update(editing).eq('id', editing.id)
    }
    setSaving(false)
    setEditing(null)
    setIsNew(false)
    refetch()
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette compétence ?')) return
    await supabase.from('skills').delete().eq('id', id)
    refetch()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-base-content">Compétences</h1>
        <button className="btn btn-primary btn-sm gap-2" onClick={() => { setEditing({ ...EMPTY }); setIsNew(true) }}>
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {editing && (
        <div className="card bg-base-100 mb-6">
          <div className="card-body">
            <h2 className="card-title text-base-content text-base">
              {isNew ? 'Nouvelle compétence' : `Modifier — ${editing.name}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Nom *</span></label>
                <input className="input input-bordered" value={editing.name ?? ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Catégorie</span></label>
                <select className="select select-bordered" value={editing.category ?? 'backend'} onChange={(e) => setEditing({ ...editing, category: e.target.value as SkillCategory })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-control md:col-span-2">
                <label className="label"><span className="label-text">URL icône (iconify)</span></label>
                <input className="input input-bordered" placeholder="https://api.iconify.design/devicon/java.svg" value={editing.icon ?? ''} onChange={(e) => setEditing({ ...editing, icon: e.target.value || null })} />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label"><span className="label-text">Description</span></label>
                <textarea className="textarea textarea-bordered" rows={4} value={editing.description ?? ''} onChange={(e) => setEditing({ ...editing, description: e.target.value || null })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Niveau (1-5)</span></label>
                <input className="input input-bordered" type="number" min={1} max={5} value={editing.level ?? 3} onChange={(e) => setEditing({ ...editing, level: Number(e.target.value) as Skill['level'] })} />
              </div>
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" className="checkbox checkbox-primary" checked={editing.featured ?? false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
                  <span className="label-text">Afficher sur la home</span>
                </label>
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
                <th>Icône</th>
                <th>Home</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {skills?.map((s) => (
                <tr key={s.id}>
                  <td className="font-medium flex items-center gap-2">
                    {s.icon && <img src={s.icon} alt={s.name} width={16} height={16} />}
                    {s.name}
                  </td>
                  <td><span className="badge badge-ghost badge-sm">{s.category}</span></td>
                  <td className="text-base-content/40 text-xs max-w-xs truncate">{s.icon}</td>
                  <td>{s.featured && <span className="badge badge-primary badge-sm">oui</span>}</td>
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
