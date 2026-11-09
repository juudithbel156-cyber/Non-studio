import { Logo } from './Logo'
import { useI18n } from '../i18n/I18n'
import { site } from '../config/site'
import { scrollToTarget } from '../hooks/smoothScroll'
import { IconArrowUp } from './Icons'
import { NAV } from './Header'
import { Wave } from './Wave'

const key = { inicio: 'home', tienda: 'store', equipo: 'team', juguetes: 'toys', marcas: 'brands', novedades: 'news', servicios: 'services', contacto: 'contact' } as const

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="relative bg-noche text-white">
      <Wave color="#10296F" flip />
      <div className="container-j grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_auto]">
        <div>
          <Logo size="lg" />
          <p className="mt-5 max-w-[34ch] text-white/70">{site.slogan}.</p>
          <p className="mt-4 text-white/85">{site.address.street} · {site.address.postalCode} {site.address.city}, {site.address.region}</p>
          <a href={`tel:${site.phone.tel}`} className="mt-1 inline-block font-bold text-amarillo">{site.phone.display}</a>
        </div>
        <nav aria-label="Pie de página">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {NAV.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToTarget(id === 'inicio' ? 0 : `#${id}`) }} className="text-white/75 hover:text-white">{t.nav[key[id]]}</a>
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={() => scrollToTarget(0)} className="btn h-fit bg-white/10 text-white hover:bg-white/20"><IconArrowUp size={20} />{t.footer.top}</button>
      </div>
      <div className="border-t border-white/10">
        <p className="container-j py-5 text-sm text-white/50">© {new Date().getFullYear()} {t.footer.rights}</p>
      </div>
    </footer>
  )
}
