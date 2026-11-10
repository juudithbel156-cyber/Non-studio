import { useEffect, useRef, useState } from 'react'
import { store } from '../data/store'
import { Logo } from './ui'
import { NAV } from './Header'
import { gsap, scrollToTarget, stopScroll } from '../hooks/smoothScroll'

const LEGAL: Record<string, { title: string; body: string }> = {
  privacidad: { title: 'Política de privacidad', body: 'Texto pendiente. Debe redactarlo o revisarlo el responsable legal de NAU essentials antes de publicar la web (RGPD y LOPDGDD): responsable del tratamiento, finalidades, base legal, plazos de conservación y derechos.' },
  aviso: { title: 'Aviso legal', body: 'Texto pendiente. Debe incluir los datos del titular de la web (razón social, NIF, domicilio, contacto) conforme a la LSSI-CE.' },
  cookies: { title: 'Política de cookies', body: 'Esta web no instala cookies propias de análisis ni de publicidad. El mapa incrustado de Google Maps puede usar cookies de terceros. Texto pendiente de revisión legal.' },
}

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const [doc, setDoc] = useState<string | null>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('[data-big]', { yPercent: 100, duration: 1.6, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '[data-bigrow]', start: 'top 95%' } })
    }, ref)
    return () => ctx.revert()
  }, [])
  useEffect(() => { stopScroll(!!doc) }, [doc])
  return (
    <footer ref={ref} className="relative overflow-hidden bg-cuero text-hueso">
      <div className="gutter wrap grid gap-12 pb-10 pt-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo size={44} />
          <p className="mt-3 font-serif text-[20px] italic font-light">Pensat per a tu.</p>
        </div>
        <nav aria-label="Pie" className="md:col-span-3 md:col-start-6">
          <ul className="flex flex-col gap-2 text-[15px]">
            {NAV.map((n) => <li key={n.id}><a href={`#${n.id}`} onClick={(e) => { e.preventDefault(); scrollToTarget(`#${n.id}`) }} className="hover:underline">{n.label}</a></li>)}
          </ul>
        </nav>
        <address className="flex flex-col gap-2 text-[15px] not-italic md:col-span-3">
          <span>{store.street}<br />{store.city}</span>
          <a href={`tel:${store.tel}`} className="hover:underline">{store.phone}</a>
          <a href={store.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram {store.instagram.handle}</a>
        </address>
      </div>
      <div data-bigrow className="gutter wrap flex overflow-hidden" aria-hidden>
        <p className="font-marca font-semibold leading-[0.78] tracking-[-0.05em]" style={{ fontSize: 'clamp(8rem, 34vw, 38rem)' }}>
          {['n', 'a', 'u'].map((c, i) => <span key={i} data-big className="inline-block">{c}</span>)}
        </p>
      </div>
      <div className="gutter wrap">
        <div className="stitch text-hueso/60" />
        <div className="flex flex-col gap-3 py-6 text-[13px] text-hueso/75 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} NAU essentials · Martorell</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {Object.entries(LEGAL).map(([k, v]) => <li key={k}><button onClick={() => setDoc(k)} className="hover:underline">{v.title}</button></li>)}
          </ul>
        </div>
      </div>
      {doc && (
        <div role="dialog" aria-modal="true" aria-labelledby="legal-title" className="fixed inset-0 z-[90] grid place-items-center bg-negro/50 p-4" onClick={() => setDoc(null)}>
          <div className="max-w-lg rounded-[6px] bg-hueso p-8 text-negro" onClick={(e) => e.stopPropagation()}>
            <h2 id="legal-title" className="font-serif text-[30px] font-light">{LEGAL[doc].title}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-negro/75">{LEGAL[doc].body}</p>
            <button onClick={() => setDoc(null)} className="btn btn-negro mt-6">Cerrar</button>
          </div>
        </div>
      )}
    </footer>
  )
}
