import { useState, type FormEvent } from 'react'
import { useI18n } from '../i18n/I18n'
import { site } from '../config/site'
import { Reveal, SectionHead } from '../components/Reveal'
import { Wave } from '../components/Wave'
import { ToyDeco } from '../components/ToyDeco'
import { IconClock, IconMap, IconPhone, IconPin, IconSocial } from '../components/Icons'

type Status = 'idle' | 'sending' | 'sent' | 'mail' | 'error' | 'unconfigured'

function ContactForm() {
  const { t } = useI18n()
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const data = {
      nombre: String(fd.get('nombre') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      telefono: String(fd.get('telefono') || '').trim(),
      mensaje: String(fd.get('mensaje') || '').trim(),
    }
    const err: Record<string, string> = {}
    if (!data.nombre) err.nombre = t.contact.required
    if (!data.email) err.email = t.contact.required
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) err.email = t.contact.invalidEmail
    if (!data.mensaje) err.mensaje = t.contact.required
    if (!fd.get('privacidad')) err.privacidad = t.contact.required
    setErrors(err)
    if (Object.keys(err).length) return

    if (site.contact.endpoint) {
      setStatus('sending')
      try {
        const r = await fetch(site.contact.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
        if (!r.ok) throw new Error(String(r.status))
        setStatus('sent')
        form.reset()
      } catch {
        setStatus('error')
      }
      return
    }
    if (site.contact.email) {
      const body = `${data.mensaje}\n\n${data.nombre} · ${data.email}${data.telefono ? ' · ' + data.telefono : ''}`
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent('Consulta web · Juguettos Martorell')}&body=${encodeURIComponent(body)}`
      setStatus('mail')
      return
    }
    setStatus('unconfigured')
  }

  const field = 'mt-1.5 w-full rounded-2xl border-2 border-transparent bg-nube px-4 py-3 text-tinta shadow-[inset_0_0_0_1px_rgba(27,61,154,.15)] outline-none transition focus:border-azul'
  const Err = ({ k }: { k: string }) => (errors[k] ? <span className="mt-1 block text-sm font-bold text-rojo" id={`${k}-err`}>{errors[k]}</span> : null)

  return (
    <form onSubmit={submit} noValidate className="rounded-[32px] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,.5)] sm:p-8">
      <h3 className="text-2xl font-extrabold text-azul">{t.contact.form}</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block font-bold">{t.contact.name}
          <input name="nombre" autoComplete="name" className={field} aria-invalid={!!errors.nombre} aria-describedby="nombre-err" />
          <Err k="nombre" />
        </label>
        <label className="block font-bold">{t.contact.email}
          <input name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby="email-err" />
          <Err k="email" />
        </label>
        <label className="block font-bold sm:col-span-2">{t.contact.phone}
          <input name="telefono" type="tel" autoComplete="tel" className={field} />
        </label>
        <label className="block font-bold sm:col-span-2">{t.contact.message}
          <textarea name="mensaje" rows={4} className={`${field} resize-y`} aria-invalid={!!errors.mensaje} aria-describedby="mensaje-err" />
          <Err k="mensaje" />
        </label>
        <label className="flex items-start gap-3 text-[.95rem] text-gris sm:col-span-2">
          <input type="checkbox" name="privacidad" className="mt-1 h-5 w-5 shrink-0 accent-azul" />
          <span>{t.contact.privacy}<Err k="privacidad" /></span>
        </label>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-azul" disabled={status === 'sending'}>{status === 'sending' ? t.contact.sending : t.contact.send}</button>
        <p role="status" aria-live="polite" className={`text-[.95rem] font-bold ${status === 'error' || status === 'unconfigured' ? 'text-rojo' : 'text-[#0E7A52]'}`}>
          {status === 'sent' && t.contact.sent}
          {status === 'mail' && t.contact.mailOpened}
          {status === 'error' && t.contact.error}
          {status === 'unconfigured' && t.contact.notConfigured}
        </p>
      </div>
    </form>
  )
}

export function Contact() {
  const { t, lang } = useI18n()
  const social = site.social.filter((s) => s.url)
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="patron-oscuro relative bg-azul pb-24 pt-28 md:pt-36">
      <Wave color="#1B3D9A" />
      <div className="container-j">
        <SectionHead id="contacto-title" title={t.contact.title} lead={t.contact.lead} tone="light" deco={
          <ToyDeco className="h-36 w-48 md:h-56 md:w-80" camZ={4.6} toys={[{ kind: 'duck', position: [-0.6, 0, 0.2], rotation: [0, 0.9, 0], scale: 1.1 }, { kind: 'ball', position: [1.0, 0, -0.3], scale: 0.9 }]} />
        } />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr]">
          <Reveal>
            <div className="flex h-full flex-col gap-6 rounded-[32px] bg-noche/70 p-6 text-white ring-1 ring-white/10 sm:p-8">
              <address className="not-italic">
                <p className="font-display text-2xl font-extrabold">{site.name}</p>
                <p className="mt-3 flex items-start gap-2 text-lg"><IconPin className="mt-1 shrink-0 text-amarillo" />
                  <span>{site.address.street}<br />{site.address.postalCode} {site.address.city}, {site.address.region}</span>
                </p>
                <p className="mt-2 flex items-center gap-2 text-lg"><IconPhone className="shrink-0 text-amarillo" />
                  <a href={`tel:${site.phone.tel}`} className="font-bold underline-offset-4 hover:underline">{site.phone.display}</a>
                </p>
              </address>
              <div className="flex flex-wrap gap-3">
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sol"><IconMap size={20} />{t.contact.openMaps}</a>
                <a href={`tel:${site.phone.tel}`} className="btn bg-white/10 text-white hover:bg-white/20"><IconPhone size={20} />{t.contact.callUs}</a>
              </div>
              <div>
                <p className="flex items-center gap-2 font-display text-lg font-bold text-amarillo"><IconClock size={20} />{t.contact.hours}</p>
                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-[.98rem]">
                  {site.hours.map((h) => (
                    <div key={h.day} className="contents">
                      <dt className="font-bold text-white/85">{lang === 'ca' ? h.dayCa : h.day}</dt>
                      <dd className={h.hours ? '' : 'text-white/55'}>{h.hours ?? t.contact.hoursPending}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="mt-auto">
                <p className="font-display font-bold text-amarillo">{t.contact.social}</p>
                {social.length ? (
                  <ul className="mt-2 flex gap-2">
                    {social.map((s) => (
                      <li key={s.id}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:scale-105 hover:bg-white/20">
                          <IconSocial id={s.id} />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2"><span className="pendiente">{t.contact.socialPending}</span></p>
                )}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}><ContactForm /></Reveal>
        </div>
        <Reveal className="mt-6">
          <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,.5)]">
            {import.meta.env.VITE_NO_EMBED ? (
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="slot flex h-[260px] flex-col items-center justify-center gap-3 rounded-[32px] text-azul">
                <IconMap size={36} />
                <span className="font-display text-xl font-bold">{t.contact.openMaps}</span>
                <span className="text-sm text-gris">{site.address.street}, {site.address.city}</span>
              </a>
            ) : (
            <iframe
              title={`Mapa: ${site.address.street}, ${site.address.city}`}
              src={site.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[360px] w-full border-0 md:h-[440px]"
            />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
