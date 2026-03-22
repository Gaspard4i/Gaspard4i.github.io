import { Link } from 'react-router-dom'
import type { Skill } from '@/types/skill'

interface SkillTagProps {
  skill: Skill
}

export default function SkillTag({ skill }: SkillTagProps) {
  const isSoft = skill.category === 'soft-skill'

  return (
    <Link
      to={`/skills/${skill.id}`}
      className={`flex items-center gap-2 px-3 py-2 transition-colors ${
        isSoft
          ? 'bg-secondary/10 border border-secondary/30 hover:bg-secondary/20'
          : 'bg-base-200 hover:bg-base-300'
      }`}
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
