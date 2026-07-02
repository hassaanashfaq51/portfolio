import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export const useScrollReveal = (options = {}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: options.once !== false,
    margin: options.margin || '0px 0px -100px 0px',
    amount: options.amount || 0.1,
  })
  return [ref, isInView]
}

export default useScrollReveal
