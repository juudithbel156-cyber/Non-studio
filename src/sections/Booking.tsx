import { useI18n } from '../i18n/I18n'
import { contact, philosophy, proof } from '../content/site'
import { Rise } from '../components/ui'

export function Proof() {
  const { t, l } = useI18n()
  return (
    <section aria-labelledby="proof-title" className="relative bg-arena/50 py-28 md:py-36">
      <div className="gutter wrap grid gap-14 md:grid-cols-12">
        <Rise className="md:col-span-5">
          <a href={proof.url} target="_blank" rel="noopener noreferrer" className="group block">
            <p className="font-serif text-[clamp(6rem,16vw,14rem)] leading-[0.85] tabular-nums">{proof.rating}</p>
            <p className="mt-4 text-[17px] text-cacao"><span aria-hidden className="tracking-[0.2em] text-oro">★★★★★</span> {proof.reviews} {t.proof.reviews} <span className="underline decoration-chocolate/30 underline-offset-4 group-hover:decoration-chocolate">{proof.source}</span></p>
          </a>
        </Rise>
        <div className="md:col-span-6 md:col-start-7">
          <Rise><h2 id="proof-title" className="h-lg mb-10">{t.proof.title}</h2></Rise>
          <ul className="flex flex-col">
            {philosophy.benefits.map((b, i) => (
              <Rise key={b.es} delay={i * 0.06}><li className="border-t border-chocolate/20 py-5 text-[19px]">{l(b)}</li></Rise>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Booking() {
  const { t, l } = useI18n()
  return (
    <section id="reserva" aria-labelledby="reserva-title" className="relative overflow-hidden bg-crema py-28 md:py-44">
      <div className="gutter wrap">
        <Rise><h2 id="reserva-title" className="display max-w-[12ch]">{t.book.title}</h2></Rise>
        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <Rise className="md:col-span-5">
            <p className="lead">{t.book.lead}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`tel:${contact.tel}`} data-magnetic className="btn btn-dark">{t.cta.call} · {contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="btn btn-line">{t.cta.write}</a>
              {contact.whatsapp && <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-line">WhatsApp</a>}
            </div>
            <p className="mt-6 select-all text-[15px] text-cacao">{contact.phone} · {contact.email}</p>
          </Rise>
          <Rise className="md:col-span-3 md:col-start-8" delay={0.08}>
            <p className="label mb-3">{t.book.where}</p>
            <address className="text-[18px] not-italic leading-relaxed">{contact.street}<br />{contact.city}</address>
            <a href={contact.maps} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block border-b border-chocolate/40 pb-1 text-[15px] hover:border-chocolate">{t.book.how}</a>
          </Rise>
          <Rise className="md:col-span-2" delay={0.14}>
            <p className="label mb-3">{t.book.when}</p>
            <p className="text-[18px] leading-relaxed">{l(contact.hours)}</p>
          </Rise>
        </div>
      </div>
    </section>
  )
}
