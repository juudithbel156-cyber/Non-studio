import type { L } from './types'

/**
 * EQUIPO — fotos reales; FALTAN nombre, puesto y textos de cada persona.
 * Completa cada ficha y pon `placeholder: false`.
 * Fotos: /public/images/equipo/nombre.webp (vertical 4:5).
 */
export type TeamMember = {
  name: string
  role: L
  bio: L
  more: L
  photo: string
  placeholder: boolean
}

export const team: TeamMember[] = [
  {
    name: 'Nombre pendiente',
    role: { es: 'Equipo Juguettos Martorell', ca: 'Equip Juguettos Martorell' },
    bio: { es: 'Añade aquí una breve presentación.', ca: 'Afegeix aquí una breu presentació.' },
    more: { es: 'Su juguete favorito, qué recomienda o cuánto tiempo lleva en la tienda.', ca: 'La seva joguina preferida, què recomana o quant temps fa que és a la botiga.' },
    photo: '/images/equipo/persona-1.webp',
    placeholder: true,
  },
  {
    name: 'Nombre pendiente',
    role: { es: 'Equipo Juguettos Martorell', ca: 'Equip Juguettos Martorell' },
    bio: { es: 'Añade aquí una breve presentación.', ca: 'Afegeix aquí una breu presentació.' },
    more: { es: 'Su juguete favorito, qué recomienda o cuánto tiempo lleva en la tienda.', ca: 'La seva joguina preferida, què recomana o quant temps fa que és a la botiga.' },
    photo: '/images/equipo/persona-2.webp',
    placeholder: true,
  },
  {
    name: 'Nombre pendiente',
    role: { es: 'Equipo Juguettos Martorell', ca: 'Equip Juguettos Martorell' },
    bio: { es: 'Añade aquí una breve presentación.', ca: 'Afegeix aquí una breu presentació.' },
    more: { es: 'Su juguete favorito, qué recomienda o cuánto tiempo lleva en la tienda.', ca: 'La seva joguina preferida, què recomana o quant temps fa que és a la botiga.' },
    photo: '/images/equipo/persona-3.webp',
    placeholder: true,
  },
  {
    name: 'Nombre pendiente',
    role: { es: 'Equipo Juguettos Martorell', ca: 'Equip Juguettos Martorell' },
    bio: { es: 'Añade aquí una breve presentación.', ca: 'Afegeix aquí una breu presentació.' },
    more: { es: 'Su juguete favorito, qué recomienda o cuánto tiempo lleva en la tienda.', ca: 'La seva joguina preferida, què recomana o quant temps fa que és a la botiga.' },
    photo: '/images/equipo/persona-4.webp',
    placeholder: true,
  },
  {
    name: 'Nombre pendiente',
    role: { es: 'Equipo Juguettos Martorell', ca: 'Equip Juguettos Martorell' },
    bio: { es: 'Añade aquí una breve presentación.', ca: 'Afegeix aquí una breu presentació.' },
    more: { es: 'Su juguete favorito, qué recomienda o cuánto tiempo lleva en la tienda.', ca: 'La seva joguina preferida, què recomana o quant temps fa que és a la botiga.' },
    photo: '/images/equipo/persona-5.webp',
    placeholder: true,
  },
]
