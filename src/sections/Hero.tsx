import { lazy, Suspense, useEffect, useRef } from 'react'
import { gsap, scrollToTarget } from '../hooks/smoothScroll'
import { hasWebGL, useInView, useIsMobile, usePrefersReducedMotion } from '../hooks/env'
import { IMG } from '../assets/images'

const HeroScene = lazy(() => import('../three/Hero'))

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const mobile = useIsMobile()
  const reduced = usePrefersReducedMotion()
  const visible = useInView(root, '0px')

  useEffect(() => {
    if (!ready || reduced) return
    const ctx = gsap.context(() => {
      // Entrada: "NAU" gigante se descubre letra a letra; después titular y botón
      gsap.timeline()
        .from('[data-glyph]', { yPercent: 105, duration: 1.6, stagger: 0.12, ease: 'expo.out' })
        .from('[data-line]', { yPercent: 105, duration: 1.2, stagger: 0.08, ease: 'expo.out' }, 0.5)
        .from('[data-fade]', { opacity: 0, y: 16, duration: 1, stagger: 0.08, ease: 'expo.out' }, 0.9)
      // Scroll: la cámara atraviesa las telas; NAU se abre y desaparece; transición a crema
      const st = { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: true }
      gsap.to(progress, { current: 1, ease: 'none', scrollTrigger: st })
      gsap.to('[data-glyph="0"]', { xPercent: -60, ease: 'none', scrollTrigger: st })
      gsap.to('[data-glyph="2"]', { xPercent: 60, ease: 'none', scrollTrigger: st })
      gsap.to('[data-copy]', { opacity: 0, y: -50, ease: 'none', scrollTrigger: { ...st, end: '40% top' } })
      gsap.to('[data-veil]', { opacity: 1, ease: 'none', scrollTrigger: { ...st, start: '65% top' } })
    }, root)
    return () => ctx.revert()
  }, [ready, reduced])

  return (
    <section id="top" ref={root} aria-labelledby="hero-title" className={`relative bg-negro ${reduced ? '' : 'h-[220svh]'}`}>
      <div className="grano sticky top-0 h-[100svh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          {hasWebGL() ? (
            <Suspense fallback={<img src={IMG['ig-look-3']} alt="" className="h-full w-full object-cover" />}>
              <HeroScene progress={progress} mobile={mobile} reduced={reduced} active={visible} photo={IMG['ig-look-3']} />
            </Suspense>
          ) : <img src={IMG['ig-look-3']} alt="" className="h-full w-full object-cover" />}
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-negro/45 via-transparent to-negro/55" />

        {/* NAU gigante en minúsculas, como su etiqueta */}
        <p aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[-0.12em] flex justify-center font-marca font-semibold leading-[0.8] tracking-[-0.05em] text-hueso/90" style={{ fontSize: 'clamp(9rem, 38vw, 44rem)' }}>
          {['n', 'a', 'u'].map((c, i) => <span key={i} className="inline-block overflow-hidden"><span data-glyph={i} className="inline-block">{c}</span></span>)}
        </p>

        <div data-copy className="gutter wrap relative flex h-full flex-col justify-end pb-[30svh] text-hueso md:justify-start md:pb-0 md:pt-[22svh]">
          <h1 id="hero-title" className="max-w-[12ch] font-serif text-[clamp(2.6rem,6vw,6.4rem)] font-light italic leading-[0.95] tracking-[-0.04em]">
            {['Style is a way', 'of being.'].map((l) => <span key={l} className="block overflow-hidden pb-[0.06em]"><span data-line className="block">{l}</span></span>)}
          </h1>
          <p data-fade className="mt-6 text-[16px] text-hueso/85">Discover the NAU universe.</p>
          <div data-fade className="mt-8">
            <a href="#coleccion" onClick={(e) => { e.preventDefault(); scrollToTarget('#coleccion') }} data-magnetic className="btn btn-claro">Explore the collection</a>
          </div>
        </div>
        <div data-veil aria-hidden className="pointer-events-none absolute inset-0 bg-hueso opacity-0" />
      </div>
    </section>
  )
}
