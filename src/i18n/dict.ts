export const dict = {
  es: {
    nav: { home: 'Inicio', store: 'La tienda', team: 'El equipo', toys: 'Juguetes', brands: 'Marcas', news: 'Novedades', services: 'Servicios', contact: 'Contacto' },
    menu: 'Menú', close: 'Cerrar', call: 'Llamar',
    hero: { cta: 'Descubre nuestra tienda', scroll: 'Desliza para entrar', hint: 'Toca los juguetes' },
    store: { title: 'Una juguetería de las de verdad, en el centro de Martorell', lead: 'En Juguettos Martorell el juego se elige con calma, se toca y se pregunta. Ven a vernos y te ayudamos a encontrar lo que buscas.', where: 'Dónde estamos', how: 'Cómo llegar', photoPending: 'Foto pendiente', drag: 'Arrastra para girar' },
    team: { title: 'Las personas detrás del mostrador', lead: 'Quien te atiende conoce cada pasillo. Este es el equipo de Juguettos Martorell.', pending: 'Falta biografía' },
    toys: { title: 'Encuentra tu forma de jugar', lead: 'Diez mundos de juego. Elige uno y te contamos qué encontrarás en tienda.', open: 'Ver categoría', ask: 'Pregunta por teléfono', visit: 'Cómo llegar', note: 'La disponibilidad cambia a menudo: consúltanos antes de venir.' },
    brands: { title: 'Marcas y fabricantes', lead: 'Espacio preparado para las marcas que trabaja la tienda.', unverified: 'Por verificar' },
    news: { title: 'Novedades y campañas', lead: 'Lo que está pasando en la tienda a lo largo del año.', sample: 'Contenido de ejemplo', drag: 'Desliza' },
    services: { title: 'Servicios', lead: 'Lo que podemos hacer por ti, dentro y fuera de la tienda.', pending: 'Por confirmar' },
    contact: { title: 'Ven a vernos', lead: 'Estamos en Carrer Josep Pla, 10-12. Llámanos o escríbenos.', hours: 'Horario', hoursPending: 'Por confirmar', openMaps: 'Abrir en Google Maps', callUs: 'Llamar al 930 17 24 00', form: 'Escríbenos', name: 'Nombre', email: 'Correo electrónico', phone: 'Teléfono (opcional)', message: 'Mensaje', privacy: 'Acepto que se usen mis datos para responder a esta consulta.', send: 'Enviar mensaje', sending: 'Enviando…', sent: 'Mensaje enviado. Te responderemos lo antes posible.', error: 'No se pudo enviar. Inténtalo de nuevo o llámanos al 930 17 24 00.', notConfigured: 'El formulario aún no tiene destino configurado. Mientras tanto, llámanos al 930 17 24 00.', social: 'Síguenos', socialPending: 'Redes sociales pendientes de configurar', required: 'Campo obligatorio', invalidEmail: 'Revisa el correo electrónico', mailOpened: 'Se ha abierto tu aplicación de correo con el mensaje.' },
    footer: { rights: 'Juguettos Martorell', top: 'Volver arriba' },
  },
  ca: {
    nav: { home: 'Inici', store: 'La botiga', team: "L'equip", toys: 'Joguines', brands: 'Marques', news: 'Novetats', services: 'Serveis', contact: 'Contacte' },
    menu: 'Menú', close: 'Tancar', call: 'Trucar',
    hero: { cta: 'Descobreix la nostra botiga', scroll: 'Llisca per entrar', hint: 'Toca les joguines' },
    store: { title: 'Una joguineria de les de veritat, al centre de Martorell', lead: "A Juguettos Martorell el joc es tria amb calma, es toca i es pregunta. Vine a veure'ns i t'ajudem a trobar el que busques.", where: 'On som', how: 'Com arribar', photoPending: 'Foto pendent', drag: 'Arrossega per girar' },
    team: { title: 'Les persones darrere el taulell', lead: "Qui t'atén coneix cada passadís. Aquest és l'equip de Juguettos Martorell.", pending: 'Falta biografia' },
    toys: { title: 'Troba la teva manera de jugar', lead: "Deu mons de joc. Tria'n un i t'expliquem què trobaràs a la botiga.", open: 'Veure categoria', ask: 'Pregunta per telèfon', visit: 'Com arribar', note: "La disponibilitat canvia sovint: consulta'ns abans de venir." },
    brands: { title: 'Marques i fabricants', lead: 'Espai preparat per a les marques que treballa la botiga.', unverified: 'Per verificar' },
    news: { title: 'Novetats i campanyes', lead: "El que passa a la botiga al llarg de l'any.", sample: "Contingut d'exemple", drag: 'Llisca' },
    services: { title: 'Serveis', lead: 'El que podem fer per tu, dins i fora de la botiga.', pending: 'Per confirmar' },
    contact: { title: "Vine a veure'ns", lead: "Som al Carrer Josep Pla, 10-12. Truca'ns o escriu-nos.", hours: 'Horari', hoursPending: 'Per confirmar', openMaps: 'Obrir a Google Maps', callUs: 'Trucar al 930 17 24 00', form: "Escriu-nos", name: 'Nom', email: 'Correu electrònic', phone: 'Telèfon (opcional)', message: 'Missatge', privacy: "Accepto que s'utilitzin les meves dades per respondre aquesta consulta.", send: 'Enviar missatge', sending: 'Enviant…', sent: 'Missatge enviat. Et respondrem al més aviat possible.', error: "No s'ha pogut enviar. Torna-ho a provar o truca'ns al 930 17 24 00.", notConfigured: "El formulari encara no té destinació configurada. Mentrestant, truca'ns al 930 17 24 00.", social: 'Segueix-nos', socialPending: 'Xarxes socials pendents de configurar', required: 'Camp obligatori', invalidEmail: 'Revisa el correu electrònic', mailOpened: "S'ha obert la teva aplicació de correu amb el missatge." },
    footer: { rights: 'Juguettos Martorell', top: 'Tornar a dalt' },
  },
} as const

export type Lang = keyof typeof dict
export type Dict = (typeof dict)['es']
