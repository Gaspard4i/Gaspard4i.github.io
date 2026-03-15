import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

function getVisitorId(): string {
  const key = 'visitor_id'
  let id = localStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(key, id)
  }
  return id
}

export function usePageView() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return
    const visitor_id = getVisitorId()
    supabase.from('page_views').insert([{ path: location.pathname, visitor_id }]).then(() => {})
  }, [location.pathname])
}
