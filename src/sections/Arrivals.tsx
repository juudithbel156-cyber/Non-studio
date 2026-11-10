import { useEffect, useMemo, useRef, useState } from 'react'
import { collections, products, SIZES, type Category, type Product, type Size } from '../data/catalog'
import { IMG } from '../assets/images'
import { useCart, formatPrice } from '../store/cart'
import { gsap, stopScroll } from '../hooks/smoothScroll'
import { MaskText } from '../components/ui'
import { store } from '../data/store'

const CATS: Category[] = ['Camisas', 'Vestidos', 'Punto', 'Pantalones', 'Accesorios']

function QuickView({ p, onClose }: { p: Product; onClose: () => void }) {
  const { add } = useCart()
  const [size, setSize] = useState<Size | null>(p.sizes.length === 1 ? p.sizes[0] : null)
  const [warn, setWarn] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    stopScroll(true)
    gsap.fromTo(root.current, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' })
    gsap.from(root.current!.querySelectorAll('[data-q]'), { y: 30, opacity: 0, stagger: 0.06, duration: 0.9, delay: 0.4, ease: 'expo.out' })
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); addEventListener('keydown', k)
    return () => { stopScroll(false); removeEventListener('keydown', k) }
  }, [onClose])
  const ask = `https://wa.me/${store.tel.replace('+', '')}?text=${encodeURIComponent(`Hola NAU, ¿tenéis disponible "${p.name}" (${p.color})${size ? ` en talla ${size}` : ''}?`)}`
  return (
    <div ref={root} role="dialog" aria-modal="true" aria-labelledby="qv-title" className="fixed inset-0 z-[75] grid overflow-y-auto bg-hueso md:grid-cols-2" data-lenis-prevent>
      <div className="relative h-[52svh] md:h-full">
        <img src={IMG[p.image]} alt={p.name} className="h-full w-full object-cover" />
        <span className="demo absolute left-4 top-4">Producto de demostración</span>
      </div>
      <div className="gutter flex flex-col justify-center py-10 md:px-[6vw]">
        <button onClick={onClose} className="meta mb-10 self-start border-b border-negro" data-q>Cerrar</button>
        <p data-q className="meta text-piedra">{p.category} · {p.color}</p>
        <h3 id="qv-title" data-q className="mt-3 font-serif text-[clamp(2.4rem,4.6vw,4.8rem)] font-light leading-[0.95] tracking-[-0.04em]">{p.name}</h3>
        <p data-q className="mt-4 text-[18px]">{formatPrice(p.price)}</p>
        <p data-q className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-negro/70">{p.description}</p>
        <fieldset data-q className="mt-8">
          <legend className="meta mb-3">Talla</legend>
          <div className="flex flex-wrap gap-2">
            {p.sizes.map((s) => (
              <button key={s} onClick={() => { setSize(s); setWarn(false) }} aria-pressed={size === s} className={`h-11 min-w-12 rounded-full border px-4 text-[14px] transition-colors ${size === s ? 'border-negro bg-negro text-hueso' : 'border-negro/25 hover:border-negro'}`}>{s}</button>
            ))}
          </div>
          {warn && <p role="alert" className="mt-3 text-[13px] text-cuero">Elige una talla para añadirla a la bolsa.</p>}
        </fieldset>
        <div data-q className="mt-8 flex flex-wrap gap-2">
          <button onClick={() => { if (!size) { setWarn(true); return } add(p.id, size); onClose() }} className="btn btn-negro">Añadir a la bolsa</button>
          <a href={ask} target="_blank" rel="noopener noreferrer" className="btn btn-linea">Consultar disponibilidad</a>
        </div>
      </div>
    </div>
  )
}

