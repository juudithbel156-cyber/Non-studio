import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { products, type Product, type Size } from '../data/catalog'
import { store } from '../data/store'

export type Line = { id: string; size: Size; qty: number }
type Ctx = {
  lines: (Line & { product: Product })[]
  count: number
  total: number | null
  open: boolean
  setOpen: (v: boolean) => void
  add: (id: string, size: Size) => void
  setQty: (id: string, size: Size, qty: number) => void
  remove: (id: string, size: Size) => void
  checkoutUrl: () => string
}
const C = createContext<Ctx | null>(null)
const KEY = 'nau-bag-v1'

/**
 * Bolsa de consulta.
 * Sin pasarela de pago configurada, "Finalizar" envía la selección por WhatsApp a la tienda.
 * Para pagos reales, sustituir `checkoutUrl` por la creación de un checkout de Shopify
 * (Storefront API: cartCreate → checkoutUrl) o una sesión de Stripe Checkout desde un backend.
 * Ver README → "Conectar pagos".
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<Line[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
  })
  const [open, setOpen] = useState(false)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(raw)) } catch { /* sin almacenamiento */ } }, [raw])

  const lines = useMemo(() => raw.map((l) => ({ ...l, product: products.find((p) => p.id === l.id)! })).filter((l) => l.product), [raw])
  const count = lines.reduce((n, l) => n + l.qty, 0)
  const total = lines.every((l) => l.product.price !== null) ? lines.reduce((n, l) => n + (l.product.price ?? 0) * l.qty, 0) : null

  const add = useCallback((id: string, size: Size) => {
    setRaw((r) => {
      const i = r.findIndex((l) => l.id === id && l.size === size)
      if (i >= 0) return r.map((l, k) => (k === i ? { ...l, qty: l.qty + 1 } : l))
      return [...r, { id, size, qty: 1 }]
    })
    setOpen(true)
  }, [])
  const setQty = useCallback((id: string, size: Size, qty: number) => setRaw((r) => r.map((l) => (l.id === id && l.size === size ? { ...l, qty: Math.max(1, qty) } : l))), [])
  const remove = useCallback((id: string, size: Size) => setRaw((r) => r.filter((l) => !(l.id === id && l.size === size))), [])

  const checkoutUrl = useCallback(() => {
    const body = ['Hola NAU, me interesan estas piezas:', ...lines.map((l) => `· ${l.product.name} (${l.product.color}) — talla ${l.size} × ${l.qty}`), '¿Están disponibles?'].join('\n')
    return `https://wa.me/${store.tel.replace('+', '')}?text=${encodeURIComponent(body)}`
  }, [lines])

  return <C.Provider value={{ lines, count, total, open, setOpen, add, setQty, remove, checkoutUrl }}>{children}</C.Provider>
}
export const useCart = () => { const c = useContext(C); if (!c) throw new Error('cart'); return c }

export const formatPrice = (p: number | null) => (p === null ? 'Precio por confirmar' : new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(p))
