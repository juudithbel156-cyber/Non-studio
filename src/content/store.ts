import type { L } from './types'

/**
 * FOTOGRAFÍAS DE LA TIENDA — añade las rutas reales (carpeta /public/images/tienda).
 * `src: ''` muestra un hueco provisional identificado.
 */
export const storePhotos: { src: string; alt: L; caption: L }[] = [
  { src: '', alt: { es: 'Fachada de Juguettos Martorell' }, caption: { es: 'Fachada', ca: 'Façana' } },
  { src: '', alt: { es: 'Interior de la tienda' }, caption: { es: 'Interior', ca: 'Interior' } },
  { src: '', alt: { es: 'Zona de juegos de mesa' }, caption: { es: 'Pasillos', ca: 'Passadissos' } },
]

/** Pilares de la experiencia de compra (descripciones genéricas, sin datos inventados). */
export const storePillars: { title: L; text: L }[] = [
  {
    title: { es: 'Atención cercana', ca: 'Atenció propera' },
    text: {
      es: 'Te ayudamos a encontrar el juguete adecuado según la edad, los gustos y el momento.',
      ca: "T'ajudem a trobar la joguina adequada segons l'edat, els gustos i el moment.",
    },
  },
  {
    title: { es: 'Especialistas en juguete', ca: 'Especialistes en joguina' },
    text: {
      es: 'Una tienda dedicada solo al juego: construcción, muñecas, juegos de mesa y mucho más.',
      ca: 'Una botiga dedicada només al joc: construcció, nines, jocs de taula i molt més.',
    },
  },
  {
    title: { es: 'Parte de Juguettos', ca: 'Part de Juguettos' },
    text: {
      es: 'La confianza de una marca juguetera reconocida, con la cercanía de una tienda de barrio.',
      ca: "La confiança d'una marca joguinera reconeguda, amb la proximitat d'una botiga de barri.",
    },
  },
]
