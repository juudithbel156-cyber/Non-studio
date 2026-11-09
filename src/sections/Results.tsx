import { useRef } from 'react'
import { useI18n } from '../i18n/I18n'
import { results } from '../content/site'
import { IMG } from '../assets/images'
import { Rise } from '../components/ui'

export function Results() {
  const { t } = useI18n()
  const track = useRef<HTMLUListElement>(null)
  // Arrastrar con el ratón para desplazar la tira
  const drag = useRef<{ x: number; s: number } | null>(null)
  return (
    <section id="resultados" aria-labelledby="res-title" className="relative overflow-hidden bg-niebla py-28 md:py-36">
      <div className="gutter wrap grid items-end gap-8 md:grid-cols-12">
        <Rise className="md:col-span-7"><h2 id="res-title" className="h-xl">{t.results.title}</h2></Rise>
        <Rise className="md:col-span-4 md:col-start-9" delay={0.1}><p className="lead text-tinta/75">{t.results.lead}</p></Rise>
      </div>
      <ul
        ref={track}
        data-cursor={t.cursor.drag}
        onPointerDown={(e) => { if (e.pointerType === 'mouse' && track.current) drag.current = { x: e.clientX, s: track.current.scrollLeft } }}
        onPointerMove={(e) => { if (drag.current && track.current) track.current.scrollLeft = drag.current.s - (e.clientX - drag.current.x) }}
        onPointerUp={() => { drag.current = null }}
        onPointerLeave={() => { drag.current = null }}
        className="gutter mt-14 flex snap-x gap-5 overflow-x-auto pb-4 select-none [scrollbar-width:none]"
      >
        {results.map((r, i) => (
          <li key={r} className="w-[84vw] max-w-[520px] shrink-0 snap-start">
            <Rise delay={i * 0.08}>
              <img src={IMG[r]} alt="Antes y después de un tratamiento corporal en Hêbê by Clau" loading="lazy" draggable={false} className="aspect-square w-full rounded-[28px] object-cover" />
            </Rise>
          </li>
        ))}
      </ul>
    </section>
  )
}
