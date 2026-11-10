import { useEffect, useRef } from 'react'
import { IMG } from '../assets/images'
import { gsap } from '../hooks/smoothScroll'
import { Photo, Stitch } from '../components/ui'

/**
 * The NAU World: storytelling construido sobre lo que la propia marca muestra
 * (su etiqueta "Pensat per a tu", el lino, el mimbre, el ganchillo y el olivo).
 * La frase se "enciende" palabra a palabra mientras el usuario hace scroll.
 */
const LINE = 'Nau nace en Martorell con una idea sencilla: elegir cada prenda pensando en quien la va a llevar.'
export function World() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-w]', { opacity: 0.12 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '[data-phrase]', start: 'top 75%', end: 'bottom 40%', scrub: true } })
      gsap.fromTo('[data-tagimg]', { rotate: -8, y: 80 }, { rotate: 4, y: -60, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section id="mundo" data-dark ref={root} aria-labelledby="world-title" className="relative overflow-hidden bg-negro py-28 text-hueso md:py-44">
      <div className="gutter wrap grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 id="world-title" className="meta text-lima">The NAU World</h2>
          <p data-phrase className="mt-10 font-serif text-[clamp(2.2rem,4.4vw,4.8rem)] font-light leading-[1.05] tracking-[-0.035em]">
            {LINE.split(' ').map((w, i) => <span key={i} data-w>{w} </span>)}
          </p>
          <Stitch className="mt-14 max-w-[320px] text-cuero" />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              ['Pensat per a tu', 'Lo dice su etiqueta de cuero, cosida a mano: cada pieza se elige pensando en una persona.'],
              ['Materia natural', 'Lino, algodón, mimbre y paja. Tejidos que respiran y envejecen bien.'],
              ['A dos pasos', 'Una boutique de barrio en el centro de Martorell, con trato cercano.'],
            ].map(([t, d]) => (
              <div key={t}>
                <p className="font-serif text-[22px] italic font-light">{t}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-hueso/65">{d}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative md:col-span-4 md:col-start-9">
          <Photo src={IMG['ig-look-2']} alt="Probando un vaquero en la tienda NAU" className="aspect-[3/4] w-full" speed={0.08} />
          <div data-tagimg className="absolute -bottom-10 -left-10 w-[62%] shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)] md:-left-24">
            <img src={IMG.etiqueta} alt="Etiqueta de cuero NAU, Pensat per a tu" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </div>
      <p className="gutter wrap mt-32 text-[13px] text-hueso/40">Texto de presentación propuesto a partir de la identidad de la marca. Pendiente de validar con NAU.</p>
    </section>
  )
}
