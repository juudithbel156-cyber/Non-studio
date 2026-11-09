import { useLayoutEffect, useRef } from 'react'
import { useI18n } from '../i18n/I18n'
import { promos } from '../content/promos'
import { gsap, ScrollTrigger } from '../hooks/smoothScroll'
import { usePrefersReducedMotion } from '../hooks/env'

export function News() {
  const { t, l } = useI18n()
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  // Escritorio: la sección se fija y las campañas avanzan en horizontal con el scroll
  useLayoutEffect(() => {
    if (reduced) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const el = track.current!
      const dist = () => el.scrollWidth - el.parentElement!.clientWidth
      const tween = gsap.to(el, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: { trigger: section.current, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
      })
      gsap.utils.toArray<HTMLElement>('[data-promo-emoji]').forEach((e) => {
        gsap.fromTo(e, { y: 40, rotate: -12 }, { y: -30, rotate: 10, ease: 'none', scrollTrigger: { containerAnimation: tween, trigger: e, start: 'left right', end: 'right left', scrub: true } })
      })
    })
    const r = () => ScrollTrigger.refresh()
    window.addEventListener('load', r)
    return () => { mm.revert(); window.removeEventListener('load', r) }
  }, [reduced])

  return (
    <section id="novedades" ref={section} aria-labelledby="novedades-title" className="relative overflow-hidden bg-nube py-24 lg:flex lg:h-[100svh] lg:items-center lg:py-0">
      <div className="w-full">
        <div className="container-j mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 id="novedades-title" className="h-section text-azul">{t.news.title}</h2>
            <p className="lead mt-4">{t.news.lead}</p>
          </div>
          <p className="hidden shrink-0 text-sm font-bold text-gris lg:block">{t.news.drag} ⟶</p>
        </div>
        <div className="overflow-x-auto pb-4 lg:overflow-visible [scrollbar-width:none]">
          <div ref={track} className="flex w-max snap-x snap-mandatory gap-5 px-4 sm:px-6 lg:px-[max(2.5rem,calc((100vw-1200px)/2+2.5rem))]">
            {promos.map((p) => (
              <article
                key={p.id}
                className="relative flex h-[420px] w-[80vw] max-w-[440px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[32px] p-7 text-white shadow-[0_30px_60px_-30px_rgba(16,41,111,.6)] sm:w-[440px]"
                style={{ background: `linear-gradient(150deg, ${p.color}, ${p.color}dd 55%, ${p.color}aa)` }}
              >
                <span data-promo-emoji aria-hidden className="pointer-events-none absolute -right-4 top-6 select-none text-[9rem] leading-none drop-shadow-[0_20px_25px_rgba(0,0,0,.35)]">{p.emoji}</span>
                <div className="relative flex flex-wrap gap-2">
                  <span className="rounded-full px-3 py-1 text-sm font-extrabold text-tinta" style={{ background: p.accent }}>{l(p.kind)}</span>
                  {p.placeholder && <span className="pendiente">{t.news.sample}</span>}
                </div>
                <div className="relative">
                  {p.dates && <p className="mb-2 font-bold text-white/80">{p.dates}</p>}
                  <h3 className="text-[2.1rem] font-extrabold leading-[1.02]">{l(p.title)}</h3>
                  <p className="mt-3 max-w-[32ch] text-white/85">{l(p.text)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
