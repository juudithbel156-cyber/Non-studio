import { useEffect, useRef } from 'react'
import { collections, products } from '../data/catalog'
import { IMG } from '../assets/images'
import { gsap, ScrollTrigger, scrollToTarget } from '../hooks/smoothScroll'
import { MaskText, Stitch } from '../components/ui'

/**
 * The Collection: scroll horizontal fijado. Cada colección es un "panel" a pantalla
 * con su fotografía, que se amplía al centrarse y cuyo título entra por máscara.
 */
export function Collection({ onPick }: { onPick: (cat: string) => void }) {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      const el = track.current!
      const dist = () => el.scrollWidth - innerWidth
      const tween = gsap.to(el, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true } })
      gsap.utils.toArray<HTMLElement>('[data-panel]').forEach((p) => {
        const img = p.querySelector('img')
        gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { containerAnimation: tween, trigger: p, start: 'left right', end: 'center center', scrub: true } })
        gsap.from(p.querySelectorAll('[data-t]'), { yPercent: 110, duration: 1.1, stagger: 0.06, ease: 'expo.out', scrollTrigger: { containerAnimation: tween, trigger: p, start: 'left 65%' } })
      })
    })
    const r = () => ScrollTrigger.refresh(); addEventListener('load', r)
    return () => { mm.revert(); removeEventListener('load', r) }
  }, [])

  return (
    <section id="coleccion" ref={root} aria-labelledby="col-title" className="relative overflow-hidden bg-hueso">
      <div ref={track} className="flex flex-col gap-16 py-24 md:h-[100svh] md:w-max md:flex-row md:items-center md:gap-0 md:py-0">
        {/* panel de apertura */}
        <div className="gutter flex shrink-0 flex-col justify-center md:h-full md:w-[46vw]">
          <p className="meta text-cuero">The Collection</p>
          <MaskText as="h2" text="Prendas pensadas para vestirse despacio." className="h-xl mt-6 max-w-[11ch]" />
          <Stitch className="mt-10 max-w-[260px] text-cuero" />
          <p className="lead mt-8 text-piedra">Cuatro capítulos de la tienda: tejidos naturales, texturas hechas a mano y piezas para todos los días.</p>
        </div>
        {collections.map((c, i) => {
          const count = c.products.length
          return (
            <article key={c.id} data-panel className={`gutter relative shrink-0 md:flex md:h-full md:w-[78vw] md:items-center md:gap-10 md:px-[4vw] lg:w-[64vw] ${i % 2 ? 'md:flex-row-reverse' : ''}`}>
              <a href="#novedades" onClick={(e) => { e.preventDefault(); onPick(c.id); scrollToTarget('#novedades') }} data-cursor="Ver" className="relative block aspect-[4/5] w-full overflow-hidden md:h-[76svh] md:w-auto md:max-w-[50%]">
                <img src={IMG[c.image]} alt={`Colección ${c.title}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-suelta)] hover:scale-[1.04]" />
                <span className="demo absolute left-3 top-3">Imagen provisional</span>
              </a>
              <div className="mt-6 md:mt-0 md:flex-1">
                <p className="meta text-piedra">Capítulo {i + 1} de {collections.length}</p>
                <h3 className="mt-3 overflow-hidden pb-[0.14em] font-serif text-[clamp(2.6rem,5.6vw,6.6rem)] font-light italic leading-[0.95] tracking-[-0.04em]"><span data-t className="block">{c.title}</span></h3>
                <p className="mt-5 max-w-[30ch] overflow-hidden text-[17px] leading-relaxed text-negro/75"><span data-t className="block">{c.line}</span></p>
                <button onClick={() => { onPick(c.id); scrollToTarget('#novedades') }} className="mt-8 border-b border-negro pb-1 text-[14px] font-medium hover:border-cuero hover:text-cuero">
                  Ver {count} {count === 1 ? 'pieza' : 'piezas'}
                </button>
              </div>
            </article>
          )
        })}
        <div className="hidden w-[10vw] shrink-0 md:block" />
      </div>
      <span className="sr-only">Total de piezas de demostración: {products.length}</span>
    </section>
  )
}
