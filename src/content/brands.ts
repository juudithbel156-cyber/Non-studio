import type { L } from './types'

/**
 * MARCAS — PENDIENTE DE VERIFICAR.
 * Son ejemplos de fabricantes conocidos del sector. No se afirma su disponibilidad
 * en Juguettos Martorell hasta que `verified` sea true.
 * logo: ruta a /public/brand/marcas/xxx.svg (vacío = nombre en texto).
 */
export type Brand = { name: string; logo: string; url: string; description: L; verified: boolean }

export const brands: Brand[] = [
  { name: 'LEGO', logo: '', url: '', verified: false, description: { es: 'Construcción', ca: 'Construcció' } },
  { name: 'Playmobil', logo: '', url: '', verified: false, description: { es: 'Figuras y escenarios', ca: 'Figures i escenaris' } },
  { name: 'Hasbro', logo: '', url: '', verified: false, description: { es: 'Juegos y figuras', ca: 'Jocs i figures' } },
  { name: 'Mattel', logo: '', url: '', verified: false, description: { es: 'Muñecas y vehículos', ca: 'Nines i vehicles' } },
  { name: 'Famosa', logo: '', url: '', verified: false, description: { es: 'Muñecas', ca: 'Nines' } },
  { name: 'Educa', logo: '', url: '', verified: false, description: { es: 'Puzles y juegos', ca: 'Trencaclosques i jocs' } },
  { name: 'Ravensburger', logo: '', url: '', verified: false, description: { es: 'Puzles y juegos de mesa', ca: 'Trencaclosques i jocs de taula' } },
  { name: 'Clementoni', logo: '', url: '', verified: false, description: { es: 'Educativos', ca: 'Educatius' } },
  { name: 'Fisher-Price', logo: '', url: '', verified: false, description: { es: 'Primera infancia', ca: 'Primera infància' } },
  { name: 'Djeco', logo: '', url: '', verified: false, description: { es: 'Manualidades y juegos', ca: 'Manualitats i jocs' } },
  { name: 'Funko', logo: '', url: '', verified: false, description: { es: 'Coleccionables', ca: 'Col·leccionables' } },
  { name: 'Marca por añadir', logo: '', url: '', verified: false, description: { es: 'Hueco libre', ca: 'Espai lliure' } },
]
