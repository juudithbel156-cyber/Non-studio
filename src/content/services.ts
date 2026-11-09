import type { L } from './types'

/**
 * SERVICIOS — PENDIENTES DE CONFIRMAR con la información oficial de Juguettos
 * y los servicios concretos de la tienda de Martorell. Pon `confirmed: true` al verificar.
 */
export type ServiceIcon = 'chat' | 'gift' | 'list' | 'phone' | 'bag' | 'plus'
export type Service = { icon: ServiceIcon; title: L; text: L; confirmed: boolean }

export const services: Service[] = [
  { icon: 'chat', confirmed: false,
    title: { es: 'Asesoramiento en tienda', ca: 'Assessorament a la botiga' },
    text: { es: 'Te ayudamos a elegir el juguete adecuado para cada edad.', ca: "T'ajudem a triar la joguina adequada per a cada edat." } },
  { icon: 'phone', confirmed: true,
    title: { es: 'Consulta por teléfono', ca: 'Consulta per telèfon' },
    text: { es: 'Llámanos al 930 17 24 00 para cualquier consulta.', ca: "Truca'ns al 930 17 24 00 per a qualsevol consulta." } },
  { icon: 'gift', confirmed: false,
    title: { es: 'Envoltorio de regalo', ca: 'Embolcall de regal' },
    text: { es: 'Servicio por confirmar con la tienda.', ca: 'Servei per confirmar amb la botiga.' } },
  { icon: 'list', confirmed: false,
    title: { es: 'Listas de regalos', ca: 'Llistes de regals' },
    text: { es: 'Servicio por confirmar con la tienda.', ca: 'Servei per confirmar amb la botiga.' } },
  { icon: 'bag', confirmed: false,
    title: { es: 'Compra online y recogida', ca: 'Compra en línia i recollida' },
    text: { es: 'Servicio por confirmar con Juguettos.', ca: 'Servei per confirmar amb Juguettos.' } },
  { icon: 'plus', confirmed: false,
    title: { es: 'Servicio por añadir', ca: 'Servei per afegir' },
    text: { es: 'Hueco libre para otro servicio de la tienda.', ca: 'Espai lliure per a un altre servei de la botiga.' } },
]
