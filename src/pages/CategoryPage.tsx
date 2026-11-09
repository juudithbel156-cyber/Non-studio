import { useEffect, useRef } from 'react'
import { useI18n } from '../i18n/I18n'
import { useRouter } from '../router'
import { categories, contact, type Category } from '../content/site'
import { Letters, Rise, Shot } from '../components/ui'
import { TreatmentRow } from '../components/TreatmentRow'
import { IMG } from '../assets/images'
import { gsap } from '../hooks/smoothScroll'

export function CategoryPage({ id }: { id: Category['id'] }) {
  const { t, l } = useI18n()
  const { go } = useRouter()
  const c = categories.find((x) => x.id === id)!
  const next = categories[(categories.indexOf(c) + 1) % categories.length]
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = `${l(c.title)} · Hêbê by Clau`
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('[data-letter]', { yPercent: 110, duration: 1.2, stagger: 0.018, ease: 'expo.out', delay: 0.55 })
      gsap.from('[data-intro]', { y: 30, opacity: 0, duration: 1.1, ease: 'expo.out', delay: 0.9 })
    }, ref)
    return () => { ctx.revert(); document.title = 'Hêbê by Clau · Estética y medicina estética en Martorell' }
  }, [id, l, c.title])

  const frost = c.layout === 'frost'
  return (
    <div ref={ref} key={id} className={frost ? 'bg-escarcha' : 'bg-crema'}>
      <section className="gutter wrap grid min-h-[100svh] items-end gap-10 pb-20 pt-32 md:grid-cols-12 md:pt-40">
        <div className="md:col-span-6">
          <button onClick={(e) => go({ page: 'home', anchor: 'tratamientos' }, e, t.treatments.title)} className="label mb-10 inline-flex items-center gap-3 hover:text-chocolate"><span aria-hidden>←</span>{t.cta.back}</button>
          <p className="label mb-6">{l(c.kicker)}</p>
          <h1 className="h-xl"><Letters text={l(c.title)} /></h1>
          <p data-intro className="lead mt-10">{l(c.intro)}</p>
          <div data-intro className="mt-10 flex flex-wrap gap-3">
            <a href={`tel:${contact.tel}`} data-magnetic className="btn btn-dark">{t.cta.book}</a>
            <a href={`mailto:${contact.email}`} className="btn btn-line">{t.cta.contact}</a>
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <Shot src={IMG[c.image]} alt={l(c.title)} className="aspect-[4/5] w-full" reveal="up" />
        </div>
      </section>

      {c.groups.map((g) => (
        <section key={g.title.es} className="gutter wrap py-16 md:py-24">
          <div className="mb-10 grid gap-6 md:grid-cols-12">
            <Rise className="md:col-span-5"><h2 className="h-lg">{l(g.title)}</h2></Rise>
            {g.intro && <Rise className="md:col-span-5 md:col-start-8"><p className="lead">{l(g.intro)}</p></Rise>}
          </div>
          <ul className="border-b border-chocolate/15">
            {g.items.map((it) => <TreatmentRow key={it.name.es} t={it} />)}
          </ul>
        </section>
      ))}

      <section className="gutter wrap py-24 md:py-36">
        <a href={`#tratamiento-${next.id}`} onClick={(e) => { e.preventDefault(); go({ page: 'cat', id: next.id }, e, l(next.title)) }} data-cursor={t.cursor.discover} className="group grid items-end gap-8 border-t border-chocolate/20 pt-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label mb-4">{t.cta.next}</p>
            <p className="h-xl transition-transform duration-700 ease-[var(--ease-suave)] group-hover:translate-x-4">{l(next.title)}</p>
          </div>
          <div className="overflow-hidden md:col-span-3 md:col-start-10">
            <img src={IMG[next.image]} alt="" className="aspect-[4/5] w-full object-cover transition-transform duration-1000 ease-[var(--ease-suave)] group-hover:scale-105" loading="lazy" />
          </div>
        </a>
      </section>
    </div>
  )
}
