import { useEffect, useRef, useState } from 'react'
import { gsap } from '../hooks/smoothScroll'

/**
 * Loader de entrada: la etiqueta de cuero NAU se "cose" (la puntada recorre su borde),
 * aparece "nau · Pensat per a tu" y la etiqueta se abre como una cortina hacia arriba.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setGone(true); onDone(); return }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, onComplete: () => { setGone(true) } })
      // espera a las fuentes (y un mínimo) para que la etiqueta se vea entera
      Promise.all([document.fonts?.ready, new Promise((r) => setTimeout(r, 250))]).then(() => tl.play())
      tl.fromTo('[data-tag]', { scale: 0.85, rotate: -6, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.9, ease: 'expo.out' })
        .fromTo('[data-seam]', { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, 0.2)
        .from('[data-word]', { yPercent: 110, duration: 0.9, ease: 'expo.out' }, 0.7)
        .from('[data-sub]', { opacity: 0, y: 10, duration: 0.6 }, 1.0)
        .add(onDone, 1.6)
        .to('[data-tag]', { y: -40, opacity: 0, duration: 0.6, ease: 'power3.in' }, 1.7)
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, 1.85)
    }, root)
    return () => ctx.revert()
  }, [onDone])
  if (gone) return null
  return (
    <div ref={root} className="fixed inset-0 z-[200] grid place-items-center bg-negro" aria-hidden>
      <div data-tag className="relative grid h-[190px] w-[300px] place-items-center rounded-[10px] bg-cuero text-hueso">
        <svg className="absolute inset-0" viewBox="0 0 300 190" fill="none">
          <defs><mask id="seam-mask"><rect data-seam x="14" y="14" width="272" height="162" rx="5" stroke="#fff" strokeWidth="8" pathLength="1000" strokeDasharray="1000" /></mask></defs>
          <rect x="14" y="14" width="272" height="162" rx="5" stroke="#F3EEE6" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="0.1 9" mask="url(#seam-mask)" />
        </svg>
        <div className="text-center">
          <span className="block overflow-hidden"><span data-word className="block font-marca text-[64px] font-semibold leading-[1]">nau</span></span>
          <span data-sub className="mt-2 block font-serif text-[17px] italic font-light">Pensat per a tu</span>
        </div>
      </div>
    </div>
  )
}
