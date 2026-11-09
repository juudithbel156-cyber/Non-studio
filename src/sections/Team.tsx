import { useI18n } from '../i18n/I18n'
import { team } from '../content/site'
import { IMG } from '../assets/images'
import { Rise, TONE } from '../components/ui'

/** Cada persona sobresale por encima de su bloque de color: el retrato "sale" del marco. */
export function Team() {
  const { t, l } = useI18n()
  return (
    <section id="equipo" aria-labelledby="eq-title" className="relative bg-blanco py-28 md:py-40">
      <div className="gutter wrap grid items-end gap-8 md:grid-cols-12">
        <Rise className="md:col-span-7"><h2 id="eq-title" className="h-xl">{t.team.title}</h2></Rise>
        <Rise className="md:col-span-4 md:col-start-9" delay={0.1}><p className="lead text-tinta/75">{t.team.lead}</p></Rise>
      </div>
      <ul className="gutter wrap mt-16 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-24 md:grid-cols-5 md:gap-x-5">
        {team.map((m, i) => (
          <Rise key={m.name} delay={i * 0.07}>
            <li className={`group ${i === 4 ? 'max-md:col-span-2 max-md:mx-auto max-md:w-1/2' : ''}`}>
              <div className="relative pt-[10%]">
                <div className={`absolute inset-x-0 bottom-0 top-[38%] rounded-[28px] ${TONE[m.tone].bg} transition-[border-radius] duration-700 group-hover:rounded-[60px]`} />
                <img src={IMG[m.photo]} alt={m.name} loading="lazy" className="relative z-[1] mx-auto block aspect-[3/4] w-[92%] origin-bottom object-contain object-bottom transition-transform duration-700 ease-[var(--ease-salida)] group-hover:-translate-y-3 group-hover:scale-[1.06]" />
              </div>
              <p className="mt-5 font-display text-[clamp(1.1rem,1.5vw,1.45rem)] font-medium leading-tight tracking-[-0.02em]">{m.name}</p>
              <p className="mt-1.5 text-[14px] leading-snug text-tinta/70">{l(m.role)}</p>
            </li>
          </Rise>
        ))}
      </ul>
    </section>
  )
}
