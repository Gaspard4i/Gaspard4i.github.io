import { Link } from 'react-router-dom'
import type { Skill } from '@/types/skill'
import { variantForSkill } from '@/lib/variants'

interface SkillTagProps {
  skill: Skill
}

const VARIANT_BG: Record<string, string> = {
  primary: 'bg-primary/10 border-primary/30 hover:bg-primary/20',
  secondary: 'bg-secondary/10 border-secondary/30 hover:bg-secondary/20',
  accent: 'bg-accent/10 border-accent/30 hover:bg-accent/20',
  info: 'bg-info/10 border-info/30 hover:bg-info/20',
  success: 'bg-success/10 border-success/30 hover:bg-success/20',
  warning: 'bg-warning/10 border-warning/30 hover:bg-warning/20',
  error: 'bg-error/10 border-error/30 hover:bg-error/20',
  neutral: 'bg-base-200 border-base-300 hover:bg-base-300',
}

export default function SkillTag({ skill }: SkillTagProps) {
  const variant = variantForSkill(skill.category)
  const cls = VARIANT_BG[variant] ?? VARIANT_BG.neutral

  return (
    <Link
      to={`/skills/${skill.id}`}
      className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-colors ${cls}`}
    >
      {skill.icon && (
        <img
          src={skill.icon}
          alt={skill.name}
          width={20}
          height={20}
          className="shrink-0"
          loading="lazy"
        />
      )}
      <span className="text-sm font-medium text-base-content">{skill.name}</span>
    </Link>
  )
}
