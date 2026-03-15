import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import type { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation()
  const imageUrl = project.image_url
    ? `/project-images/${project.image_url.split('/').pop()}`
    : null

  const skills = project.project_skills?.map((ps) => ps.skills) ?? []

  return (
    <div className="card bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
      <Link to={`/projects/${project.id}`} className="block">
        {imageUrl && (
          <figure className="h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt={project.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </figure>
        )}
        <div className="card-body gap-3 pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="card-title text-base-content text-lg">{project.title}</h3>
            {project.featured && (
              <span className="badge badge-primary badge-sm shrink-0">{t('projects.featured')}</span>
            )}
          </div>
          {project.year && (
            <span className="text-base-content/50 text-sm">{project.year}</span>
          )}
          <p className="text-base-content/70 text-sm flex-1">{project.description}</p>
        </div>
      </Link>

      <div className="card-body pt-0 gap-3">
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {skills.map((skill) => (
              <Link
                key={skill.id}
                to={`/skills/${skill.id}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 badge badge-ghost badge-sm hover:badge-primary transition-colors"
              >
                {skill.icon && <img src={skill.icon} alt={skill.name} width={12} height={12} />}
                <span>{skill.name}</span>
              </Link>
            ))}
          </div>
        )}

        <div className="card-actions justify-end">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn btn-outline btn-sm gap-2"
            >
              <SiGithub size={14} />
              {t('projects.viewGithub')}
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn btn-primary btn-sm gap-2"
            >
              <ExternalLink size={14} />
              {t('projects.viewLive')}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
