import { useI18n } from '../i18n/I18n'
import { contact, type Treatment } from '../content/site'
import { IMG } from '../assets/images'
import { Pill } from './ui'

/** Fila de tratamiento: al pasar el ratón la foto real se despliega en un círculo. */
export function TreatmentRow({ t: tr }: { t: Treatment }) {
  const { t, l } = useI18n()
  return (
    <li className="group grid gap-5 border-t border-current/15 py-9 md:grid-cols-12 md:items-start md:gap-8">
      <div className="flex items-center gap-5 md:col-span-5">
        {tr.img && (
          <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white/30 transition-[width] duration-700 ease-[var(--ease-salida)] group-hover:w-28">
            <img src={IMG[tr.img]} alt="" loading="lazy" className={`absolute inset-0 h-full w-full ${tr.img.endsWith('-cut') ? 'object-contain object-top' : 'object-cover'}`} />
          </span>
        )}
        <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.3rem)] font-medium leading-[1.05] tracking-[-0.03em]">{l(tr.name)}</h3>
      </div>
      <div className="md:col-span-4">
        {tr.desc && <p className="text-[16px] leading-relaxed opacity-85">{l(tr.desc)}</p>}
        {tr.benefits && (
          <ul className="mt-3 flex flex-wrap gap-2 text-[13px]">
            {tr.benefits.map((b) => <li key={b.es} className="rounded-full border border-current/25 px-3 py-1.5">{l(b)}</li>)}
          </ul>
        )}
      </div>
      <div className="flex flex-col gap-3 md:col-span-3 md:items-end md:text-right">
        <p className="font-display text-[22px] font-medium tabular-nums">{tr.price ?? <span className="font-sans text-[14px] font-normal opacity-75">{t.treatments.priceAsk}</span>}</p>
        {tr.duration && <p className="text-[13px] opacity-75">{l(tr.duration)}</p>}
        <div className="flex flex-wrap gap-2 md:justify-end">
          <Pill href={`tel:${contact.tel}`} tone="tinta" className="!h-11 !text-[14px]">{t.cta.bookShort}</Pill>
          {tr.url && <a href={tr.url} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border border-current/30 px-5 text-[14px] hover:border-current">{t.cta.shop}</a>}
        </div>
      </div>
    </li>
  )
}
