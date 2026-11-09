import { lazy, Suspense, useEffect, useRef } from 'react'
import { useI18n } from '../i18n/I18n'
import { philosophy } from '../content/site'
import { ScrubWords } from '../components/ui'
import { gsap } from '../hooks/smoothScroll'
import { hasWebGL, useInView, useIsMobile, usePrefersReducedMotion } from '../hooks/env'

const SymbolScene = lazy(() => import('../three/Scenes').then((m) => ({ default: m.SymbolScene })))

export function Manifesto() {
  const { t, l } = useI18n()
  const root = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const near = useInView(root, '200px')
  const mobile = useIsMobile()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.to(progress, { current: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="sobre" ref={root} aria-labelledby="sobre-title" className="relative overflow-hidden bg-blanco py-28 md:py-40">
      <div className="gutter wrap grid items-center gap-10 md:grid-cols-12">
        <div className="relative md:col-span-7">
          <h2 id="sobre-title" className="mb-8 text-[14px] font-medium text-naranja">{t.manifesto.label}</h2>
          <ScrubWords text={l(philosophy.quote)} className="font-display text-[clamp(2.1rem,4.6vw,5rem)] font-medium leading-[1.02] tracking-[-0.035em]" />
          <p className="lead mt-10 text-tinta/75">{t.manifesto.text}</p>
        </div>
        <div className="relative aspect-square w-full md:col-span-5">
          {hasWebGL() && near && (
            <Suspense fallback={null}><SymbolScene progress={progress} active={near} mobile={mobile} /></Suspense>
          )}
        </div>
      </div>
      <ul className="gutter wrap mt-16 grid gap-4 md:mt-24 md:grid-cols-3">
        {philosophy.values.map((v, i) => (
          <li key={v.es} className="flex items-center gap-5 rounded-full bg-niebla py-3 pl-3 pr-6">
            <span aria-hidden className={`h-12 w-12 shrink-0 rounded-full ${['bg-naranja', 'bg-orquidea', 'bg-bosque'][i]}`} />
            <span className="font-display text-[clamp(1.2rem,1.7vw,1.6rem)] font-medium leading-tight tracking-[-0.02em]">{l(v)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
