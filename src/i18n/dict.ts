export const dict = {
  es: {
    nav: { treatments: 'Tratamientos', results: 'Resultados', team: 'Equipo', center: 'El centro', home: 'Inicio' },
    menu: 'Menú', close: 'Cerrar', prev: 'Anterior', next: 'Siguiente',
    cta: { book: 'Reserva tu tratamiento', bookShort: 'Reservar', discover: 'Ver tratamientos', contact: 'Contacta con Hêbê', services: 'Consulta nuestros servicios', call: 'Llamar', shop: 'Comprar online', back: 'Todos los tratamientos', nextCat: 'Siguiente universo', write: 'Escribir un email', open: 'Ver todo' },
    hero: { title: 'Centro médico de estética en Martorell', sub: 'Cada persona tiene una belleza única que merece ser cuidada y potenciada. Tratamientos personalizados con resultados visibles y naturales.' },
    treatments: { title: 'Tratamientos', priceAsk: 'Precio a consultar', more: 'tratamientos' },
    manifesto: { label: 'Sobre Hêbê', text: 'Combinamos conocimientos científicos y técnicas naturales en un espacio pensado para tu confort y tu confianza.' },
    results: { title: 'Resultados reales', lead: 'Antes y después publicados por el centro. Cada piel responde de forma distinta: te lo explicamos en tu primera visita.', drag: 'Arrastra' },
    team: { title: 'Quién te cuida', lead: 'Formación continua, trato cercano y pasión por la belleza natural.' },
    center: { title: 'Ven a vernos', where: 'Dónde estamos', when: 'Horario', how: 'Cómo llegar', proof: 'opiniones en Treatwell' },
    footer: { newsletter: 'Suscríbete a nuestra newsletter', email: 'Tu email', join: 'Suscribirme', sent: 'Se abrirá tu correo para confirmar la suscripción con info@hebebyclau.cat.', invalid: 'Revisa el email.', rights: 'Hêbê by Clau · Martorell' },
    cursor: { view: 'Ver', discover: 'Descubrir', explore: 'Explorar', drag: 'Arrastra' },
  },
  ca: {
    nav: { treatments: 'Tractaments', results: 'Resultats', team: 'Equip', center: 'El centre', home: 'Inici' },
    menu: 'Menú', close: 'Tancar', prev: 'Anterior', next: 'Següent',
    cta: { book: 'Reserva el teu tractament', bookShort: 'Reservar', discover: 'Veure tractaments', contact: 'Contacta amb Hêbê', services: 'Consulta els nostres serveis', call: 'Trucar', shop: 'Comprar en línia', back: 'Tots els tractaments', nextCat: 'Següent univers', write: 'Escriure un correu', open: 'Veure-ho tot' },
    hero: { title: "Centre mèdic d'estètica a Martorell", sub: 'Cada persona té una bellesa única que mereix ser cuidada i potenciada. Tractaments personalitzats amb resultats visibles i naturals.' },
    treatments: { title: 'Tractaments', priceAsk: 'Preu a consultar', more: 'tractaments' },
    manifesto: { label: 'Sobre Hêbê', text: 'Combinem coneixements científics i tècniques naturals en un espai pensat per al teu confort i la teva confiança.' },
    results: { title: 'Resultats reals', lead: "Abans i després publicats pel centre. Cada pell respon de manera diferent: t'ho expliquem a la primera visita.", drag: 'Arrossega' },
    team: { title: 'Qui et cuida', lead: 'Formació contínua, tracte proper i passió per la bellesa natural.' },
    center: { title: "Vine a veure'ns", where: 'On som', when: 'Horari', how: 'Com arribar-hi', proof: 'opinions a Treatwell' },
    footer: { newsletter: 'Subscriu-te a la nostra newsletter', email: 'El teu correu', join: "Subscriure'm", sent: "S'obrirà el teu correu per confirmar la subscripció amb info@hebebyclau.cat.", invalid: 'Revisa el correu.', rights: 'Hêbê by Clau · Martorell' },
    cursor: { view: 'Veure', discover: 'Descobrir', explore: 'Explorar', drag: 'Arrossega' },
  },
}
export type Lang = keyof typeof dict
export type Dict = (typeof dict)['es']
