import type { L } from './types'

/**
 * NOVEDADES Y CAMPAÑAS — CONTENIDO DE EJEMPLO.
 * No hay descuentos ni promociones vigentes publicados aquí.
 * Para publicar una campaña real: rellena `dates`, cambia el texto y pon `placeholder: false`.
 */
export type Promo = { id: string; kind: L; title: L; text: L; dates: string; color: string; accent: string; emoji: string; placeholder: boolean }

export const promos: Promo[] = [
  { id: 'novedades', kind: { es: 'Novedades', ca: 'Novetats' }, emoji: '✨', color: '#1B3D9A', accent: '#FFCC00', dates: '', placeholder: true,
    title: { es: 'Lo último en llegar', ca: "L'últim a arribar" },
    text: { es: 'Espacio para presentar los juguetes recién llegados a la tienda.', ca: 'Espai per presentar les joguines acabades d’arribar a la botiga.' } },
  { id: 'navidad', kind: { es: 'Navidad', ca: 'Nadal' }, emoji: '🎄', color: '#B91C1C', accent: '#FDE68A', dates: '', placeholder: true,
    title: { es: 'Campaña de Navidad', ca: 'Campanya de Nadal' },
    text: { es: 'Espacio para la campaña navideña: ideas de regalo, fechas y servicios.', ca: 'Espai per a la campanya de Nadal: idees de regal, dates i serveis.' } },
  { id: 'reyes', kind: { es: 'Reyes', ca: 'Reis' }, emoji: '👑', color: '#6D28D9', accent: '#FFCC00', dates: '', placeholder: true,
    title: { es: 'Cartas a los Reyes', ca: 'Cartes als Reis' },
    text: { es: 'Espacio para la campaña de Reyes Magos.', ca: 'Espai per a la campanya dels Reis d’Orient.' } },
  { id: 'vuelta-al-cole', kind: { es: 'Vuelta al cole', ca: "Tornada a l'escola" }, emoji: '🎒', color: '#0E9F6E', accent: '#FFFFFF', dates: '', placeholder: true,
    title: { es: 'Vuelta al cole', ca: "Tornada a l'escola" },
    text: { es: 'Espacio para la campaña de septiembre.', ca: 'Espai per a la campanya de setembre.' } },
  { id: 'infantil', kind: { es: 'Campaña infantil', ca: 'Campanya infantil' }, emoji: '🎈', color: '#E52421', accent: '#FFCC00', dates: '', placeholder: true,
    title: { es: 'Fechas especiales', ca: 'Dates especials' },
    text: { es: 'Espacio para cumpleaños, Día del Niño u otras campañas.', ca: "Espai per a aniversaris, Dia de l'Infant o altres campanyes." } },
]
