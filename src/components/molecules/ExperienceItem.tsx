import type { Experience } from '@/types/experience'

interface ExperienceItemProps {
  experience: Experience
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
}

export default function ExperienceItem({ experience }: ExperienceItemProps) {
  const startDate = formatDate(experience.start_date)
  const endDate = experience.current
    ? "Présent"
    : experience.end_date
      ? formatDate(experience.end_date)
      : ''

  return (
    <li className="mb-6 ml-4">
      <div className="absolute w-3 h-3 bg-primary rounded-full mt-1.5 -left-1.5 border border-base-100" />
      <time className="text-xs font-normal text-base-content/50">
        {startDate} – {endDate}
      </time>
      <h3 className="text-sm font-semibold text-base-content mt-0.5">{experience.role}</h3>
      <p className="text-xs text-primary font-medium">{experience.company}</p>
      {experience.description && (
        <p className="text-xs text-base-content/70 mt-1">{experience.description}</p>
      )}
    </li>
  )
}
