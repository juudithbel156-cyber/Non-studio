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
    bio: { es: 'Cada día llega con una enfermedad distinta… y aun así no hay quien la pare. Sus chistes son malísimos, pero los peques se ríen igual (y ella más).', ca: 'Cada dia arriba amb una malaltia diferent… i tot i així no hi ha qui l\'aturi. Els seus acudits són dolentíssims, però els petits riuen igual (i ella encara més).' },
    more: { es: 'Si un niño sale de la tienda riéndose, seguro que Alba le ha contado un chiste. Malo, pero chiste.', ca: 'Si un nen surt rient de la botiga, segur que l\'Alba li ha explicat un acudit. Dolent, però acudit.' },
    photo: '/images/equipo/persona-1.webp',
    placeholder: false,
  },
  {
    name: 'Nayara Márquez',
    role: { es: 'Dependienta', ca: 'Dependenta' },
    bio: { es: 'No se está quieta ni un segundo: si algo brilla en la tienda, es obra suya (el lavabo incluido). Eso sí, no le calientes la cabeza, que tiene la mecha cortita.', ca: 'No s\'està quieta ni un segon: si alguna cosa brilla a la botiga, és obra seva (lavabo inclòs). Això sí, no l\'escalfis gaire, que té la metxa curteta.' },
    more: { es: 'Tiene más energía que una pila recién estrenada. Trátala con cariño y te encuentra el juguete perfecto en un minuto.', ca: 'Té més energia que una pila acabada d\'estrenar. Tracta-la amb carinyo i et troba la joguina perfecta en un minut.' },
    photo: '/images/equipo/persona-2.webp',
    placeholder: false,
  },
  {
    name: 'Sonia Carrera',
    role: { es: 'Segunda encargada', ca: 'Segona encarregada' },
    bio: { es: '¿Que no encontramos algo? Sonia. ¿Que no sabemos montar un coche? Sonia. Es la madre de la tienda y tiene solución para todo (o casi).', ca: 'Que no trobem alguna cosa? La Sonia. Que no sabem muntar un cotxe? La Sonia. És la mare de la botiga i té solució per a tot (o gairebé).' },
    more: { es: 'Tiene línea directa con la solución de cualquier problema. Si no lo sabe ella, no lo sabe nadie.', ca: 'Té línia directa amb la solució de qualsevol problema. Si no ho sap ella, no ho sap ningú.' },
    photo: '/images/equipo/persona-3.webp',
    placeholder: false,
  },
  {
    name: 'Andreu López',
    role: { es: 'Dependiente', ca: 'Dependent' },
    bio: { es: 'Cada día llega con una historia más fuerte que la de ayer. Si fuera famoso, Javi Hoyos sería millonario. Vienes a por un juguete y te llevas un capítulo nuevo gratis.', ca: 'Cada dia arriba amb una història més forta que la d\'ahir. Si fos famós, en Javi Hoyos seria milionari. Véns per una joguina i t\'emportes un capítol nou de regal.' },
    more: { es: 'Pregúntale qué tal el fin de semana… y ponte cómodo.', ca: 'Pregunta-li què tal el cap de setmana… i posa\'t còmode.' },
    photo: '/images/equipo/persona-4.webp',
    placeholder: false,
  },
  {
    name: 'Judith Bel',
    role: { es: 'Dependienta', ca: 'Dependenta' },
    bio: { es: 'Las alarmas son su archienemigo: suena una y se activa el modo pánico. Si te atiende y su voz cambia de tono tres veces en la misma frase, tranquilo, son sus gallos.', ca: 'Les alarmes són la seva enemiga número u: en sona una i s\'activa el mode pànic. Si t\'atén i la veu li canvia de to tres cops en una frase, tranquil: són els seus galls.' },
    more: { es: 'Te atiende con cinco voces distintas por el precio de una.', ca: 'T\'atén amb cinc veus diferents pel preu d\'una.' },
    photo: '/images/equipo/persona-5.webp',
    placeholder: false,
  },
]
