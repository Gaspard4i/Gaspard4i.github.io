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
    const {
      positioning_fr, positioning_en,
      reflexive_fr, reflexive_en,
      strengths_fr, strengths_en,
      improvements_fr, improvements_en,
    } = editing
    await supabase.from('profile').update({
      positioning_fr, positioning_en,
      reflexive_fr, reflexive_en,
      strengths_fr, strengths_en,
      improvements_fr, improvements_en,
    }).eq('id', 1)
    setSaving(false)
    setEditing(null)
    refetch()
  }

  const data = editing ?? profile

  if (loading) {
    return <div className="p-8 flex justify-center"><span className="loading loading-spinner loading-lg" /></div>
  }

  const fields: { label: string; key: keyof Profile; rows?: number }[] = [
    { label: 'Positionnement — FR', key: 'positioning_fr', rows: 4 },
    { label: 'Positionnement — EN', key: 'positioning_en', rows: 4 },
    { label: 'Analyse réflexive — FR', key: 'reflexive_fr', rows: 5 },
    { label: 'Analyse réflexive — EN', key: 'reflexive_en', rows: 5 },
    { label: 'Points forts — FR', key: 'strengths_fr', rows: 4 },
    { label: 'Points forts — EN', key: 'strengths_en', rows: 4 },
    { label: "Axes d'amélioration — FR", key: 'improvements_fr', rows: 4 },
    { label: "Axes d'amélioration — EN", key: 'improvements_en', rows: 4 },
  ]

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
          {fields.map(({ label, key, rows }) => (
            <div key={key} className="form-control">
              <label className="label"><span className="label-text font-medium">{label}</span></label>
              {editing ? (
                <textarea
                  className="textarea textarea-bordered"
                  rows={rows ?? 3}
                  value={(editing[key] as string) ?? ''}
                  onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
                />
              ) : (
                <p className="text-base-content/70 text-sm whitespace-pre-line">{data?.[key] as string}</p>
              )}
            </div>
          ))}

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
