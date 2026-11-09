import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { useI18n } from '../i18n/I18n'
import { site } from '../config/site'
import { gsap, ScrollTrigger, scrollToTarget } from '../hooks/smoothScroll'
import { hasWebGL, useInView, useIsMobile, usePrefersReducedMotion } from '../hooks/env'
import { HeroFallback } from './HeroFallback'

const HeroScene = lazy(() => import('../three/HeroScene'))

export function Hero() {
  const { t } = useI18n()
  const wrap = useRef<HTMLElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const veil = useRef<HTMLDivElement>(null)
  const cue = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
  const reduced = usePrefersReducedMotion()
  const mobile = useIsMobile()
  const webgl = hasWebGL()
  const visible = useInView(wrap, '0px')

  // Entrada inicial: el título aparece desde la profundidad
  useLayoutEffect(() => {
    if (reduced || !copy.current) return
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-in]', { opacity: 0, y: 50, scale: 0.92, filter: 'blur(10px)', duration: 1.3, ease: 'expo.out', stagger: 0.12, delay: 0.25 })
    }, copy)
    return () => ctx.revert()
  }, [reduced])

  // Scroll: la cámara 3D recorre la escena y el texto se aleja
  useEffect(() => {
    if (reduced || !wrap.current) return
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: wrap.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (s) => { progress.current = s.progress },
      })
      const tl = gsap.timeline({ scrollTrigger: { trigger: wrap.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
      tl.to(copy.current, { opacity: 0, y: -80, scale: 0.86, ease: 'power2.in', duration: 0.35 }, 0)
        .to(cue.current, { opacity: 0, duration: 0.1 }, 0)
        .to(veil.current, { opacity: 1, ease: 'power1.in', duration: 0.2 }, 0.8)
      return () => st.kill()
    }, wrap)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="inicio" ref={wrap} aria-labelledby="hero-title" className={`relative ${reduced ? 'h-[100svh]' : 'h-[260svh]'}`}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-noche">
        {webgl ? (
          <Suspense fallback={<HeroFallback loading />}>
            <HeroScene progress={progress} active={visible} mobile={mobile} reduced={reduced} />
          </Suspense>
        ) : (
          <HeroFallback />
        )}

        {/* viñeta para legibilidad */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,41,111,.55)_0%,rgba(16,41,111,0)_55%)]" />

        <div ref={copy} className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center -translate-y-[11vh] px-4 text-center md:-translate-y-[6vh]">
          <h1 id="hero-title" className="font-display font-extrabold leading-[0.86] text-white [text-shadow:0_10px_40px_rgba(6,20,63,.55)]">
            <span data-hero-in className="relative inline-block text-[clamp(3.6rem,13vw,10.5rem)] tracking-[-0.02em]">
              Juguettos
              <svg viewBox="0 0 20 24" className="absolute -right-[0.32em] top-[0.02em] h-[0.42em] w-auto" aria-hidden>
                <g stroke="#FFCC00" strokeWidth="3.4" strokeLinecap="round"><path d="M4 6l7-4" /><path d="M6 12h9" /><path d="M4 18l7 4" /></g>
              </svg>
            </span>
            <span data-hero-in className="mt-1 block text-[clamp(1.9rem,6vw,4.6rem)] text-amarillo">Martorell</span>
          </h1>
          <p data-hero-in className="mt-6 max-w-[30ch] font-display text-[clamp(1.15rem,2.2vw,1.6rem)] font-semibold text-white/90">
            {site.slogan}
          </p>
          <div data-hero-in className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#tienda" onClick={(e) => { e.preventDefault(); scrollToTarget('#tienda') }} className="btn btn-sol text-lg">
              {t.hero.cta}
            </a>
          </div>
          {webgl && <p data-hero-in className="mt-5 text-sm font-semibold text-white/60">{t.hero.hint}</p>}
        </div>

        <div ref={cue} className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/80">
          <button
            onClick={() => scrollToTarget(window.innerHeight * 1.2)}
            className="flex flex-col items-center gap-2 rounded-xl px-3 py-1"
            aria-label={t.hero.scroll}
          >
            <span className="relative block h-10 w-6 rounded-full border-2 border-white/70">
              <span className="animate-rueda absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-amarillo" />
            </span>
            <span className="text-xs font-bold">{t.hero.scroll}</span>
          </button>
        </div>

        {/* velo de transición hacia la siguiente sección */}
        <div ref={veil} aria-hidden className="pointer-events-none absolute inset-0 bg-white opacity-0" />
      </div>
    </section>
  )
}
