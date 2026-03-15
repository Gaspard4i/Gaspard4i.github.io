import { useState, useEffect, useRef } from 'react'
import type { PostgrestError } from '@supabase/supabase-js'

interface UseSupabaseResult<T> {
  data: T | null
  loading: boolean
  error: PostgrestError | null
  refetch: () => void
}

type QueryFn<T> = () => PromiseLike<{ data: T | null; error: PostgrestError | null }>

export function useSupabase<T>(queryFn: QueryFn<T>): UseSupabaseResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [tick, setTick] = useState(0)
  const queryFnRef = useRef(queryFn)
  queryFnRef.current = queryFn

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    queryFnRef.current().then(({ data: result, error: err }) => {
      if (!cancelled) {
        setData(result)
        setError(err)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [tick])

  return { data, loading, error, refetch: () => setTick((t) => t + 1) }
}
