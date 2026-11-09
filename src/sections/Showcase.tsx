import { useEffect, useRef } from 'react'
import { useI18n } from '../i18n/I18n'
import { useRouter } from '../router'
import { categories, type Category } from '../content/site'
import { Rise, Shot } from '../components/ui'
import { IMG } from '../assets/images'
import { gsap } from '../hooks/smoothScroll'

function Open({ c, light = false }: { c: Category; light?: boolean }) {
  const { t, l } = useI18n()
  const { go } = useRouter()
  return (
    <a href={`#tratamiento-${c.id}`} onClick={(e) => { e.preventDefault(); go({ page: 'cat', id: c.id }, e, l(c.title)) }} data-magnetic className={`btn ${light ? 'btn-light' : 'btn-dark'} mt-10`}>
      {t.cta.services}
    </a>
  )
}

/* Cada categoría tiene su propia composición */
function Facial({ c }: { c: Category }) {
  const { t, l } = useI18n(); const { go } = useRouter()
  return (
    <article className="gutter wrap grid items-end gap-10 py-24 md:grid-cols-12 md:py-36">
      <a href={`#tratamiento-${c.id}`} onClick={(e) => { e.preventDefault(); go({ page: 'cat', id: c.id }, e, l(c.title)) }} className="md:col-span-7">
        <Shot src={IMG.facial} alt={l(c.title)} cursor={t.cursor.view} className="aspect-[4/5] w-full md:aspect-[5/6]" reveal="left" />
      </a>
      <div className="md:col-span-4 md:col-start-9 md:pb-16">
        <Rise><p className="label mb-6">{l(c.kicker)}</p><h3 className="h-xl">{l(c.title)}</h3><p className="lead mt-8">{l(c.intro)}</p><Open c={c} /></Rise>
      </div>
    </article>
  )
}

function Corporal({ c }: { c: Category }) {
  const { t, l } = useI18n(); const { go } = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      // "cambio de plano": la imagen se abre desde una ventana a pantalla completa
      gsap.fromTo('[data-win]', { clipPath: 'inset(22% 26% 22% 26%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'center center', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <article ref={ref} className="relative">
      <a href={`#tratamiento-${c.id}`} onClick={(e) => { e.preventDefault(); go({ page: 'cat', id: c.id }, e, l(c.title)) }} data-cursor={t.cursor.discover} className="block">
        <div data-win className="relative h-[110svh] min-h-[640px] overflow-hidden">
          <Shot src={IMG.corporal} alt={l(c.title)} reveal="none" className="absolute inset-0 h-full w-full" speed={0.08} />
          <div className="absolute inset-0 bg-gradient-to-t from-chocolate/55 via-chocolate/5 to-transparent" />
          <div className="gutter wrap absolute inset-x-0 bottom-16 text-hueso">
            <p className="mb-6 text-[13px] tracking-[0.04em] text-hueso/80">{l(c.kicker)}</p>
            <h3 className="h-xl max-w-[16ch]">{l(c.title)}</h3>
            <p className="mt-6 max-w-[44ch] text-[18px] leading-relaxed text-hueso/85">{l(c.intro)}</p>
          </div>
        </div>
      </a>
    </article>
  )
}

function Bienestar({ c }: { c: Category }) {
  const { t, l } = useI18n(); const { go } = useRouter()
  return (
    <article className="gutter wrap grid gap-12 py-28 md:grid-cols-12 md:py-44">
      <div className="md:col-span-5 md:pt-20">
        <Rise><p className="label mb-6">{l(c.kicker)}</p><h3 className="h-xl">{l(c.title)}</h3><p className="lead mt-8">{l(c.intro)}</p><Open c={c} /></Rise>
      </div>
      <a href={`#tratamiento-${c.id}`} onClick={(e) => { e.preventDefault(); go({ page: 'cat', id: c.id }, e, l(c.title)) }} className="relative md:col-span-6 md:col-start-7">
        <Shot src={IMG.bienestar} alt={l(c.title)} cursor={t.cursor.explore} className="ml-auto aspect-[3/4] w-[78%]" speed={0.06} />
        <div className="absolute -left-2 bottom-[-12%] w-[46%]">
          <Shot src={IMG.corporal} alt="" className="aspect-square w-full shadow-[0_40px_80px_-30px_rgba(58,39,29,.45)]" speed={0.28} />
        </div>
      </a>
    </article>
  )
}

function Crio({ c }: { c: Category }) {
  const { t, l } = useI18n(); const { go } = useRouter()
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-frost]', { filter: 'blur(18px) saturate(.6)', scale: 1.08 }, { filter: 'blur(0px) saturate(1)', scale: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'center 55%', scrub: true } })
      gsap.fromTo('[data-giant]', { xPercent: 8 }, { xPercent: -12, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <article ref={ref} className="relative overflow-hidden bg-escarcha py-28 md:py-40">
      <p data-giant aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-serif text-[30vw] leading-none text-white/70">Crio</p>
      <div className="gutter wrap relative grid items-center gap-12 md:grid-cols-12">
        <a href={`#tratamiento-${c.id}`} onClick={(e) => { e.preventDefault(); go({ page: 'cat', id: c.id }, e, l(c.title)) }} className="md:col-span-5 md:col-start-2">
          <div data-frost><Shot src={IMG.crio} alt={l(c.title)} cursor={t.cursor.discover} reveal="none" className="aspect-[4/5] w-full" /></div>
        </a>
        <div className="md:col-span-4 md:col-start-8">
          <Rise><p className="label mb-6">{l(c.kicker)}</p><h3 className="h-xl">{l(c.title)}</h3><p className="lead mt-8">{l(c.intro)}</p><Open c={c} /></Rise>
        </div>
      </div>
    </article>
  )
}

export function Showcase() {
  const { t } = useI18n()
  const [f, co, b, cr] = categories
  return (
    <section id="tratamientos" aria-labelledby="trat-title" className="relative bg-crema pt-28 md:pt-40">
      <div className="gutter wrap flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Rise><h2 id="trat-title" className="h-xl">{t.treatments.title}</h2></Rise>
        <Rise delay={0.1}><p className="lead">{t.treatments.lead}</p></Rise>
      </div>
      <Facial c={f} />
      <Corporal c={co} />
      <Bienestar c={b} />
      <Crio c={cr} />
    </section>
  )
}
