import { useState } from 'react'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import type { Project } from '@/types/project'
import type { Skill } from '@/types/skill'

const EMPTY: Omit<Project, 'id' | 'created_at' | 'project_skills'> = {
  title: '',
  title_key: null,
  description: '',
  description_key: null,
  long_description: null,
  long_description_key: null,
  url: null,
  github_url: null,
  image_url: null,
  featured: false,
  year: new Date().getFullYear(),
}

export default function AdminProjects() {
  const { data: projects, loading, refetch } = useSupabase<Project[]>(() =>
    supabase
      .from('projects')
      .select('*, project_skills(skill_id, skills(id, name, icon, category))')
      .order('year', { ascending: false })
  )

  const { data: allSkills } = useSupabase<Skill[]>(() =>
    supabase.from('skills').select('*').order('name')
  )

  const [editing, setEditing] = useState<Partial<Omit<Project, 'project_skills'>> | null>(null)
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([])
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)

  function openEdit(project: Project) {
    const { project_skills, ...rest } = project
    setEditing(rest)
    setSelectedSkillIds(project_skills?.map((ps) => ps.skill_id) ?? [])
    setIsNew(false)
  }

  function openNew() {
    setEditing({ ...EMPTY })
    setSelectedSkillIds([])
    setIsNew(true)
  }

  function closeEdit() {
    setEditing(null)
    setSelectedSkillIds([])
    setIsNew(false)
  }

  function toggleSkill(skillId: string) {
    setSelectedSkillIds((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    )
  }

  async function handleSave() {
    if (!editing) return
    setSaving(true)

    let projectId = editing.id
    if (isNew) {
      const { id: _id, created_at: _ca, ...insertPayload } = editing as Project
      const { data } = await supabase.from('projects').insert([insertPayload]).select('id').single()
      projectId = data?.id
    } else {
      const { id: _id, created_at: _ca, ...updatePayload } = editing as Project
      await supabase.from('projects').update(updatePayload).eq('id', editing.id)
    }

    if (projectId) {
      await supabase.from('project_skills').delete().eq('project_id', projectId)
      if (selectedSkillIds.length > 0) {
        await supabase.from('project_skills').insert(
          selectedSkillIds.map((skill_id) => ({ project_id: projectId, skill_id }))
        )
      }
    }

    setSaving(false)
    closeEdit()
    refetch()
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce projet ?')) return
    await supabase.from('project_skills').delete().eq('project_id', id)
    await supabase.from('projects').delete().eq('id', id)
    refetch()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-base-content">Projets</h1>
        <button className="btn btn-primary btn-sm gap-2" onClick={openNew}>
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {editing && (
        <div className="card bg-base-100 mb-6">
          <div className="card-body">
            <h2 className="card-title text-base-content text-base">
              {isNew ? 'Nouveau projet' : `Modifier — ${editing.title}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Titre * (fallback FR)</span></label>
                <input className="input input-bordered" value={editing.title ?? ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Clé i18n titre</span></label>
                <input className="input input-bordered input-sm font-mono text-xs" placeholder="project.xxx.title" value={editing.title_key ?? ''} onChange={(e) => setEditing({ ...editing, title_key: e.target.value || null })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Année</span></label>
                <input className="input input-bordered" type="number" value={editing.year ?? ''} onChange={(e) => setEditing({ ...editing, year: Number(e.target.value) })} />
              </div>
              <div className="form-control" />
              <div className="form-control md:col-span-2">
                <label className="label"><span className="label-text">Description * (fallback FR)</span></label>
                <textarea className="textarea textarea-bordered" rows={2} value={editing.description ?? ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label"><span className="label-text">Clé i18n description</span></label>
                <input className="input input-bordered input-sm font-mono text-xs" placeholder="project.xxx.description" value={editing.description_key ?? ''} onChange={(e) => setEditing({ ...editing, description_key: e.target.value || null })} />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label"><span className="label-text">Description longue (fallback FR)</span></label>
                <textarea className="textarea textarea-bordered" rows={5} value={editing.long_description ?? ''} onChange={(e) => setEditing({ ...editing, long_description: e.target.value || null })} />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label"><span className="label-text">Clé i18n description longue</span></label>
                <input className="input input-bordered input-sm font-mono text-xs" placeholder="project.xxx.long_description" value={editing.long_description_key ?? ''} onChange={(e) => setEditing({ ...editing, long_description_key: e.target.value || null })} />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label"><span className="label-text">Technologies</span></label>
                <div className="flex flex-wrap gap-2 p-3 border border-base-300 bg-base-200 min-h-12">
                  {allSkills?.map((skill) => (
                    <label key={skill.id} className="flex items-center gap-1 cursor-pointer badge badge-ghost badge-sm p-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-xs checkbox-primary"
                        checked={selectedSkillIds.includes(skill.id)}
                        onChange={() => toggleSkill(skill.id)}
                      />
                      {skill.icon && <img src={skill.icon} alt={skill.name} width={12} height={12} />}
                      <span className="text-xs">{skill.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Image (nom du fichier)</span></label>
                <input className="input input-bordered" value={editing.image_url ?? ''} onChange={(e) => setEditing({ ...editing, image_url: e.target.value || null })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">URL GitHub</span></label>
                <input className="input input-bordered" value={editing.github_url ?? ''} onChange={(e) => setEditing({ ...editing, github_url: e.target.value || null })} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">URL Live</span></label>
                <input className="input input-bordered" value={editing.url ?? ''} onChange={(e) => setEditing({ ...editing, url: e.target.value || null })} />
              </div>
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" className="checkbox checkbox-primary" checked={editing.featured ?? false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
                  <span className="label-text">En vedette</span>
                </label>
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
                <th>Titre</th>
                <th>Année</th>
                <th>Technologies</th>
                <th>Vedette</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((p) => (
                <tr key={p.id}>
                  <td className="font-medium">{p.title}</td>
                  <td>{p.year}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {p.project_skills?.map((ps) => (
                        <div key={ps.skill_id} className="flex items-center gap-1 badge badge-ghost badge-xs">
                          {ps.skills.icon && <img src={ps.skills.icon} alt={ps.skills.name} width={10} height={10} />}
                          <span>{ps.skills.name}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>{p.featured && <span className="badge badge-primary badge-sm">oui</span>}</td>
                  <td>
                    <div className="flex gap-2 justify-end">
                      <button className="btn btn-ghost btn-xs" onClick={() => openEdit(p)}><Pencil size={13} /></button>
                      <button className="btn btn-ghost btn-xs text-error" onClick={() => handleDelete(p.id)}><Trash2 size={13} /></button>
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
