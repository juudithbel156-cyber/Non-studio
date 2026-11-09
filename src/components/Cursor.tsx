import { useEffect, useRef } from 'react'
import { gsap } from '../hooks/smoothScroll'

/**
 * Cursor personalizado: punto central + círculo exterior con retardo.
 * - [data-cursor="Texto"] amplía el círculo y muestra la etiqueta (VER, DESCUBRIR…)
 * - [data-magnetic] atrae suavemente el elemento hacia el cursor
 * Se desactiva en pantallas táctiles y con "reducir movimiento".
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const txt = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    document.documentElement.classList.add('has-cursor')
    const xd = gsap.quickTo(dot.current, 'x', { duration: 0.08 }), yd = gsap.quickTo(dot.current, 'y', { duration: 0.08 })
    const xr = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' }), yr = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' })
    let mag: HTMLElement | null = null

    let shown = false
    const move = (e: PointerEvent) => {
      if (!shown) { shown = true; gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.4 }) }
      xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY)
      if (mag) {
        const r = mag.getBoundingClientRect()
        gsap.to(mag, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: 'power3' })
      }
    }
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor],[data-magnetic],a,button')
      const label = el?.dataset.cursor
      if (label) {
        txt.current!.textContent = label
        gsap.to(ring.current, { width: 104, height: 104, backgroundColor: 'rgba(58,39,29,.92)', borderColor: 'rgba(58,39,29,0)', duration: 0.45, ease: 'expo.out' })
        gsap.to(txt.current, { opacity: 1, duration: 0.3 })
        gsap.to(dot.current, { opacity: 0, duration: 0.2 })
      } else if (el) {
        gsap.to(ring.current, { width: 64, height: 64, backgroundColor: 'rgba(58,39,29,.06)', duration: 0.4, ease: 'expo.out' })
      }
      const m = el?.closest<HTMLElement>('[data-magnetic]') ?? null
      if (m !== mag) { if (mag) gsap.to(mag, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,.4)' }); mag = m }
    }
    const out = (e: PointerEvent) => {
      const to = e.relatedTarget as HTMLElement | null
      if (to && to.closest('[data-cursor],[data-magnetic],a,button')) return
      gsap.to(ring.current, { width: 40, height: 40, backgroundColor: 'rgba(58,39,29,0)', borderColor: 'rgba(58,39,29,.45)', duration: 0.4, ease: 'expo.out' })
      gsap.to(txt.current, { opacity: 0, duration: 0.2 })
      gsap.to(dot.current, { opacity: 1, duration: 0.2 })
      if (mag) { gsap.to(mag, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,.4)' }); mag = null }
    }
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerout', out)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-chocolate/45 opacity-0 mix-blend-normal">
        <span ref={txt} className="text-[12px] tracking-[0.08em] text-crema opacity-0" />
      </div>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chocolate opacity-0" />
    </>
  )
}
