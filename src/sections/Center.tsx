import { useEffect, useRef } from 'react'
import { useI18n } from '../i18n/I18n'
import { contact, proof } from '../content/site'
import { IMG } from '../assets/images'
import { Pill } from '../components/ui'
import { gsap } from '../hooks/smoothScroll'

export function Center() {
  const { t, l } = useI18n()
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      // La fachada se abre desde una ventana redonda hasta ocupar toda la pantalla
      gsap.fromTo('[data-fachada]', { clipPath: 'inset(18% 30% 18% 30% round 400px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'top top', scrub: true } })
      gsap.fromTo('[data-fachada] img', { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'top top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section id="centro" ref={root} aria-labelledby="centro-title" className="relative bg-blanco">
      <div data-fachada className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <img src={IMG.fachada} alt="Fachada de Hêbê by Clau en la Avda. Dr. Francesc Massana, Martorell" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-tinta/70 via-tinta/10 to-transparent" />
        <div className="gutter wrap absolute inset-x-0 bottom-0 grid gap-8 pb-10 text-white md:grid-cols-12 md:pb-14">
          <h2 id="centro-title" className="h-xl md:col-span-6">{t.center.title}</h2>
          <div className="grid gap-6 rounded-[28px] bg-bosque/95 p-6 backdrop-blur md:col-span-5 md:col-start-8 md:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-[13px] text-white/60">{t.center.where}</p>
                <address className="text-[16px] not-italic leading-relaxed">{contact.street}<br />{contact.city}</address>
                <a href={contact.maps} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block border-b border-white/40 text-[14px] hover:border-white">{t.center.how}</a>
              </div>
              <div>
                <p className="mb-2 text-[13px] text-white/60">{t.center.when}</p>
                <p className="text-[16px] leading-relaxed">{l(contact.hours)}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t border-white/15 pt-6">
              <Pill href={`tel:${contact.tel}`} tone="naranja">{t.cta.call} · {contact.phone}</Pill>
              <a href={proof.url} target="_blank" rel="noopener noreferrer" className="text-[14px] text-white/80 hover:text-white"><span className="font-display text-[20px] text-white">{proof.rating}</span> · {proof.reviews} {t.center.proof}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
