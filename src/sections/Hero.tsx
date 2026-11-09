import { lazy, Suspense, useEffect, useRef } from 'react'
import { useI18n } from '../i18n/I18n'
import { useRouter } from '../router'
import { contact } from '../content/site'
import { Letters } from '../components/ui'
import { gsap } from '../hooks/smoothScroll'
import { hasWebGL, useInView, useIsMobile, usePrefersReducedMotion } from '../hooks/env'
import { IMG } from '../assets/images'

const HeroScene = lazy(() => import('../three/HeroScene'))

export function Hero() {
  const { t } = useI18n()
  const { go } = useRouter()
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const zoom = useRef(0)
  const mobile = useIsMobile()
  const reduced = usePrefersReducedMotion()
  const visible = useInView(root, '0px')
  const webgl = hasWebGL()

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo(stage.current, { clipPath: 'inset(14% 18% 14% 18% round 24px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 2, ease: 'expo.inOut' })
        .from('[data-letter]', { yPercent: 110, duration: 1.3, stagger: 0.025, ease: 'expo.out' }, 1.0)
        .from('[data-hero-fade]', { y: 24, opacity: 0, duration: 1.1, stagger: 0.1, ease: 'expo.out' }, 1.6)
      // scroll: zoom cinematográfico de la cámara y salida del texto
      gsap.to(zoom, { current: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('[data-hero-copy]', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: '70% top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="inicio" ref={root} aria-labelledby="hero-title" className="relative h-[100svh] min-h-[620px] overflow-hidden">
      <div ref={stage} className="grain absolute inset-0 overflow-hidden bg-[#EADFD1]">
        {webgl ? (
          <Suspense fallback={<img src={IMG.hero} alt="" className="h-full w-full object-cover" />}>
            <HeroScene zoom={zoom} mobile={mobile} reduced={reduced} active={visible} />
          </Suspense>
        ) : (
          <img src={IMG.hero} alt="" className="h-full w-full object-cover object-right" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#EADFD1]/70 via-[#EADFD1]/10 to-transparent max-md:bg-gradient-to-b max-md:from-[#EADFD1]/80 max-md:via-[#EADFD1]/30" />
      </div>
      <div data-hero-copy className="gutter wrap pointer-events-none relative flex h-full flex-col justify-start pt-[18svh] md:justify-center md:pt-0">
        <h1 id="hero-title" className="display max-w-[11ch] text-chocolate"><Letters text={t.hero.title} /></h1>
        <p data-hero-fade className="mt-8 max-w-[30ch] text-[18px] text-cacao md:text-[20px]">{t.hero.sub}</p>
        <div data-hero-fade className="pointer-events-auto mt-10 flex flex-wrap gap-3">
          <a href={`tel:${contact.tel}`} data-magnetic className="btn btn-dark">{t.cta.book}</a>
          <button onClick={(e) => go({ page: 'home', anchor: 'tratamientos' }, e)} data-magnetic className="btn btn-line">{t.cta.discover}</button>
        </div>
      </div>
      <div data-hero-fade className="gutter wrap pointer-events-none absolute inset-x-0 bottom-8 flex items-end justify-between text-[13px] text-cacao">
        <span>Martorell · Barcelona</span>
        <span className="flex items-center gap-3">{t.hero.scroll}<span className="relative block h-10 w-px overflow-hidden bg-chocolate/20"><span className="absolute inset-x-0 top-0 h-1/2 animate-[pulse_2s_ease-in-out_infinite] bg-chocolate" /></span></span>
      </div>
    </section>
  )
}
