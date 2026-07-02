import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth < 1024) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let animId

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX - 4}px`
      dot.style.top = `${mouseY - 4}px`
    }

    const animateRing = () => {
      ringX += (mouseX - ringX - 16) * 0.12
      ringY += (mouseY - ringY - 16) * 0.12
      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`
      animId = requestAnimationFrame(animateRing)
    }

    const addHover = () => ring.classList.add('hovered')
    const removeHover = () => ring.classList.remove('hovered')

    document.addEventListener('mousemove', moveCursor)
    document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    animId = requestAnimationFrame(animateRing)

    // Hide default cursor
    document.documentElement.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      cancelAnimationFrame(animId)
      document.documentElement.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block" />
      <div ref={ringRef} className="cursor-ring hidden lg:block" />
    </>
  )
}
