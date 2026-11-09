import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18n'
import { featured } from '../content/site'
import { TreatmentRow } from '../components/TreatmentRow'
import { Rise } from '../components/ui'
import { IMG } from '../assets/images'
import { gsap } from '../hooks/smoothScroll'

export function Featured() {
  const { t } = useI18n()
  const [img, setImg] = useState<string | null>(null)
  const float = useRef<HTMLDivElement>(null)

  // Imagen flotante que sigue al cursor sobre la lista (solo con ratón)
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const x = gsap.quickTo(float.current, 'x', { duration: 0.6, ease: 'power3' })
    const y = gsap.quickTo(float.current, 'y', { duration: 0.6, ease: 'power3' })
    const m = (e: PointerEvent) => { x(e.clientX + 30); y(e.clientY - 140) }
    addEventListener('pointermove', m)
    return () => removeEventListener('pointermove', m)
  }, [])
  useEffect(() => {
    gsap.to(float.current, { opacity: img ? 1 : 0, scale: img ? 1 : 0.85, rotate: img ? -3 : 0, duration: 0.5, ease: 'expo.out' })
  }, [img])

  return (
    <section id="destacados" aria-labelledby="dest-title" className="relative bg-hueso py-28 md:py-40">
      <div className="gutter wrap">
        <Rise><h2 id="dest-title" className="h-xl mb-16 max-w-[14ch]">{t.featured.title}</h2></Rise>
        <ul className="border-b border-chocolate/15">
          {featured.map((f) => <TreatmentRow key={f.t.name.es} t={f.t} onHover={(on) => setImg(on ? IMG[f.cat] : null)} />)}
        </ul>
      </div>
      <div ref={float} aria-hidden className="pointer-events-none fixed left-0 top-0 z-30 hidden h-64 w-52 overflow-hidden opacity-0 shadow-[0_30px_60px_-20px_rgba(58,39,29,.5)] lg:block">
        {img && <img src={img} alt="" className="h-full w-full object-cover" />}
      </div>
    </section>
  )
}
