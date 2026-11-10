import { lookbook } from '../data/catalog'
import { IMG } from '../assets/images'
import { MaskText, Photo } from '../components/ui'

/** Lookbook: retícula de revista con verticales y horizontales a distintas velocidades. */
export function Lookbook() {
  const layout = ['md:col-span-4 md:row-span-2', 'md:col-span-5 md:col-start-6', 'md:col-span-3 md:row-span-2', 'md:col-span-3 md:col-start-1 md:row-span-2', 'md:col-span-6', 'md:col-span-3 md:row-span-2']
  return (
    <section id="lookbook" aria-labelledby="look-title" className="relative bg-lino py-28 md:py-40">
      <div className="gutter wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <MaskText as="h2" text="Lookbook" className="display italic" />
          <p className="meta max-w-[28ch] text-piedra">Edición 01 · Imágenes provisionales hasta la sesión de fotos de NAU</p>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 md:auto-rows-[22vw] md:grid-cols-12 md:gap-6">
          {lookbook.map((l, i) => (
            <Photo key={i} src={IMG[l.image]} alt={`Look ${i + 1}`} cursor="Ver" speed={[0.06, 0.14, 0.1, 0.18, 0.08, 0.12][i]}
              className={`${l.ratio === 'v' ? 'aspect-[3/4]' : 'col-span-2 aspect-[16/10]'} md:aspect-auto ${layout[i]}`}>
              <span className="absolute bottom-3 left-3 font-serif text-[15px] italic text-hueso mix-blend-difference">Look {String(i + 1).padStart(2, '0')}</span>
            </Photo>
          ))}
        </div>
      </div>
    </section>
  )
}
