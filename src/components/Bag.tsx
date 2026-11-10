import { useEffect, useRef } from 'react'
import { useCart, formatPrice } from '../store/cart'
import { IMG } from '../assets/images'
import { gsap, stopScroll } from '../hooks/smoothScroll'
import { store } from '../data/store'

/** Bolsa lateral con variantes por talla, cantidades y envío de la consulta a la tienda. */
export function Bag() {
  const { lines, open, setOpen, setQty, remove, total, count, checkoutUrl } = useCart()
  const panel = useRef<HTMLDivElement>(null)
  const veil = useRef<HTMLDivElement>(null)
  useEffect(() => {
    stopScroll(open)
    if (!panel.current || !veil.current) return
    if (open) {
      gsap.set([panel.current, veil.current], { display: 'flex' })
      gsap.fromTo(veil.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
      gsap.fromTo(panel.current, { xPercent: 100 }, { xPercent: 0, duration: 0.8, ease: 'expo.out' })
    } else {
      gsap.to(veil.current, { opacity: 0, duration: 0.4 })
      gsap.to(panel.current, { xPercent: 100, duration: 0.6, ease: 'expo.in', onComplete: () => { if (panel.current && veil.current) { panel.current.style.display = 'none'; veil.current.style.display = 'none' } } })
    }
  }, [open])
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [setOpen])

  return (
    <>
      <div ref={veil} onClick={() => setOpen(false)} className="fixed inset-0 z-[70] hidden bg-negro/40 backdrop-blur-[2px]" aria-hidden />
      <aside ref={panel} role="dialog" aria-modal="true" aria-label="Bolsa" className="fixed inset-y-0 right-0 z-[80] hidden w-full max-w-[460px] flex-col bg-hueso">
        <div className="flex items-center justify-between px-6 py-6">
          <p className="font-serif text-[30px] font-light tracking-[-0.03em]">Bolsa <span className="text-piedra">({count})</span></p>
          <button onClick={() => setOpen(false)} className="meta border-b border-negro">Cerrar</button>
        </div>
        <div className="stitch mx-6 text-cuero" />
        <div className="flex-1 overflow-y-auto px-6 py-4" data-lenis-prevent>
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-start justify-center gap-4">
              <p className="font-serif text-[34px] font-light leading-[1.05] tracking-[-0.03em]">Tu bolsa está vacía.</p>
              <p className="text-[15px] text-piedra">Elige una pieza y su talla en New Arrivals para empezar.</p>
              <a href="#novedades" onClick={() => setOpen(false)} className="btn btn-negro mt-2">Ver New Arrivals</a>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-negro/10">
              {lines.map((l) => (
                <li key={l.id + l.size} className="flex gap-4 py-5">
                  <img src={IMG[l.product.image]} alt="" className="h-28 w-22 shrink-0 object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-serif text-[20px] font-light leading-tight">{l.product.name}</p>
                      <span className="demo shrink-0">Demo</span>
                    </div>
                    <p className="mt-1 text-[13px] text-piedra">{l.product.color} · Talla {l.size}</p>
                    <p className="mt-1 text-[13px]">{formatPrice(l.product.price)}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-negro/20">
                        <button aria-label="Quitar uno" onClick={() => setQty(l.id, l.size, l.qty - 1)} className="h-8 w-8">−</button>
                        <span className="w-6 text-center text-[14px] tabular-nums">{l.qty}</span>
                        <button aria-label="Añadir uno" onClick={() => setQty(l.id, l.size, l.qty + 1)} className="h-8 w-8">+</button>
                      </div>
                      <button onClick={() => remove(l.id, l.size)} className="meta text-piedra underline underline-offset-4 hover:text-negro">Eliminar</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {lines.length > 0 && (
          <div className="border-t border-negro/10 px-6 py-6">
            <div className="flex justify-between text-[15px]"><span>Total</span><span className="tabular-nums">{total === null ? 'Por confirmar' : formatPrice(total)}</span></div>
            <p className="mt-2 text-[13px] leading-relaxed text-piedra">El pago online aún no está activo. Envía tu selección a la tienda y te confirmamos disponibilidad y precio.</p>
            <a href={checkoutUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-cuero mt-5 w-full">Enviar consulta por WhatsApp</a>
            <a href={`tel:${store.tel}`} className="btn btn-linea mt-2 w-full">Llamar a la tienda</a>
          </div>
        )}
      </aside>
    </>
  )
}
