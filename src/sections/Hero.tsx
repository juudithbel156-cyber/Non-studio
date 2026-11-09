import { lazy, Suspense, useEffect, useRef } from 'react'
import { useI18n } from '../i18n/I18n'
import { useRouter } from '../router'
import { contact } from '../content/site'
import { gsap } from '../hooks/smoothScroll'
import { hasWebGL, useInView, useIsMobile, usePrefersReducedMotion } from '../hooks/env'
import { IMG } from '../assets/images'
import { Pill } from '../components/ui'

const HeroScene = lazy(() => import('../three/Scenes'))
const WORD = ['H', 'Ê', 'B', 'Ê']

export function Hero() {
  const { t } = useI18n()
  const { go } = useRouter()
  const root = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const mobile = useIsMobile()
  const reduced = usePrefersReducedMotion()
  const visible = useInView(root, '0px')
  const webgl = hasWebGL()

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      // Entrada: las letras suben desde abajo, la foto se descubre y el resto aparece
      const tl = gsap.timeline({ delay: 0.15 })
      tl.from('[data-glyph]', { yPercent: 105, duration: 1.5, stagger: 0.08, ease: 'expo.out' })
        .from('[data-stage]', { clipPath: 'inset(50% 50% 50% 50% round 999px)', duration: 1.6, ease: 'expo.inOut' }, 0.2)
        .from('[data-in]', { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: 'expo.out' }, 1.1)
      // Scroll: la palabra se abre, el metal se estira y la escena se aleja
      const st = { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: true }
      gsap.to(progress, { current: 1, ease: 'none', scrollTrigger: st })
      gsap.utils.toArray<HTMLElement>('[data-glyph]').forEach((g, i) => {
        gsap.to(g, { xPercent: [-70, -25, 25, 70][i], yPercent: [10, -12, 12, -10][i], ease: 'none', scrollTrigger: st })
      })
      gsap.to('[data-word]', { opacity: 0.18, ease: 'none', scrollTrigger: { ...st, start: '30% top' } })
      gsap.to('[data-in]', { y: -60, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '35% top' } })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="inicio" ref={root} aria-labelledby="hero-title" className={`relative bg-blanco ${reduced ? '' : 'h-[200svh]'}`}>
      <div className="sticky top-0 h-[100svh] min-h-[600px] overflow-hidden">
        {/* palabra gigante: detrás de todo */}
        <p data-word aria-hidden className="giant pointer-events-none absolute inset-x-0 top-[50%] flex -translate-y-1/2 select-none justify-center text-naranja max-md:top-[33%]" style={{ fontSize: 'clamp(6.4rem, 30vw, 33rem)' }}>
          {WORD.map((c, i) => <span key={i} className="-mt-[0.3em] inline-block overflow-hidden pb-[0.06em] pt-[0.3em]"><span data-glyph className="inline-block">{c}</span></span>)}
        </p>

        {/* escena 3D: foto recortada + cromo líquido */}
        <div data-stage className="absolute inset-0">
          {webgl ? (
            <Suspense fallback={<img src={IMG['hero-cut']} alt="" className="absolute bottom-0 left-1/2 h-[78%] -translate-x-1/2 object-contain" />}>
              <HeroScene progress={progress} active={visible} mobile={mobile} photo={IMG['hero-cut']} />
            </Suspense>
          ) : (
            <img src={IMG['hero-cut']} alt="" className="absolute bottom-[8%] left-1/2 h-[70%] -translate-x-1/2 object-contain" />
          )}
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-white via-white/85 to-transparent md:h-[30%] md:via-white/40" />
        {/* texto inferior */}
        <div className="gutter wrap pointer-events-none absolute inset-x-0 bottom-6 grid items-end gap-6 md:bottom-10 md:grid-cols-12">
          <h1 id="hero-title" data-in className="font-display text-[clamp(1.35rem,2.2vw,2.1rem)] font-medium leading-[1.1] tracking-[-0.02em] md:col-span-4">
            {t.hero.title}
          </h1>
          <div data-in className="pointer-events-auto flex flex-col items-start gap-5 md:col-span-4 md:col-start-9 md:items-end md:text-right">
            <p className="max-w-[36ch] text-[15px] leading-relaxed text-tinta/75 max-md:hidden">{t.hero.sub}</p>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <Pill href={`tel:${contact.tel}`} tone="naranja">{t.cta.book}</Pill>
              <Pill tone="tinta" onClick={(e) => go({ page: 'home', anchor: 'tratamientos' }, e)}>{t.cta.discover}</Pill>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
