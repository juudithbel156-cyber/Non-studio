import { useEffect, useLayoutEffect, useRef, useState, type ComponentType } from 'react'
import { useI18n } from '../i18n/I18n'
import { site } from '../config/site'
import { storePhotos, storePillars } from '../content/store'
import { Reveal } from '../components/Reveal'
import { IconCamera, IconMap, IconPhone, IconPin } from '../components/Icons'
import { gsap } from '../hooks/smoothScroll'
import { hasWebGL, useInView, usePrefersReducedMotion } from '../hooks/env'
import { ToyArt } from '../components/ToyArt'

type SceneProps = { active: boolean; reduced: boolean }

export function Store() {
  const { t, l } = useI18n()
  const sceneBox = useRef<HTMLDivElement>(null)
  const photos = useRef<HTMLDivElement>(null)
  const near = useInView(sceneBox, '300px')
  const reduced = usePrefersReducedMotion()
  const webgl = hasWebGL()
  const [Scene, setScene] = useState<ComponentType<SceneProps> | null>(null)

  // Carga diferida: el módulo 3D solo se descarga cuando la maqueta se acerca a pantalla
  useEffect(() => {
    if (!webgl || !near || Scene) return
    let alive = true
    import('../three/StoreScene').then((m) => alive && setScene(() => m.default))
    return () => { alive = false }
  }, [webgl, near, Scene])

  // Fotos: se descubren con una cortina diagonal al hacer scroll
  useLayoutEffect(() => {
    if (reduced || !photos.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-photo]').forEach((el, i) => {
        gsap.fromTo(el, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 40 }, {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0, duration: 1.2, ease: 'expo.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    }, photos)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="tienda" aria-labelledby="tienda-title" className="relative bg-white pb-28 pt-24 md:pt-32">
      <div className="container-j grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <h2 id="tienda-title" className="h-section text-azul">{t.store.title}</h2>
            <p className="lead mt-6">{t.store.lead}</p>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {storePillars.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <li className="h-full rounded-3xl bg-nube p-5 lg:flex lg:items-baseline lg:gap-4 lg:py-4">
                  <h3 className="shrink-0 text-xl font-bold text-azul lg:w-52">{l(p.title)}</h3>
                  <p className="mt-1.5 text-[.98rem] leading-relaxed text-gris">{l(p.text)}</p>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1} className="mt-8">
            <address className="not-italic rounded-3xl bg-azul p-6 text-white shadow-[0_24px_50px_-24px_rgba(27,61,154,.8)]">
              <p className="font-display text-sm font-bold text-amarillo">{t.store.where}</p>
              <p className="mt-2 flex items-start gap-2 text-lg font-bold"><IconPin className="mt-1 shrink-0 text-amarillo" />
                <span>{site.address.street}<br />{site.address.postalCode} {site.address.city}, {site.address.region}</span>
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sol"><IconMap size={20} />{t.store.how}</a>
                <a href={`tel:${site.phone.tel}`} className="btn bg-white/10 text-white hover:bg-white/20"><IconPhone size={20} />{site.phone.display}</a>
              </div>
            </address>
          </Reveal>
        </div>

        {/* maqueta 3D del establecimiento */}
        <Reveal y={60}>
          <div ref={sceneBox} className="relative aspect-[4/3.6] w-full overflow-hidden rounded-[36px] bg-nube shadow-[inset_0_0_0_1px_rgba(27,61,154,.08)]">
            {Scene ? (
              <Scene active={near} reduced={reduced} />
            ) : (
              <div className="grid h-full place-items-center"><ToyArt icon="blocks" className="w-1/2" /></div>
            )}
            <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-azul backdrop-blur">
              {t.store.drag}
            </p>
          </div>
        </Reveal>
      </div>

      {/* fotografías reales (huecos preparados) */}
      <div ref={photos} className="container-j mt-16 grid gap-4 sm:grid-cols-3">
        {storePhotos.map((p, i) => (
          <figure key={i} data-photo className={`overflow-hidden rounded-[28px] ${i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}>
            {p.src ? (
              <img src={p.src} alt={l(p.alt)} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            ) : (
              <div className={`slot flex h-full min-h-[180px] flex-col items-center justify-center gap-2 rounded-[28px] text-azul/70 ${i === 0 ? 'sm:min-h-[380px]' : ''}`}>
                <IconCamera size={30} />
                <span className="pendiente">{t.store.photoPending}</span>
                <figcaption className="text-sm font-bold">{l(p.caption)}</figcaption>
              </div>
            )}
          </figure>
        ))}
      </div>
    </section>
  )
}
