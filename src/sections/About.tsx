import { useI18n } from '../i18n/I18n'
import { philosophy, team } from '../content/site'
import { Rise, ScrubWords, Shot } from '../components/ui'
import { IMG } from '../assets/images'

export function About() {
  const { t, l } = useI18n()
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative bg-hueso py-28 md:py-44">
      <div className="gutter wrap grid gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 md:pt-24">
          <h2 id="sobre-title" className="label mb-10">{t.about.title}</h2>
          <ScrubWords text={l(philosophy.quote)} className="font-serif text-[clamp(2.2rem,4.2vw,4.4rem)] leading-[1.08]" />
          <Rise className="mt-12"><p className="lead">{l(philosophy.text)}</p></Rise>
          <Rise className="mt-12" delay={0.1}>
            <ul className="flex flex-col divide-y divide-chocolate/15 border-y border-chocolate/15">
              {philosophy.values.map((v) => <li key={v.es} className="py-4 font-serif text-[22px]">{l(v)}</li>)}
            </ul>
          </Rise>
        </div>
        <div className="relative md:col-span-6 md:col-start-7">
          <Shot src={IMG.about} alt="Bodegón editorial: esfera de cristal sobre pedestal" className="aspect-[4/5] w-full rounded-[2px]" speed={0.1} />
          <div className="absolute -bottom-10 -left-6 hidden w-[42%] md:block">
            <Shot src={IMG.facial} alt="Bodegón editorial de cosmética" className="aspect-[3/4] w-full shadow-[0_40px_80px_-30px_rgba(58,39,29,.45)]" reveal="left" speed={0.2} />
          </div>
        </div>
      </div>

      <div className="gutter wrap mt-32 md:mt-48">
        <Rise><h3 className="h-lg mb-12">{t.about.teamTitle}</h3></Rise>
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {team.map((m, i) => (
            <Rise key={m.name} delay={i * 0.06}>
              <li className="border-t border-chocolate/20 pt-5">
                <p className="font-serif text-[26px] leading-tight">{m.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-cacao">{l(m.role)}</p>
              </li>
            </Rise>
          ))}
        </ul>
      </div>
    </section>
  )
}
