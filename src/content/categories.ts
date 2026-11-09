import type { L } from './types'

export type ToyIcon =
  | 'blocks' | 'doll' | 'car' | 'board' | 'baby' | 'teddy' | 'abc' | 'figure' | 'craft' | 'star'

export type Category = {
  id: string
  title: L
  text: L
  detail: L
  icon: ToyIcon
  color: string
  /** Imagen real opcional (p. ej. '/images/categorias/construccion.webp'). Vacío = ilustración. */
  image: string
}

/** Descripciones genéricas de cada familia de juguete. Sin productos, precios ni disponibilidad. */
export const categories: Category[] = [
  { id: 'construccion', icon: 'blocks', color: '#E52421', image: '',
    title: { es: 'Construcción', ca: 'Construcció' },
    text: { es: 'Piezas, bloques y kits para crear sin límites.', ca: 'Peces, blocs i kits per crear sense límits.' },
    detail: { es: 'Juegos que desarrollan la imaginación, la paciencia y la motricidad fina. Pregúntanos por las propuestas adecuadas para cada edad.', ca: "Jocs que desenvolupen la imaginació, la paciència i la motricitat fina. Pregunta'ns per les propostes adequades per a cada edat." } },
  { id: 'munecas', icon: 'doll', color: '#E2559A', image: '',
    title: { es: 'Muñecas', ca: 'Nines' },
    text: { es: 'Muñecas, accesorios y mundos para inventar historias.', ca: 'Nines, accessoris i mons per inventar històries.' },
    detail: { es: 'El juego simbólico ayuda a expresar emociones y a imaginar. Te orientamos en tienda.', ca: "El joc simbòlic ajuda a expressar emocions i a imaginar. T'orientem a la botiga." } },
  { id: 'vehiculos', icon: 'car', color: '#1B3D9A', image: '',
    title: { es: 'Vehículos', ca: 'Vehicles' },
    text: { es: 'Coches, pistas y radiocontrol para los más rápidos.', ca: 'Cotxes, pistes i radiocontrol per als més ràpids.' },
    detail: { es: 'Desde los primeros coches de arrastre hasta el radiocontrol. Ven a verlos en movimiento.', ca: "Des dels primers cotxes d'arrossegament fins al radiocontrol. Vine a veure'ls en moviment." } },
  { id: 'juegos-de-mesa', icon: 'board', color: '#0E9F6E', image: '',
    title: { es: 'Juegos de mesa', ca: 'Jocs de taula' },
    text: { es: 'Para jugar en familia, con amigos o en equipo.', ca: 'Per jugar en família, amb amics o en equip.' },
    detail: { es: 'Clásicos y novedades para todas las edades. Cuéntanos cuántos jugáis y te recomendamos.', ca: "Clàssics i novetats per a totes les edats. Explica'ns quants jugueu i et recomanem." } },
  { id: 'primera-infancia', icon: 'baby', color: '#F59E0B', image: '',
    title: { es: 'Primera infancia', ca: 'Primera infància' },
    text: { es: 'Juguetes pensados para los primeros años.', ca: 'Joguines pensades per als primers anys.' },
    detail: { es: 'Estímulos, texturas y sonidos para descubrir el mundo. Te ayudamos a elegir según la etapa.', ca: "Estímuls, textures i sons per descobrir el món. T'ajudem a triar segons l'etapa." } },
  { id: 'peluches', icon: 'teddy', color: '#B7773E', image: '',
    title: { es: 'Peluches', ca: 'Peluixos' },
    text: { es: 'Compañeros blanditos para abrazar.', ca: 'Companys tous per abraçar.' },
    detail: { es: 'El regalo que acompaña durante años. Pásate a conocerlos en persona.', ca: 'El regal que acompanya durant anys. Passa a conèixer-los en persona.' } },
  { id: 'educativos', icon: 'abc', color: '#7C3AED', image: '',
    title: { es: 'Juegos educativos', ca: 'Jocs educatius' },
    text: { es: 'Aprender jugando: ciencia, letras, números y lógica.', ca: 'Aprendre jugant: ciència, lletres, números i lògica.' },
    detail: { es: 'Propuestas que convierten la curiosidad en aprendizaje.', ca: "Propostes que converteixen la curiositat en aprenentatge." } },
  { id: 'figuras', icon: 'figure', color: '#0EA5E9', image: '',
    title: { es: 'Figuras y coleccionables', ca: 'Figures i col·leccionables' },
    text: { es: 'Personajes, sets y piezas para coleccionar.', ca: 'Personatges, sets i peces per col·leccionar.' },
    detail: { es: 'Para jugar o para exponer. Pregunta por las colecciones que te interesan.', ca: 'Per jugar o per exposar. Pregunta per les col·leccions que t’interessen.' } },
  { id: 'manualidades', icon: 'craft', color: '#EC4899', image: '',
    title: { es: 'Manualidades', ca: 'Manualitats' },
    text: { es: 'Pintar, modelar, crear y decorar.', ca: 'Pintar, modelar, crear i decorar.' },
    detail: { es: 'Kits creativos para desarrollar la expresión artística en casa.', ca: "Kits creatius per desenvolupar l'expressió artística a casa." } },
  { id: 'fan-zone', icon: 'star', color: '#FFCC00', image: '',
    title: { es: 'Fan Zone', ca: 'Fan Zone' },
    text: { es: 'El rincón de los personajes y sagas favoritas.', ca: 'El racó dels personatges i sagues preferides.' },
    detail: { es: 'Productos de tus universos favoritos. Consulta en tienda qué tenemos ahora mismo.', ca: 'Productes dels teus universos preferits. Consulta a la botiga què tenim ara mateix.' } },
]