function Card({ p, i, onOpen }: { p: Product; i: number; onOpen: () => void }) {
  return (
    <li data-card className={i % 3 === 1 ? 'md:mt-24' : ''}>
      <button onClick={onOpen} data-cursor="Ver" className="group block w-full text-left">
        <div className="relative aspect-[3/4] overflow-hidden bg-lino">
          <img src={IMG[p.image]} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-suelta)] group-hover:scale-[1.06]" />
          <span className="demo absolute left-3 top-3">Demo</span>
          {/* tallas que aparecen al pasar el ratón */}
          <div className="absolute inset-x-3 bottom-3 flex translate-y-3 flex-wrap gap-1 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {p.sizes.map((s) => <span key={s} className="rounded-full bg-hueso/90 px-2.5 py-1 text-[11px] backdrop-blur">{s}</span>)}
          </div>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <p className="font-serif text-[22px] font-light leading-tight tracking-[-0.02em]">{p.name}</p>
          <p className="shrink-0 text-[13px] text-piedra">{formatPrice(p.price)}</p>
        </div>
        <p className="mt-1 text-[13px] text-piedra">{p.color}</p>
      </button>
    </li>
  )
}

export function Arrivals({ pick, setPick }: { pick: string | null; setPick: (v: string | null) => void }) {
  const [cat, setCat] = useState<Category | 'Todo'>('Todo')
  const [size, setSize] = useState<Size | 'Todas'>('Todas')
  const [open, setOpen] = useState<Product | null>(null)
  const list = useRef<HTMLUListElement>(null)
  const col = collections.find((c) => c.id === pick)

  const items = useMemo(() => products.filter((p) =>
    (cat === 'Todo' || p.category === cat) && (size === 'Todas' || p.sizes.includes(size)) && (!col || col.products.includes(p.id))), [cat, size, col])

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !list.current) return
    gsap.fromTo(list.current.querySelectorAll('[data-card]'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.06, ease: 'expo.out' })
  }, [items])

  const chip = (on: boolean) => `h-9 rounded-full border px-4 text-[13px] transition-colors ${on ? 'border-negro bg-negro text-hueso' : 'border-negro/20 hover:border-negro'}`
  const hasPrices = products.some((p) => p.price !== null)

  return (
    <section id="novedades" aria-labelledby="new-title" className="relative bg-hueso py-28 md:py-40">
      <div className="gutter wrap">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="meta text-cuero">New Arrivals</p>
            <MaskText as="h2" text="Recién llegado a la tienda." className="h-xl mt-5" />
          </div>
          <p className="lead text-piedra md:col-span-4 md:col-start-9">Fichas de demostración para presentar el catálogo. Se sustituirán por las piezas reales de NAU con sus precios y tallas.</p>
        </div>

        {/* filtros */}
        <div className="mt-14 flex flex-col gap-4 border-y border-negro/10 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Categoría">
            {(['Todo', ...CATS] as const).map((c) => <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={chip(cat === c)}>{c}</button>)}
          </div>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Talla">
            <span className="meta mr-1 text-piedra">Talla</span>
            {(['Todas', ...SIZES] as const).map((s) => <button key={s} onClick={() => setSize(s)} aria-pressed={size === s} className={chip(size === s)}>{s}</button>)}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-[13px] text-piedra">
          <span>{items.length} {items.length === 1 ? 'pieza' : 'piezas'}</span>
          {col && <button onClick={() => setPick(null)} className="rounded-full bg-lino px-3 py-1 text-negro">Colección: {col.title} ✕</button>}
          {!hasPrices && <span>· El filtro por precio se activará cuando el catálogo tenga precios.</span>}
        </div>

        {items.length ? (
          <ul ref={list} className="mt-12 grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3 md:gap-x-8">
            {items.map((p, i) => <Card key={p.id} p={p} i={i} onOpen={() => setOpen(p)} />)}
          </ul>
        ) : (
          <div className="mt-16 flex flex-col items-start gap-4">
            <p className="font-serif text-[30px] font-light">No hay piezas con esos filtros.</p>
            <button onClick={() => { setCat('Todo'); setSize('Todas'); setPick(null) }} className="btn btn-negro">Quitar filtros</button>
          </div>
        )}
      </div>
      {open && <QuickView p={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
