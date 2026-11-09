export const dict = {
  es: {
    nav: { treatments: 'Tratamientos', about: 'Sobre Hêbê', featured: 'Destacados', contact: 'Contacto', home: 'Inicio' },
    menu: 'Menú', close: 'Cerrar',
    cta: { book: 'Reserva tu tratamiento', discover: 'Descubre nuestros tratamientos', contact: 'Contacta con Hêbê', services: 'Consulta nuestros servicios', call: 'Llamar', shop: 'Comprar online', ask: 'Consultar', back: 'Todos los tratamientos', next: 'Siguiente', write: 'Escribir un email' },
    hero: { title: 'Tu belleza única, cuidada y potenciada', sub: 'Estética y medicina estética en Martorell', scroll: 'Desliza' },
    about: { title: 'Sobre Hêbê', teamTitle: 'El equipo', }, 
    treatments: { title: 'Tratamientos', lead: 'Cuatro universos de cuidado, del rostro al bienestar. Elige uno para ver todos sus tratamientos.' },
    featured: { title: 'Tratamientos destacados', from: 'Precio', duration: 'Duración', priceAsk: 'Precio a consultar' },
    proof: { reviews: 'opiniones en', title: 'Tu momento de belleza y bienestar' },
    book: { title: 'Reserva tu tratamiento', lead: 'Pide cita por teléfono o escríbenos. Te asesoramos para elegir el tratamiento adecuado para ti.', where: 'Dónde estamos', when: 'Horario', how: 'Cómo llegar' },
    footer: { newsletter: 'Suscríbete a nuestra newsletter', email: 'Tu email', join: 'Suscribirme', sent: 'Se abrirá tu correo para confirmar la suscripción con info@hebebyclau.cat.', invalid: 'Revisa el email.', legal: 'Información legal', rights: 'Hêbê by Clau · Martorell' },
    img: 'Imagen 3D provisional',
    cursor: { view: 'Ver', discover: 'Descubrir', explore: 'Explorar' },
  },
  ca: {
    nav: { treatments: 'Tractaments', about: 'Sobre Hêbê', featured: 'Destacats', contact: 'Contacte', home: 'Inici' },
    menu: 'Menú', close: 'Tancar',
    cta: { book: 'Reserva el teu tractament', discover: 'Descobreix els nostres tractaments', contact: 'Contacta amb Hêbê', services: 'Consulta els nostres serveis', call: 'Trucar', shop: 'Comprar en línia', ask: 'Consultar', back: 'Tots els tractaments', next: 'Següent', write: 'Escriure un correu' },
    hero: { title: 'La teva bellesa única, cuidada i potenciada', sub: 'Estètica i medicina estètica a Martorell', scroll: 'Llisca' },
    about: { title: 'Sobre Hêbê', teamTitle: "L'equip" },
    treatments: { title: 'Tractaments', lead: "Quatre universos de cura, del rostre al benestar. Tria'n un per veure'n tots els tractaments." },
    featured: { title: 'Tractaments destacats', from: 'Preu', duration: 'Durada', priceAsk: 'Preu a consultar' },
    proof: { reviews: 'opinions a', title: 'El teu moment de bellesa i benestar' },
    book: { title: 'Reserva el teu tractament', lead: "Demana cita per telèfon o escriu-nos. T'assessorem per triar el tractament adequat per a tu.", where: 'On som', when: 'Horari', how: 'Com arribar-hi' },
    footer: { newsletter: "Subscriu-te a la nostra newsletter", email: 'El teu correu', join: "Subscriure'm", sent: "S'obrirà el teu correu per confirmar la subscripció amb info@hebebyclau.cat.", invalid: 'Revisa el correu.', legal: 'Informació legal', rights: 'Hêbê by Clau · Martorell' },
    img: 'Imatge 3D provisional',
    cursor: { view: 'Veure', discover: 'Descobrir', explore: 'Explorar' },
  },
}
export type Lang = keyof typeof dict
export type Dict = (typeof dict)['es']
