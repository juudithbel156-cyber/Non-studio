import { site } from '../config/site'

/**
 * Logotipo. Si `site.brand.logoSrc` tiene ruta, se usa el logotipo oficial.
 * Si no, se muestra una versión tipográfica PROVISIONAL inspirada en la marca.
 */
export function Logo({ tone = 'light', size = 'md' }: { tone?: 'light' | 'dark'; size?: 'md' | 'lg' }) {
  const h = size === 'lg' ? 'h-14' : 'h-10'
  if (site.brand.logoSrc) {
    return <img src={site.brand.logoSrc} alt="Juguettos Martorell" className={`${h} w-auto`} />
  }
  const main = tone === 'light' ? 'text-white' : 'text-azul'
  return (
    <span className="inline-flex flex-col leading-none" title="Logotipo provisional: sustituir por el oficial en src/config/site.ts">
      <span className={`relative font-display font-extrabold ${main} ${size === 'lg' ? 'text-4xl' : 'text-[1.7rem]'}`}>
        Juguettos
        <svg viewBox="0 0 20 24" className="absolute -right-4 -top-1 h-[0.8em] w-auto" aria-hidden>
          <g stroke="#FFCC00" strokeWidth="3.4" strokeLinecap="round">
            <path d="M4 6l7-4" /><path d="M6 12h9" /><path d="M4 18l7 4" />
          </g>
        </svg>
      </span>
      <span className="mt-0.5 flex items-center gap-1 self-end pr-1 font-display text-[.95rem] font-bold text-amarillo">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden><path fill="#E52421" d="M12 22s-7-6.4-7-12a7 7 0 0 1 14 0c0 5.6-7 12-7 12Z" /><circle cx="12" cy="10" r="2.6" fill="#fff" /></svg>
        Martorell
      </span>
    </span>
  )
}
