import { useState, useEffect, useCallback, useRef } from 'react'
import api from '../services/api'

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    if (!url) { setLoading(false); return }
    setLoading(true)
    setError(null)
    try {
      const res = await api.get(url, { params: options.params })
      if (mountedRef.current) {
        setData(res.data.data)
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err?.response?.data?.message || 'Failed to fetch')
      }
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [url, JSON.stringify(options.params)])

  useEffect(() => {
    mountedRef.current = true
    fetchData()
    return () => { mountedRef.current = false }
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export default useFetch
