import type { SkillCategory } from '@/types/skill'

export type DaisyVariant = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral'

const SKILL_CATEGORY_VARIANT: Record<SkillCategory, DaisyVariant> = {
  frontend: 'primary',
  backend: 'secondary',
  fullstack: 'accent',
  database: 'info',
  devops: 'warning',
  'data-science': 'success',
  tools: 'neutral',
  system: 'neutral',
  language: 'accent',
  'soft-skill': 'secondary',
}

export function variantForSkill(category: SkillCategory | string | null | undefined): DaisyVariant {
  if (!category) return 'neutral'
  return SKILL_CATEGORY_VARIANT[category as SkillCategory] ?? 'neutral'
}

const EXPERIENCE_TYPE_VARIANT: Record<string, DaisyVariant> = {
  alternance: 'primary',
  stage: 'secondary',
  education: 'accent',
  job: 'info',
  other: 'neutral',
}

export function variantForExperienceType(type: string | null | undefined): DaisyVariant {
  if (!type) return 'neutral'
  return EXPERIENCE_TYPE_VARIANT[type] ?? 'neutral'
}
