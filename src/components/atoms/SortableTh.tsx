import { ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react'
import type { SortDir } from '@/hooks/useSortable'

interface SortableThProps {
  label: string
  column: string
  activeColumn: string | null
  direction: SortDir
  onSort: (column: string) => void
  className?: string
}

// En-tête de colonne cliquable pour trier (asc/desc), avec indicateur visuel.
export default function SortableTh({ label, column, activeColumn, direction, onSort, className = '' }: SortableThProps) {
  const active = activeColumn === column
  return (
    <th className={className}>
      <button
        type="button"
        className="flex items-center gap-1 hover:text-primary transition-colors"
        onClick={() => onSort(column)}
        aria-label={`Trier par ${label}`}
      >
        {label}
        {active ? (
          direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
        ) : (
          <ChevronsUpDown size={12} className="opacity-30" />
        )}
      </button>
    </th>
  )
}
