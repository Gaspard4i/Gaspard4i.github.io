import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ProseBlockProps {
  title: string
  content: string
  accent?: string
  defaultOpen?: boolean
  icon?: React.ReactNode
}

function renderHighlighted(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} className="font-semibold text-primary">
          {part.slice(2, -2)}
        </span>
      )
    }
    return part
  })
}

export default function ProseBlock({
  title,
  content,
  accent = 'border-primary',
  defaultOpen = false,
  icon,
}: ProseBlockProps) {
  const [open, setOpen] = useState(defaultOpen)

  if (!content) return null

  const paragraphs = content.split('\n\n')
  const firstPara = paragraphs[0]
  const hasMore = paragraphs.length > 1

  return (
    <div className={`border-l-3 ${accent} pl-5 py-1`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full text-left group"
      >
        {icon && <span className="text-primary">{icon}</span>}
        <h3 className="text-base font-bold text-base-content group-hover:text-primary transition-colors">
          {title}
        </h3>
        {hasMore && (
          <span className="text-base-content/40 group-hover:text-primary transition-colors ml-auto">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        )}
      </button>
      <div className="mt-2 space-y-3">
        {open ? (
          paragraphs.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-base-content/80">
              {renderHighlighted(para)}
            </p>
          ))
        ) : (
          <p className="text-sm leading-relaxed text-base-content/80">
            {renderHighlighted(firstPara)}
            {hasMore && (
              <span className="text-primary/60 ml-1 text-xs">...</span>
            )}
          </p>
        )}
      </div>
    </div>
  )
}
