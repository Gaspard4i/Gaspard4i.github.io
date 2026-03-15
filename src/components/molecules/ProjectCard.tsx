import { useTranslation } from 'react-i18next'
import { ExternalLink } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import type { Project } from '@/types/project'
import Badge from '@/components/atoms/Badge'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation()
  const imageUrl = project.image_url
    ? `/project-images/${project.image_url.split('/').pop()}`
    : null

  return (
    <div className="card bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
      {imageUrl && (
        <figure className="h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </figure>
      )}
      <div className="card-body gap-3">
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

        <div className="flex flex-wrap gap-1 mt-1">
          {project.techs.map((tech) => (
            <Badge key={tech} label={tech} size="sm" variant="ghost" />
          ))}
        </div>

        <div className="card-actions justify-end mt-2">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
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
