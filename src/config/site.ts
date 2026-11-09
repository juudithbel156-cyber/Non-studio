/**
 * CONFIGURACIÓN CENTRAL DE LA TIENDA
 * ---------------------------------------------------------------
 * Datos verificados: dirección y teléfono (publicados oficialmente).
 * Todo lo marcado como `pendiente` debe completarse con datos reales.
 */

export const site = {
  name: 'Juguettos Martorell',
  slogan: 'El mundo de jugar está en Martorell',

  address: {
    street: 'Carrer Josep Pla, 10-12',
    postalCode: '08760',
    city: 'Martorell',
    region: 'Barcelona',
  },

  phone: {
    display: '930 17 24 00',
    tel: '+34930172400',
  },

  /** Abre la ubicación en Google Maps (búsqueda por dirección). */
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Juguettos, Carrer Josep Pla 10-12, 08760 Martorell, Barcelona'),
  mapsEmbed:
    'https://maps.google.com/maps?q=' +
    encodeURIComponent('Carrer Josep Pla 10, 08760 Martorell, Barcelona') +
    '&z=16&output=embed',

  /**
   * HORARIO — PENDIENTE DE CONFIRMAR.
   * Sustituye `hours: null` por el texto real, p. ej. '10:00–13:30 · 17:00–20:30'.
   * Usa 'Cerrado' para días sin apertura.
   */
  hours: [
    { day: 'Lunes', dayCa: 'Dilluns', hours: null as string | null },
    { day: 'Martes', dayCa: 'Dimarts', hours: null as string | null },
    { day: 'Miércoles', dayCa: 'Dimecres', hours: null as string | null },
    { day: 'Jueves', dayCa: 'Dijous', hours: null as string | null },
    { day: 'Viernes', dayCa: 'Divendres', hours: null as string | null },
    { day: 'Sábado', dayCa: 'Dissabte', hours: null as string | null },
    { day: 'Domingo', dayCa: 'Diumenge', hours: null as string | null },
  ],

  /**
   * REDES SOCIALES — configura la URL de cada perfil.
   * Las que queden vacías no se muestran.
   */
  social: [
    { id: 'instagram', label: 'Instagram', url: '' },
    { id: 'facebook', label: 'Facebook', url: '' },
    { id: 'tiktok', label: 'TikTok', url: '' },
    { id: 'whatsapp', label: 'WhatsApp', url: '' },
  ],

  brand: {
    /** Ruta del logotipo oficial, p. ej. '/brand/logo-juguettos.svg'. Vacío = versión tipográfica provisional. */
    logoSrc: '',
  },

  contact: {
    endpoint: import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined,
    email: import.meta.env.VITE_CONTACT_EMAIL as string | undefined,
  },
}
