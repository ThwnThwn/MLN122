import { useEffect, useRef, useState } from 'react'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const node = ref.current
    let timeoutId = 0

    if (!node) {
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = window.setTimeout(() => setIsVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      window.clearTimeout(timeoutId)
    }
  }, [delay])

  const hiddenStyle =
    direction === 'left'
      ? 'translate-x-8'
      : direction === 'right'
        ? '-translate-x-8'
        : 'translate-y-8'

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible ? 'translate-x-0 translate-y-0 opacity-100' : `opacity-0 ${hiddenStyle}`
      }`}
    >
      {children}
    </div>
  )
}
