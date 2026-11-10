import { store } from '../data/store'
import { IMG } from '../assets/images'
import { MaskText, Stitch } from '../components/ui'

export function Visit() {
  const pending = store.hours.every((h) => h.h === null)
  return (
    <section id="visitanos" aria-labelledby="visit-title" className="relative bg-hueso py-28 md:py-40">
      <div className="gutter wrap grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="meta text-cuero">Visit Us</p>
          <MaskText as="h2" text="Ven a probártelo." className="h-xl mt-5" />
          <Stitch className="mt-10 max-w-[260px] text-cuero" />
          <address className="mt-10 text-[20px] not-italic leading-relaxed">{store.street}<br />{store.city}</address>
          <p className="mt-4 select-all text-[18px]">{store.phone}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            <a href={store.maps} target="_blank" rel="noopener noreferrer" data-magnetic className="btn btn-negro">Cómo llegar</a>
            <a href={`tel:${store.tel}`} className="btn btn-linea">Llamar</a>
          </div>
          <div className="mt-12">
            <p className="meta mb-3">Horario</p>
            {pending ? (
              <p className="text-[15px] text-piedra">Horario pendiente de confirmar con la tienda. Llámanos o escríbenos por Instagram antes de venir.</p>
            ) : (
              <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-1.5 text-[15px]">
                {store.hours.map((h) => <div key={h.day} className="contents"><dt>{h.day}</dt><dd className="text-piedra">{h.h}</dd></div>)}
              </dl>
            )}
          </div>
        </div>
        <div className="relative grid gap-4 md:col-span-6 md:col-start-7">
          <div className="stitch-box relative aspect-[4/3] overflow-hidden rounded-[6px] text-cuero md:aspect-auto md:h-full md:min-h-[520px]">
            {import.meta.env.VITE_NO_EMBED ? (<a href={store.maps} target="_blank" rel="noopener noreferrer" className="absolute inset-0 grid place-items-center bg-lino text-negro"><span className="text-center"><span className="block font-serif text-[34px] font-light italic">Carrer Pintor Fortuny, 6</span><span className="mt-3 inline-block border-b border-negro text-[14px]">Abrir en Google Maps</span></span></a>) : <iframe title="Mapa: NAU essentials, Carrer Pintor Fortuny 6, Martorell" src={import.meta.env.VITE_NO_EMBED ? undefined : store.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0 grayscale-[.85] sepia-[.2]" />}
          </div>
          <img src={IMG['ig-fachada']} alt="Fachada de NAU essentials en Martorell" loading="lazy" className="absolute -right-4 -top-24 hidden w-48 rotate-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,.5)] md:block" />
        </div>
      </div>
    </section>
  )
}
