import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export function usePageView() {
  const location = useLocation()

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith('/admin')) return
    supabase.from('page_views').insert([{ path: location.pathname }]).then(() => {})
  }, [location.pathname])
}
