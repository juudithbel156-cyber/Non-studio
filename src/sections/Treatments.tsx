import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18n'
import { useRouter } from '../router'
import { categories, type Treatment } from '../content/site'
import { IMG } from '../assets/images'
import { gsap } from '../hooks/smoothScroll'

function Card({ tr, onOpen }: { tr: Treatment; onOpen: (e: React.MouseEvent) => void }) {
  const { t, l } = useI18n()
  const cut = tr.img?.endsWith('-cut')
  return (
    <li data-card className="w-[72vw] max-w-[330px] shrink-0 snap-start sm:w-[300px]">
      <a href="#tratamientos" onClick={(e) => { e.preventDefault(); onOpen(e) }} data-cursor={t.cursor.view} className="group block">
        <div className={`relative aspect-[3/4] overflow-hidden rounded-b-[36px] rounded-t-[999px] ${cut ? 'bg-orquidea-claro' : 'bg-white/20'}`}>
          {tr.img && (
            <img src={IMG[tr.img]} alt={l(tr.name)} loading="lazy" className={`absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-salida)] group-hover:scale-[1.08] ${cut ? 'object-contain object-bottom pt-8' : 'object-cover'}`} />
          )}
          <span className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full bg-white/85 px-3 py-1 text-[12px] font-medium text-tinta backdrop-blur">{tr.price ?? t.treatments.priceAsk}</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 px-1">
          <p className="font-display text-[19px] font-medium leading-tight tracking-[-0.02em] text-white">{l(tr.name)}</p>
          <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-orquidea transition-transform duration-500 group-hover:rotate-[-45deg]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </div>
      </a>
    </li>
  )
}

export function Treatments() {
  const { t, l } = useI18n()
  const { go } = useRouter()
  const [tab, setTab] = useState(0)
  const track = useRef<HTMLUListElement>(null)
  const root = useRef<HTMLElement>(null)
  const cat = categories[tab]
  const items = cat.groups.flatMap((g) => g.items).filter((i) => i.img)
  const total = cat.groups.reduce((n, g) => n + g.items.length, 0)

  // Al cambiar de pestaña, las tarjetas entran en cascada desde abajo con un leve giro
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !track.current) return
    track.current.scrollTo({ left: 0 })
    gsap.fromTo(track.current.querySelectorAll('[data-card]'), { y: 120, rotate: 6, opacity: 0 }, { y: 0, rotate: 0, opacity: 1, duration: 1.1, stagger: 0.07, ease: 'expo.out' })
  }, [tab])

  // Entrada de la banda: sube desde abajo con las esquinas redondeadas abriéndose
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(root.current, { borderTopLeftRadius: '50% 120px', borderTopRightRadius: '50% 120px' }, { borderTopLeftRadius: '0% 0px', borderTopRightRadius: '0% 0px', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 20%', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])

  const scroll = (d: 1 | -1) => track.current?.scrollBy({ left: d * 330, behavior: 'smooth' })
  const open = (e: React.MouseEvent) => go({ page: 'cat', id: cat.id }, e, l(cat.title))

  return (
    <section id="tratamientos" ref={root} aria-labelledby="trat-title" className="relative z-10 -mt-[1px] overflow-hidden bg-orquidea pb-24 pt-20 md:pb-32 md:pt-28">
      <h2 id="trat-title" className="sr-only">{t.treatments.title}</h2>
      {/* pestañas: la activa en grande, el resto pequeñas a los lados */}
      <div role="tablist" aria-label={t.treatments.title} className="gutter wrap flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2 text-center md:gap-x-10">
        {categories.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={i === tab}
            onClick={() => setTab(i)}
            className={`font-display tracking-[-0.03em] transition-[color,font-size] duration-700 ease-[var(--ease-salida)] ${i === tab ? 'text-[clamp(2.2rem,5vw,4.6rem)] font-medium text-white' : 'text-[clamp(1rem,1.4vw,1.25rem)] text-white/55 hover:text-white'}`}
          >
            {l(c.kicker)}
          </button>
        ))}
      </div>
      <p className="gutter wrap mx-auto mt-5 max-w-[52ch] text-center text-[16px] leading-relaxed text-white/85">{l(cat.intro)}</p>

      <div className="relative mt-14">
        <ul ref={track} role="tabpanel" className="gutter flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] md:[&>li:first-child]:ml-auto md:[&>li:last-child]:mr-auto">
          {items.map((it) => <Card key={it.name.es} tr={it} onOpen={open} />)}
          <li data-card className="w-[72vw] max-w-[330px] shrink-0 snap-start sm:w-[300px]">
            <a href={`#tratamiento-${cat.id}`} onClick={(e) => { e.preventDefault(); open(e) }} data-cursor={t.cursor.explore} className="group flex aspect-[3/4] flex-col items-center justify-center gap-4 rounded-b-[36px] rounded-t-[999px] border border-white/50 text-white transition-colors duration-500 hover:bg-white hover:text-orquidea">
              <span className="font-display text-[64px] font-medium leading-none tracking-[-0.04em]">{total}</span>
              <span className="text-[15px]">{t.treatments.more}</span>
              <span className="mt-2 rounded-full border border-current px-4 py-2 text-[14px]">{t.cta.open}</span>
            </a>
          </li>
        </ul>
        <div className="gutter wrap mt-6 flex justify-center gap-2">
          <button onClick={() => scroll(-1)} aria-label={t.prev} className="grid h-12 w-12 place-items-center rounded-full border border-white/50 text-white hover:bg-white hover:text-orquidea">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M12 7H2M6 3 2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={() => scroll(1)} aria-label={t.next} className="grid h-12 w-12 place-items-center rounded-full border border-white/50 text-white hover:bg-white hover:text-orquidea">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}
