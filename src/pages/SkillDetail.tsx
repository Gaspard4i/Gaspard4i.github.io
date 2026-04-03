import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import type { Skill } from '@/types/skill'
import type { Project } from '@/types/project'

const LEVEL_LABELS = ['', 'Débutant', 'Familier', 'Intermédiaire', 'Avancé', 'Expert']

export default function SkillDetail() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()

  const { data: skill, loading } = useSupabase<Skill>(() =>
    supabase.from('skills').select('*').eq('id', id!).single()
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: projectLinks } = useSupabase<any[]>(() =>
    supabase
      .from('project_skills')
      .select('projects(id, title, title_key, description, image_url, featured, year, github_url, url, long_description, project_skills(skill_id, skills(id, name, icon)))')
      .eq('skill_id', id!)
  )

  const projects: Project[] = projectLinks?.map((r) => r.projects).flat().filter(Boolean) ?? []

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 flex justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    )
  }

  if (!skill) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-base-content/60">{t('notFound.title')}</p>
        <Link to="/about" className="btn btn-outline mt-4">{t('notFound.cta')}</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/about" className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary mb-8 transition-colors">
        <ArrowLeft size={16} />
        {t('about.skills')}
      </Link>

      <div className="flex items-center gap-4 mb-6">
        {skill.icon && <img src={skill.icon} alt={skill.name} width={48} height={48} />}
        <div>
          <h1 className="text-3xl font-bold text-base-content">{skill.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="badge badge-ghost badge-sm">{skill.category}</span>
            {skill.level && (
              <span className="text-sm text-base-content/60">{LEVEL_LABELS[skill.level]}</span>
            )}
          </div>
        </div>
      </div>

      {skill.level && (
        <div className="flex gap-1 mb-8">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className={`h-2 w-12 ${n <= skill.level ? 'bg-primary' : 'bg-base-300'}`}
            />
          ))}
        </div>
      )}

      {skill.description && (
        <div className="prose max-w-none text-base-content/80 mb-12">
          {skill.description.split('\n\n').map((para, i) => (
            <p key={i} className="mb-4 leading-relaxed">{para}</p>
          ))}
        </div>
      )}

      {projects.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-base-content mb-4">Projets utilisant {skill.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => {
              const NEXTOO_PROJECTS = ['weathersport', 'nextmovie', 'gds']
              const isNextooProject = NEXTOO_PROJECTS.some(
                (key) => project.title_key?.includes(key)
              )
              const imageUrl = project.image_url
                ? `/project-images/${project.image_url.split('/').pop()}`
                : isNextooProject
                  ? '/project-images/nextoo.svg'
                  : null
              return (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="card bg-base-200 hover:shadow-lg transition-shadow"
                >
                  {imageUrl && (
                    <figure className="h-32 overflow-hidden">
                      <img src={imageUrl} alt={project.title} className="w-full h-full object-cover" />
                    </figure>
                  )}
                  <div className="card-body py-4">
                    <h3 className="font-semibold text-base-content">{project.title}</h3>
                    <p className="text-sm text-base-content/60 line-clamp-2">{project.description}</p>
                    {project.year && <span className="text-xs text-base-content/40">{project.year}</span>}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
