import { useState } from 'react'
import { Pencil, Trash2, Plus, X, Check, GripVertical } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import type { HeroRole } from '@/types/project'

const EMPTY: Omit<HeroRole, 'id' | 'created_at'> = {
  text_key: '',
  text_default: '',
  sort_order: 0,
}

export default function AdminHeroRoles() {
  const { data: roles, loading, refetch } = useSupabase<HeroRole[]>(() =>
    supabase.from('hero_roles').select('*').order('sort_order')
  )

  const [editing, setEditing] = useState<Partial<HeroRole> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)

  function openEdit(role: HeroRole) {
    setEditing({ ...role })
    setIsNew(false)
  }

  function openNew() {
    const nextOrder = roles ? Math.max(...roles.map((r) => r.sort_order), -1) + 1 : 0
    setEditing({ ...EMPTY, sort_order: nextOrder })
    setIsNew(true)
  }

  function closeEdit() {
    setEditing(null)
    setIsNew(false)
  }

  async function handleSave() {
    if (!editing || !editing.text_key || !editing.text_default) return
    setSaving(true)

    if (isNew) {
      const { id: _id, created_at: _ca, ...payload } = editing as HeroRole
      await supabase.from('hero_roles').insert([payload])
    } else {
      const { id: _id, created_at: _ca, ...payload } = editing as HeroRole
      await supabase.from('hero_roles').update(payload).eq('id', editing.id)
    }

    setSaving(false)
    closeEdit()
    refetch()
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce role ?')) return
    await supabase.from('hero_roles').delete().eq('id', id)
    refetch()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Roles Hero</h1>
          <p className="text-base-content/60 text-sm mt-1">Textes qui alternent sous le nom dans la section hero.</p>
        </div>
        <button className="btn btn-primary btn-sm gap-2" onClick={openNew}>
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {editing && (
        <div className="card bg-base-100 mb-6">
          <div className="card-body">
            <h2 className="card-title text-base-content text-base">
              {isNew ? 'Nouveau role' : `Modifier — ${editing.text_default}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Texte par defaut (FR) *</span></label>
                <input className="input input-bordered" value={editing.text_default ?? ''} onChange={(e) => setEditing({ ...editing, text_default: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Cle i18n *</span></label>
                <input className="input input-bordered font-mono text-sm" placeholder="hero.role.xxx" value={editing.text_key ?? ''} onChange={(e) => setEditing({ ...editing, text_key: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Ordre</span></label>
                <input className="input input-bordered" type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} />
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-ghost btn-sm gap-1" onClick={closeEdit}><X size={14} /> Annuler</button>
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
                <th><GripVertical size={14} /></th>
                <th>Texte (FR)</th>
                <th>Cle i18n</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {roles?.map((r) => (
                <tr key={r.id}>
                  <td className="text-base-content/40">{r.sort_order}</td>
                  <td className="font-medium">{r.text_default}</td>
                  <td className="font-mono text-xs text-base-content/60">{r.text_key}</td>
                  <td>
                    <div className="flex gap-2 justify-end">
                      <button className="btn btn-ghost btn-xs" onClick={() => openEdit(r)}><Pencil size={13} /></button>
                      <button className="btn btn-ghost btn-xs text-error" onClick={() => handleDelete(r.id)}><Trash2 size={13} /></button>
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
