import type { Skill } from '@/types/skill'

interface SkillTagProps {
  skill: Skill
}

export default function SkillTag({ skill }: SkillTagProps) {
  return (
    <div className="flex items-center gap-2 bg-base-200 px-3 py-2 hover:bg-base-300 transition-colors">
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
    </div>
  )
}
