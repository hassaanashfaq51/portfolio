import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export const useCounter = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(start + (end - start) * eased))
      if (progress === 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, end, duration, start])

  return [ref, count]
}

export default useCounter
