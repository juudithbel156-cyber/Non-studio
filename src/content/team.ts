import type { L } from './types'

/**
 * EQUIPO — fotos reales; `placeholder: true` = falta su biografía.
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
    name: 'Alba Pestaña',
    role: { es: 'Encargada', ca: 'Encarregada' },
    bio: { es: 'Biografía en camino.', ca: 'Biografia en camí.' },
    more: { es: 'Pregúntale en tienda por su juguete favorito.', ca: 'Pregunta-li a la botiga per la seva joguina preferida.' },
    photo: '/images/equipo/persona-1.webp',
    placeholder: true,
  },
  {
    name: 'Nayara Márquez',
    role: { es: 'Dependienta', ca: 'Dependenta' },
    bio: { es: 'Biografía en camino.', ca: 'Biografia en camí.' },
    more: { es: 'Pregúntale en tienda por su juguete favorito.', ca: 'Pregunta-li a la botiga per la seva joguina preferida.' },
    photo: '/images/equipo/persona-2.webp',
    placeholder: true,
  },
  {
    name: 'Sonia Carrera',
    role: { es: 'Segunda encargada', ca: 'Segona encarregada' },
    bio: { es: 'La madre de la tienda: cuando no sabemos qué hacer, la llamamos a ella.', ca: 'La mare de la botiga: quan no sabem què fer, la truquem a ella.' },
    more: { es: 'Pregúntale en tienda por su juguete favorito.', ca: 'Pregunta-li a la botiga per la seva joguina preferida.' },
    photo: '/images/equipo/persona-3.webp',
    placeholder: false,
  },
  {
    name: 'Andreu López',
    role: { es: 'Dependiente', ca: 'Dependent' },
    bio: { es: 'Cada día aparece con una historia más fuerte que la anterior. Si fuera famoso, Javi Hoyos sería millonario.', ca: 'Cada dia apareix amb una història més forta que l’anterior. Si fos famós, en Javi Hoyos seria milionari.' },
    more: { es: 'Pregúntale en tienda por su juguete favorito.', ca: 'Pregunta-li a la botiga per la seva joguina preferida.' },
    photo: '/images/equipo/persona-4.webp',
    placeholder: false,
  },
  {
    name: 'Judith Bel',
    role: { es: 'Dependienta', ca: 'Dependenta' },
    bio: { es: 'Biografía en camino.', ca: 'Biografia en camí.' },
    more: { es: 'Pregúntale en tienda por su juguete favorito.', ca: 'Pregunta-li a la botiga per la seva joguina preferida.' },
    photo: '/images/equipo/persona-5.webp',
    placeholder: true,
  },
]
