/**
 * DATOS DE LA TIENDA — solo información verificada.
 * Fuente: brief del propietario y perfil público de Instagram @nauessentials.
 */
export const store = {
  name: 'NAU essentials',
  tagline: 'Pensat per a tu', // lema de la etiqueta de cuero de la marca
  street: 'Carrer Pintor Fortuny, 6',
  city: '08760 Martorell, Barcelona',
  phone: '+34 937 76 59 87',
  tel: '+34937765987',
  instagram: { handle: '@nauessentials', url: 'https://www.instagram.com/nauessentials/', dm: 'https://ig.me/m/nauessentials' },
  maps: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Carrer Pintor Fortuny 6, 08760 Martorell, Barcelona'),
  mapsEmbed: 'https://maps.google.com/maps?q=' + encodeURIComponent('Carrer Pintor Fortuny 6, 08760 Martorell') + '&z=17&output=embed',
  /**
   * HORARIO — PENDIENTE de confirmar con la tienda. Sustituye `null` por el texto real,
   * por ejemplo '10:00–13:30 · 17:00–20:30', o 'Cerrado'.
   */
  hours: [
    { day: 'Lunes', h: null as string | null },
    { day: 'Martes', h: null as string | null },
    { day: 'Miércoles', h: null as string | null },
    { day: 'Jueves', h: null as string | null },
    { day: 'Viernes', h: null as string | null },
    { day: 'Sábado', h: null as string | null },
    { day: 'Domingo', h: null as string | null },
  ],
}
