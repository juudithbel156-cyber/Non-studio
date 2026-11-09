import { useI18n } from '../i18n/I18n'
import { contact, type Treatment } from '../content/site'

/** Fila editorial de tratamiento: nombre, descripción, beneficios, precio/duración y acciones. */
export function TreatmentRow({ t: tr, onHover }: { t: Treatment; onHover?: (on: boolean) => void }) {
  const { t, l } = useI18n()
  return (
    <li onPointerEnter={() => onHover?.(true)} onPointerLeave={() => onHover?.(false)} className="group grid gap-6 border-t border-chocolate/15 py-10 md:grid-cols-12 md:gap-8">
      <h4 className="font-serif text-[clamp(1.9rem,3vw,2.9rem)] leading-[1.05] transition-transform duration-700 ease-[var(--ease-suave)] group-hover:translate-x-3 md:col-span-5">{l(tr.name)}</h4>
      <div className="md:col-span-4">
        {tr.desc && <p className="text-[17px] leading-relaxed text-cacao">{l(tr.desc)}</p>}
        {tr.benefits && (
          <ul className="mt-4 flex flex-col gap-1.5 text-[15px] text-cacao">
            {tr.benefits.map((b) => <li key={b.es} className="flex gap-3"><span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-oro" />{l(b)}</li>)}
          </ul>
        )}
      </div>
      <div className="flex flex-col gap-4 md:col-span-3 md:items-end md:text-right">
        <dl className="flex gap-8 md:flex-col md:gap-2">
          <div><dt className="sr-only">{t.featured.from}</dt><dd className="font-serif text-[24px] tabular-nums">{tr.price ?? <span className="font-sans text-[15px] text-cacao">{t.featured.priceAsk}</span>}</dd></div>
          {tr.duration && <div><dt className="sr-only">{t.featured.duration}</dt><dd className="text-[14px] text-cacao">{l(tr.duration)}</dd></div>}
        </dl>
        <div className="flex flex-wrap gap-2 md:justify-end">
          <a href={`tel:${contact.tel}`} className="btn btn-dark h-11 px-5 text-[14px]">{t.cta.book}</a>
          {tr.url && <a href={tr.url} target="_blank" rel="noopener noreferrer" className="btn btn-line h-11 px-5 text-[14px]">{t.cta.shop}</a>}
        </div>
      </div>
    </li>
  )
}
