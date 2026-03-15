import { useState } from 'react'
import { Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import type { Profile } from '@/types/profile'

export default function AdminProfile() {
  const { data: profile, loading, refetch } = useSupabase<Profile>(() =>
    supabase.from('profile').select('*').single()
  )

  const [editing, setEditing] = useState<Partial<Profile> | null>(null)
  const [saving, setSaving] = useState(false)

  function startEdit() {
    if (profile) setEditing({ ...profile })
  }

  async function handleSave() {
    if (!editing) return
    setSaving(true)
    const { hero_fr, hero_en, about_fr, about_en } = editing
    await supabase.from('profile').update({ hero_fr, hero_en, about_fr, about_en }).eq('id', 1)
    setSaving(false)
    setEditing(null)
    refetch()
  }

  const data = editing ?? profile

  if (loading) {
    return <div className="p-8 flex justify-center"><span className="loading loading-spinner loading-lg" /></div>
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-base-content">Profil</h1>
        {!editing && (
          <button className="btn btn-primary btn-sm" onClick={startEdit}>Modifier</button>
        )}
      </div>

      <div className="card bg-base-100">
        <div className="card-body flex flex-col gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Bio courte — FR (hero)</span></label>
            {editing ? (
              <textarea className="textarea textarea-bordered" rows={3} value={editing.hero_fr ?? ''} onChange={(e) => setEditing({ ...editing, hero_fr: e.target.value })} />
            ) : (
              <p className="text-base-content/70 text-sm">{data?.hero_fr}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Bio courte — EN (hero)</span></label>
            {editing ? (
              <textarea className="textarea textarea-bordered" rows={3} value={editing.hero_en ?? ''} onChange={(e) => setEditing({ ...editing, hero_en: e.target.value })} />
            ) : (
              <p className="text-base-content/70 text-sm">{data?.hero_en}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Bio longue — FR (à propos)</span></label>
            {editing ? (
              <textarea className="textarea textarea-bordered" rows={4} value={editing.about_fr ?? ''} onChange={(e) => setEditing({ ...editing, about_fr: e.target.value })} />
            ) : (
              <p className="text-base-content/70 text-sm">{data?.about_fr}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Bio longue — EN (à propos)</span></label>
            {editing ? (
              <textarea className="textarea textarea-bordered" rows={4} value={editing.about_en ?? ''} onChange={(e) => setEditing({ ...editing, about_en: e.target.value })} />
            ) : (
              <p className="text-base-content/70 text-sm">{data?.about_en}</p>
            )}
          </div>

          {editing && (
            <div className="flex justify-end gap-2 mt-2">
              <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}>Annuler</button>
              <button className="btn btn-primary btn-sm gap-1" onClick={handleSave} disabled={saving}>
                <Check size={14} /> {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
