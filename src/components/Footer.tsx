import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useI18n } from '../i18n/I18n'
import { useRouter } from '../router'
import { categories, contact } from '../content/site'
import { Wordmark } from './ui'
import { gsap } from '../hooks/smoothScroll'

export function Footer() {
  const { t, l } = useI18n()
  const { go } = useRouter()
  const ref = useRef<HTMLElement>(null)
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('[data-mark]', { yPercent: 40, opacity: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email') || '').trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setMsg(t.footer.invalid); return }
    // PENDIENTE: conectar con la herramienta de newsletter. Mientras tanto se solicita por correo.
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent('Alta newsletter')}&body=${encodeURIComponent(email)}`
    setMsg(t.footer.sent)
  }

  return (
    <footer ref={ref} className="relative overflow-hidden bg-chocolate text-crema">
      <div className="gutter wrap grid gap-14 pb-10 pt-24 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="h-lg text-crema">{t.book.title}</p>
          <a href={`tel:${contact.tel}`} data-magnetic className="btn btn-light mt-8">{contact.phone}</a>
          <form onSubmit={submit} className="mt-14 max-w-md" noValidate>
            <label htmlFor="nl-email" className="text-[14px] text-crema/70">{t.footer.newsletter}</label>
            <div className="mt-3 flex border-b border-crema/30 focus-within:border-crema">
              <input id="nl-email" name="email" type="email" autoComplete="email" placeholder={t.footer.email} className="h-12 flex-1 bg-transparent text-[16px] text-crema placeholder:text-crema/40 focus:outline-none" />
              <button className="px-2 text-[14px]" type="submit">{t.footer.join}</button>
            </div>
            <p role="status" className="mt-3 min-h-5 text-[13px] text-crema/70">{msg}</p>
          </form>
        </div>
        <nav aria-label="Tratamientos" className="md:col-span-3 md:col-start-7">
          <p className="mb-4 text-[13px] text-crema/50">{t.nav.treatments}</p>
          <ul className="flex flex-col gap-2 text-[16px]">
            {categories.map((c) => (
              <li key={c.id}><a href={`#tratamiento-${c.id}`} onClick={(e) => { e.preventDefault(); go({ page: 'cat', id: c.id }, e, l(c.title)) }} className="hover:text-white">{l(c.title)}</a></li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="mb-4 text-[13px] text-crema/50">{t.nav.contact}</p>
          <address className="flex flex-col gap-2 text-[16px] not-italic">
            <span>{contact.street}<br />{contact.city}</span>
            <a href={`tel:${contact.tel}`} className="hover:text-white">{contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="hover:text-white">{contact.email}</a>
            <span className="text-crema/70">{l(contact.hours)}</span>
          </address>
        </div>
      </div>
      <div data-mark className="gutter wrap pb-6 text-crema/90"><Wordmark size="xl" /></div>
      <div className="gutter wrap flex flex-col gap-3 border-t border-crema/15 py-6 text-[13px] text-crema/60 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} {t.footer.rights}</span>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {contact.legal.map((x) => <li key={x.url}><a href={x.url} target="_blank" rel="noopener noreferrer" className="hover:text-crema">{l(x.label)}</a></li>)}
        </ul>
      </div>
    </footer>
  )
}
