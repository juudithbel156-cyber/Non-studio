import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useI18n } from '../i18n/I18n'
import { useRouter } from '../router'
import { categories, contact } from '../content/site'
import { Logo, Pill } from './ui'
import { gsap } from '../hooks/smoothScroll'

export function Footer() {
  const { t, l } = useI18n()
  const { go } = useRouter()
  const ref = useRef<HTMLElement>(null)
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('[data-fglyph]', { yPercent: 100, duration: 1.4, stagger: 0.07, ease: 'expo.out', scrollTrigger: { trigger: '[data-fword]', start: 'top 95%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email') || '').trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setMsg(t.footer.invalid); return }
    // PENDIENTE: conectar con la herramienta de newsletter del centro
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent('Alta newsletter')}&body=${encodeURIComponent(email)}`
    setMsg(t.footer.sent)
  }

  return (
    <footer ref={ref} className="relative overflow-hidden rounded-t-[40px] bg-bosque text-white md:rounded-t-[64px]">
      <div className="gutter wrap grid gap-12 pb-12 pt-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo light className="h-9" />
          <p className="mt-8 max-w-[24ch] font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.03em]">{t.cta.book}</p>
          <div className="mt-8"><Pill href={`tel:${contact.tel}`} tone="naranja">{contact.phone}</Pill></div>
          <form onSubmit={submit} className="mt-12 max-w-md" noValidate>
            <label htmlFor="nl-email" className="text-[14px] text-white/70">{t.footer.newsletter}</label>
            <div className="mt-3 flex rounded-full bg-white/10 p-1.5 focus-within:bg-white/15">
              <input id="nl-email" name="email" type="email" autoComplete="email" placeholder={t.footer.email} className="h-11 min-w-0 flex-1 bg-transparent px-4 text-[15px] text-white placeholder:text-white/45 focus:outline-none" />
              <button type="submit" className="rounded-full bg-white px-5 text-[14px] font-medium text-bosque hover:bg-melocoton">{t.footer.join}</button>
            </div>
            <p role="status" className="mt-3 min-h-5 text-[13px] text-white/70">{msg}</p>
          </form>
        </div>
        <nav aria-label={t.nav.treatments} className="md:col-span-3 md:col-start-7">
          <p className="mb-4 text-[13px] text-white/50">{t.nav.treatments}</p>
          <ul className="flex flex-col gap-2.5 text-[15px]">
            {categories.map((c) => (
              <li key={c.id}><a href={`#tratamiento-${c.id}`} onClick={(e) => { e.preventDefault(); go({ page: 'cat', id: c.id }, e, l(c.title)) }} className="hover:text-melocoton">{l(c.title)}</a></li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="mb-4 text-[13px] text-white/50">{t.nav.center}</p>
          <address className="flex flex-col gap-2.5 text-[15px] not-italic">
            <span>{contact.street}<br />{contact.city}</span>
            <a href={`tel:${contact.tel}`} className="hover:text-melocoton">{contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="hover:text-melocoton">{contact.email}</a>
            <span className="text-white/70">{l(contact.hours)}</span>
          </address>
        </div>
      </div>
      <p data-fword aria-hidden className="giant gutter wrap flex select-none justify-between overflow-hidden pb-2 pt-[0.12em] text-naranja" style={{ fontSize: 'clamp(6rem, 30vw, 33rem)' }}>
        {['H', 'Ê', 'B', 'Ê'].map((c, i) => <span key={i} data-fglyph className="inline-block">{c}</span>)}
      </p>
      <div className="gutter wrap flex flex-col gap-3 border-t border-white/15 py-6 text-[13px] text-white/60 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} {t.footer.rights}</span>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {contact.legal.map((x) => <li key={x.url}><a href={x.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">{l(x.label)}</a></li>)}
        </ul>
      </div>
    </footer>
  )
}
