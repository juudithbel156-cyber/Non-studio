import { motion } from 'framer-motion'
import { useI18n } from '../i18n/I18n'
import { brands } from '../content/brands'
import { SectionHead } from '../components/Reveal'

const hues = ['#1B3D9A', '#E52421', '#0E9F6E', '#7C3AED', '#F59E0B', '#0EA5E9']

export function Brands() {
  const { t, l } = useI18n()
  return (
    <section id="marcas" aria-labelledby="marcas-title" className="relative overflow-hidden bg-white py-28 md:py-36">
      <div className="container-j">
        <SectionHead id="marcas-title" title={t.brands.title} lead={t.brands.lead} />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {brands.map((b, i) => {
            const Tag = b.url ? 'a' : 'div'
            return (
              <motion.li
                key={b.name + i}
                initial={{ opacity: 0, scale: 0.9, rotateY: -25 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.7, delay: (i % 4) * 0.06 }}
                style={{ transformPerspective: 800 }}
              >
                <Tag
                  {...(b.url ? { href: b.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group relative flex h-36 flex-col justify-between overflow-hidden rounded-3xl bg-nube p-5 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.2,.9,.25,1.15)] hover:-translate-y-1.5 hover:shadow-[0_24px_40px_-24px_rgba(16,41,111,.5)] md:h-44"
                >
                  <span aria-hidden className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-15 transition-transform duration-700 group-hover:scale-150" style={{ background: hues[i % hues.length] }} />
                  {b.logo ? (
                    <img src={b.logo} alt={b.name} loading="lazy" className="relative h-12 w-auto max-w-[70%] object-contain" />
                  ) : (
                    <span className="relative font-display text-[1.55rem] font-extrabold leading-none text-tinta">{b.name}</span>
                  )}
                  <span className="relative flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-gris">{l(b.description)}</span>
                    {!b.verified && <span className="pendiente">{t.brands.unverified}</span>}
                  </span>
                </Tag>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
