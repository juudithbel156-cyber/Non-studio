import type { L } from './types'

/**
 * EQUIPO — CONTENIDO PROVISIONAL.
 * Sustituye cada ficha por los datos reales y pon `placeholder: false`.
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
    name: 'Nombre y apellido',
    role: { es: 'Responsable de tienda', ca: 'Responsable de botiga' },
    bio: { es: 'Breve presentación de la persona.', ca: 'Breu presentació de la persona.' },
    more: { es: 'Su juguete favorito, qué recomienda o cuánto tiempo lleva en el equipo.', ca: "La seva joguina preferida, què recomana o quant temps fa que és a l'equip." },
    photo: '',
    placeholder: true,
  },
  {
    name: 'Nombre y apellido',
    role: { es: 'Asesor/a de juguete', ca: 'Assessor/a de joguina' },
    bio: { es: 'Breve presentación de la persona.', ca: 'Breu presentació de la persona.' },
    more: { es: 'Especialidad: por ejemplo, juegos de mesa o primera infancia.', ca: 'Especialitat: per exemple, jocs de taula o primera infància.' },
    photo: '',
    placeholder: true,
  },
  {
    name: 'Nombre y apellido',
    role: { es: 'Asesor/a de juguete', ca: 'Assessor/a de joguina' },
    bio: { es: 'Breve presentación de la persona.', ca: 'Breu presentació de la persona.' },
    more: { es: 'Un dato curioso o su consejo para elegir un regalo.', ca: 'Una dada curiosa o el seu consell per triar un regal.' },
    photo: '',
    placeholder: true,
  },
  {
    name: 'Nombre y apellido',
    role: { es: 'Atención al cliente', ca: 'Atenció al client' },
    bio: { es: 'Breve presentación de la persona.', ca: 'Breu presentació de la persona.' },
    more: { es: 'Qué es lo que más le gusta de trabajar en la tienda.', ca: "Què és el que més li agrada de treballar a la botiga." },
    photo: '',
    placeholder: true,
  },
]
