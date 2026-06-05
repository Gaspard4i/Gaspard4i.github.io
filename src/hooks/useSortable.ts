import { useMemo, useState, useCallback } from 'react'

export type SortDir = 'asc' | 'desc'

// Tri générique d'une liste d'objets par clé, avec bascule asc/desc au clic.
// Les valeurs nulles/vides sont toujours rejetées en fin de liste.
export function useSortable<T>(rows: T[], initialKey: keyof T | null = null, initialDir: SortDir = 'asc') {
  const [key, setKey] = useState<keyof T | null>(initialKey)
  const [dir, setDir] = useState<SortDir>(initialDir)

  const toggle = useCallback((k: keyof T) => {
    setKey((prev) => {
      if (prev === k) {
        setDir((d) => (d === 'asc' ? 'desc' : 'asc'))
        return prev
      }
      setDir('asc')
      return k
    })
  }, [])

  const sorted = useMemo(() => {
    if (!key) return rows
    const arr = [...rows]
    arr.sort((a, b) => {
      const va = a[key]
      const vb = b[key]
      const ea = va == null || va === ''
      const eb = vb == null || vb === ''
      if (ea && eb) return 0
      if (ea) return 1 // vides à la fin quel que soit le sens
      if (eb) return -1
      let cmp: number
      if (typeof va === 'number' && typeof vb === 'number') cmp = va - vb
      else if (typeof va === 'boolean' && typeof vb === 'boolean') cmp = va === vb ? 0 : va ? -1 : 1
      else cmp = String(va).localeCompare(String(vb), 'fr', { numeric: true, sensitivity: 'base' })
      return dir === 'asc' ? cmp : -cmp
    })
    return arr
  }, [rows, key, dir])

  return { sorted, sortKey: key, sortDir: dir, toggleSort: toggle }
}
