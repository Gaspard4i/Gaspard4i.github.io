import { useTranslation } from 'react-i18next'
import { useSupabase } from '@/hooks/useSupabase'
import { supabase } from '@/lib/supabase'
import ProjectCard from '@/components/molecules/ProjectCard'
import SkeletonBox from '@/components/atoms/SkeletonBox'
import type { Project } from '@/types/project'

interface ProjectGridProps {
  featuredOnly?: boolean
  limit?: number
}

export default function ProjectGrid({ featuredOnly = false, limit }: ProjectGridProps) {
  const { t } = useTranslation()

  const { data: projects, loading, error } = useSupabase<Project[]>(() => {
    let query = supabase
      .from('projects')
      .select('*')
      .order('year', { ascending: false })

    if (featuredOnly) query = query.eq('featured', true)
    if (limit) query = query.limit(limit)

    return query
  })

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: limit ?? 6 }).map((_, i) => (
          <div key={i} className="card bg-base-200 p-4 gap-3">
            <SkeletonBox className="h-48 w-full rounded-lg" />
            <SkeletonBox className="h-4 w-3/4" />
            <SkeletonBox className="h-3 w-full" count={2} />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{t('common.error')}</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
