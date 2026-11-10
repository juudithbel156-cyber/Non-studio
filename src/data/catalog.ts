/**
 * CATÁLOGO — CONTENIDO DE DEMOSTRACIÓN.
 * No son productos reales de NAU: sirven para presentar la web.
 * Para publicar el catálogo real, sustituye estos objetos (o conéctalo a Shopify/Stripe:
 * ver README). `price: null` muestra "Precio por confirmar".
 * Imágenes: claves de src/assets/img (renders provisionales hasta tener fotos de NAU).
 */
export type Category = 'Camisas' | 'Vestidos' | 'Punto' | 'Pantalones' | 'Accesorios'
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'Única'] as const
export type Size = (typeof SIZES)[number]

export type Product = {
  id: string
  name: string
  category: Category
  price: number | null
  sizes: Size[]
  color: string
  description: string
  image: string
  demo: true
}

export const products: Product[] = [
  { id: 'demo-01', name: 'Camisa de lino', category: 'Camisas', price: null, sizes: ['S', 'M', 'L'], color: 'Lino crudo', image: 'p-lino', demo: true,
    description: 'Ejemplo de ficha: camisa amplia de lino, perfecta para capas. Sustituir por el producto real.' },
  { id: 'demo-02', name: 'Vestido largo', category: 'Vestidos', price: null, sizes: ['XS', 'S', 'M'], color: 'Negro', image: 'p-negro', demo: true,
    description: 'Ejemplo de ficha: vestido fluido de caída suave. Sustituir por el producto real.' },
  { id: 'demo-03', name: 'Jersey de punto', category: 'Punto', price: null, sizes: ['S', 'M', 'L', 'XL'], color: 'Arena', image: 'p-arena', demo: true,
    description: 'Ejemplo de ficha: punto grueso de tacto suave. Sustituir por el producto real.' },
  { id: 'demo-04', name: 'Pantalón fluido', category: 'Pantalones', price: null, sizes: ['XS', 'S', 'M', 'L'], color: 'Piedra', image: 'p-piedra', demo: true,
    description: 'Ejemplo de ficha: pantalón de pierna ancha. Sustituir por el producto real.' },
  { id: 'demo-05', name: 'Top de ganchillo', category: 'Punto', price: null, sizes: ['S', 'M'], color: 'Hueso', image: 'p-ganchillo', demo: true,
    description: 'Ejemplo de ficha: pieza de ganchillo artesanal. Sustituir por el producto real.' },
  { id: 'demo-06', name: 'Camisa oversize', category: 'Camisas', price: null, sizes: ['M', 'L', 'XL'], color: 'Coñac', image: 'p-cuero', demo: true,
    description: 'Ejemplo de ficha: camisa holgada en tono tostado. Sustituir por el producto real.' },
  { id: 'demo-07', name: 'Cesta de mimbre', category: 'Accesorios', price: null, sizes: ['Única'], color: 'Natural', image: 'cesta', demo: true,
    description: 'Ejemplo de ficha: cesta trenzada a mano. Sustituir por el producto real.' },
  { id: 'demo-08', name: 'Sombrero de paja', category: 'Accesorios', price: null, sizes: ['Única'], color: 'Natural', image: 'sombrero', demo: true,
    description: 'Ejemplo de ficha: sombrero de ala ancha. Sustituir por el producto real.' },
]

/** Colecciones (demostración). */
export const collections = [
  { id: 'lino', title: 'Lino', line: 'Tejidos que respiran, cortes que no aprietan.', image: 'ig-look-3', products: ['demo-01', 'demo-04', 'demo-06'] },
  { id: 'punto', title: 'Punto y ganchillo', line: 'Texturas hechas a mano para las tardes largas.', image: 'ig-look-4', products: ['demo-03', 'demo-05'] },
  { id: 'esenciales', title: 'Esenciales', line: 'Las piezas a las que siempre vuelves.', image: 'ig-look-1', products: ['demo-02', 'demo-04'] },
  { id: 'complementos', title: 'Complementos', line: 'Calzado y complementos para terminar el look.', image: 'ig-botas', products: ['demo-07', 'demo-08'] },
]

/** Lookbook con publicaciones reales de @nauessentials. */
export const lookbook = [
  { image: 'ig-look-3', ratio: 'v' }, { image: 'ig-botas', ratio: 'v' }, { image: 'ig-look-1', ratio: 'v' },
  { image: 'ig-look-4', ratio: 'v' }, { image: 'ig-look-2', ratio: 'v' }, { image: 'etiqueta', ratio: 'v' },
] as const
