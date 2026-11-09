import { lazy, Suspense, useEffect, useRef } from 'react'
import { useI18n } from '../i18n/I18n'
import { useRouter } from '../router'
import { categories, contact, type Category } from '../content/site'
import { Letters, Pill, Rise, TONE } from '../components/ui'
import { TreatmentRow } from '../components/TreatmentRow'
import { IMG } from '../assets/images'
import { gsap } from '../hooks/smoothScroll'
import { hasWebGL, useIsMobile } from '../hooks/env'

const BlobScene = lazy(() => import('../three/Scenes').then((m) => ({ default: m.BlobScene })))

export function CategoryPage({ id }: { id: Category['id'] }) {
  const { t, l } = useI18n()
  const { go } = useRouter()
  const c = categories.find((x) => x.id === id)!
  const next = categories[(categories.indexOf(c) + 1) % categories.length]
  const ref = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
  const mobile = useIsMobile()
  const tone = TONE[c.tone]
  const cut = c.image.endsWith('-cut')

  useEffect(() => {
    document.title = `${l(c.title)} · Hêbê by Clau`
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('[data-letter]', { yPercent: 110, duration: 1.2, stagger: 0.02, ease: 'expo.out', delay: 0.5 })
      gsap.from('[data-arch]', { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 40px 40px)', duration: 1.4, ease: 'expo.inOut', delay: 0.35 })
      gsap.from('[data-intro]', { y: 30, opacity: 0, duration: 1, ease: 'expo.out', delay: 0.9 })
      gsap.to(progress, { current: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom bottom', scrub: true } })
    }, ref)
    return () => { ctx.revert(); document.title = 'Hêbê by Clau · Centro médico de estética en Martorell' }
  }, [id, l, c.title])

  return (
    <div ref={ref} key={id} className={`${tone.bg} ${tone.fg}`}>
      <section className="gutter wrap relative grid min-h-[100svh] items-end gap-10 pb-16 pt-28 md:grid-cols-12 md:pt-32">
        <div className="relative z-[2] md:col-span-7">
          <button onClick={(e) => go({ page: 'home', anchor: 'tratamientos' }, e, t.nav.treatments)} className="mb-10 inline-flex items-center gap-3 text-[14px] opacity-80 hover:opacity-100">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 7H2M6 3 2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{t.cta.back}
          </button>
          <h1 className="font-display font-medium leading-[0.92] tracking-[-0.045em]" style={{ fontSize: 'clamp(2.8rem, 7.4vw, 8.4rem)' }}><Letters text={l(c.title)} /></h1>
          <p data-intro className="lead mt-8 opacity-90">{l(c.intro)}</p>
          <div data-intro className="mt-8 flex flex-wrap gap-2">
            <Pill href={`tel:${contact.tel}`} tone={c.tone === 'naranja' ? 'tinta' : 'naranja'}>{t.cta.book}</Pill>
            <Pill href={`mailto:${contact.email}`} tone="blanco">{t.cta.contact}</Pill>
          </div>
        </div>
        <div className="relative md:col-span-5">
          <div data-arch className={`relative mx-auto aspect-[3/4] w-[86%] overflow-hidden rounded-b-[40px] rounded-t-[999px] ${cut ? 'bg-white/25' : ''}`}>
            <img src={IMG[c.image]} alt={l(c.title)} className={`absolute inset-0 h-full w-full ${cut ? 'object-contain object-bottom pt-10' : 'object-cover'}`} />
          </div>
          {hasWebGL() && (
            <div className="pointer-events-none absolute -left-[18%] -top-[10%] h-[58%] w-[70%]">
              <Suspense fallback={null}><BlobScene progress={progress} active mobile={mobile} /></Suspense>
            </div>
          )}
        </div>
      </section>

      {c.groups.map((g) => (
        <section key={g.title.es} className="gutter wrap py-14 md:py-20">
          <div className="mb-8 grid gap-4 md:grid-cols-12">
            <Rise className="md:col-span-6"><h2 className="h-lg">{l(g.title)}</h2></Rise>
            {g.intro && <Rise className="md:col-span-5 md:col-start-8"><p className="lead opacity-90">{l(g.intro)}</p></Rise>}
          </div>
          <ul className="border-b border-current/15">{g.items.map((it) => <TreatmentRow key={it.name.es} t={it} />)}</ul>
        </section>
      ))}

      <section className="gutter wrap pb-28 pt-10">
        <a href={`#tratamiento-${next.id}`} onClick={(e) => { e.preventDefault(); go({ page: 'cat', id: next.id }, e, l(next.title)) }} data-cursor={t.cursor.discover} className={`group relative flex min-h-[46svh] flex-col justify-between overflow-hidden rounded-[40px] p-8 md:p-12 ${TONE[next.tone].bg} ${TONE[next.tone].fg}`}>
          <span className="text-[14px] opacity-80">{t.cta.nextCat}</span>
          <span className="max-w-[14ch] font-display text-[clamp(2.2rem,5.4vw,6rem)] font-medium leading-[0.95] tracking-[-0.04em] transition-transform duration-700 ease-[var(--ease-salida)] group-hover:translate-x-3">{l(next.title)}</span>
          <img src={IMG[next.image]} alt="" loading="lazy" className="absolute -bottom-8 right-6 h-[80%] w-auto max-w-[40%] rounded-t-[999px] object-cover transition-transform duration-1000 ease-[var(--ease-salida)] group-hover:-translate-y-6 max-md:hidden" />
        </a>
      </section>
    </div>
  )
}
