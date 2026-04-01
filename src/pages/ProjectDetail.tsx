import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ExternalLink, Calendar } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import { useI18nField } from '@/hooks/useI18nField'
import type { Project } from '@/types/project'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const resolve = useI18nField()

  const { data: project, loading, error } = useSupabase<Project>(() =>
    supabase
      .from('projects')
      .select('*, project_skills(skill_id, skills(id, name, icon))')
      .eq('id', id!)
      .single()
  )

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 flex justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-base-content/60">{t('notFound.title')}</p>
        <Link to="/projects" className="btn btn-outline mt-4">{t('notFound.cta')}</Link>
      </div>
    )
  }
  const title = resolve(project.title_key, project.title)
  const description = resolve(project.description_key, project.description)
  const longDescription = resolve(project.long_description_key, project.long_description ?? '')

  const imageUrl = project.image_url
    ? `/project-images/${project.image_url.split('/').pop()}`
    : null
  const skills = project.project_skills?.map((ps) => ps.skills) ?? []

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary mb-8 transition-colors">
        <ArrowLeft size={16} />
        {t('projects.title')}
      </Link>

      {imageUrl && (
        <div className="w-full h-64 md:h-96 overflow-hidden mb-8 bg-base-200">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex flex-wrap items-start gap-3 mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-base-content flex-1">{title}</h1>
        {project.featured && <span className="badge badge-primary">{t('projects.featured')}</span>}
      </div>

      {project.year && (
        <div className="flex items-center gap-1.5 text-base-content/50 text-sm mb-6">
          <Calendar size={14} />
          <span>{project.year}</span>
        </div>
      )}

      <p className="text-base-content/70 text-lg mb-8 leading-relaxed">{description}</p>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {skills.map((skill) => (
            <Link
              key={skill.id}
              to={`/skills/${skill.id}`}
              className="flex items-center gap-1.5 badge badge-ghost hover:badge-primary transition-colors py-3 px-3"
            >
              {skill.icon && <img src={skill.icon} alt={skill.name} width={14} height={14} />}
              <span className="text-sm">{skill.name}</span>
            </Link>
          ))}
        </div>
      )}

      <div className="flex gap-3 mb-12">
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline gap-2">
            <SiGithub size={16} />
            {t('projects.viewGithub')}
          </a>
        )}
        {project.url?.startsWith('http') && (
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary gap-2">
            <ExternalLink size={16} />
            {t('projects.viewLive')}
          </a>
        )}
      </div>

      {longDescription && (
        <div className="prose max-w-none text-base-content/80">
          {longDescription.split('\n\n').map((para, i) => (
            <p key={i} className="mb-4 leading-relaxed">{para}</p>
          ))}
        </div>
      )}
    </div>
  )
}
