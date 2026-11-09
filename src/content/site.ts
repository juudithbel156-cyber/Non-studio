/**
 * CONTENIDO REAL de Hêbê by Clau (auditado de hebebyclau.cat y su ficha de Treatwell, nov. 2026).
 * Todo lo que no aparece en la web original está marcado como PENDIENTE.
 */
export type L = { es: string; ca: string }
const l = (es: string, ca: string): L => ({ es, ca })

export const SHOP = 'https://hebebyclau.cat/es'

export const contact = {
  name: 'Hêbê by Clau',
  street: 'Avda. Dr. Francesc Massana, 17',
  city: '08760 Martorell (Barcelona)',
  phone: '650 019 339',
  tel: '+34650019339',
  email: 'info@hebebyclau.cat',
  hours: l('Lunes a viernes · 09:30–14:00 y 16:00–20:30', 'Dilluns a divendres · 09:30–14:00 i 16:00–20:30'),
  maps: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Hêbê by Clau, Avinguda Doctor Francesc Massana 17, 08760 Martorell'),
  /** PENDIENTE: la web original no publica WhatsApp. Si existe, pon aquí el número en formato 34XXXXXXXXX. */
  whatsapp: '',
  /** PENDIENTE: la web original no enlaza redes sociales. */
  social: [] as { label: string; url: string }[],
  legal: [
    { label: l('Aviso legal', 'Avís legal'), url: 'https://hebebyclau.cat/es/policies/legal-notice' },
    { label: l('Privacidad', 'Privacitat'), url: 'https://hebebyclau.cat/es/policies/privacy-policy' },
    { label: l('Reembolsos', 'Reemborsaments'), url: 'https://hebebyclau.cat/es/policies/refund-policy' },
    { label: l('Términos del servicio', 'Termes del servei'), url: 'https://hebebyclau.cat/es/policies/terms-of-service' },
  ],
}

export const philosophy = {
  quote: l('Cada persona tiene una belleza única que merece ser cuidada y potenciada.', 'Cada persona té una bellesa única que mereix ser cuidada i potenciada.'),
  text: l(
    'Tratamientos personalizados de estética y medicina estética, pensados para lograr resultados visibles y naturales en un espacio de confort y confianza.',
    "Tractaments personalitzats d'estètica i medicina estètica, pensats per aconseguir resultats visibles i naturals en un espai de confort i confiança.",
  ),
  values: [l('Formación continua', 'Formació contínua'), l('Trato cercano y humano', 'Tracte proper i humà'), l('Pasión por la belleza natural', 'Passió per la bellesa natural')],
  benefits: [
    l('Productos de alta calidad adaptados a tu piel', 'Productes d’alta qualitat adaptats a la teva pell'),
    l('Profesionales con experiencia y dedicación', 'Professionals amb experiència i dedicació'),
    l('Un entorno acogedor que invita a la relajación', 'Un entorn acollidor que convida a la relaxació'),
    l('Tratamientos personalizados con resultados visibles', 'Tractaments personalitzats amb resultats visibles'),
  ],
}

export const team = [
  { name: 'Claudia Rubio', photo: 'claudia', tone: 'naranja', role: l('Directora del centro y terapeuta', 'Directora del centre i terapeuta') },
  { name: 'Marilia Marinho', photo: 'marilia', tone: 'orquidea', role: l('Fisioterapeuta, especialista en criomodelaje. Coordina el equipo', "Fisioterapeuta, especialista en criomodelatge. Coordina l'equip") },
  { name: 'Paola Romero', photo: 'paola', tone: 'bosque', role: l('Técnica en estética: postoperatorios y quiromasaje', 'Tècnica en estètica: postoperatoris i quiromassatge') },
  { name: 'Hana Santiago', photo: 'hana', tone: 'melocoton', role: l('Fotodepilación láser, IPL médica y tratamientos faciales y corporales', 'Fotodepilació làser, IPL mèdica i tractaments facials i corporals') },
  { name: 'Montse', photo: 'montse', tone: 'naranja', role: l('Recepción y asesoría comercial', 'Recepció i assessoria comercial') },
]

export const proof = { rating: '5,0', reviews: 62, source: 'Treatwell', url: 'https://www.treatwell.es/establecimiento/hebe-by-clau/' }

export type Treatment = {
  name: L
  /** clave de foto real en src/assets/foto */
  img?: string
  desc?: L
  benefits?: L[]
  price?: string
  duration?: L
  url?: string
}

export type Category = {
  id: 'facial' | 'corporal' | 'bienestar' | 'crio'
  title: L
  kicker: L
  intro: L
  image: string
  tone: 'naranja' | 'orquidea' | 'melocoton' | 'bosque'
  layout: 'split' | 'full' | 'stack' | 'frost'
  groups: { title: L; intro?: L; items: Treatment[] }[]
}

const P = (path: string) => `https://hebebyclau.cat/es/products/${path}`

export const categories: Category[] = [
  {
    id: 'facial', layout: 'split', image: 'facial', tone: 'naranja',
    title: l('Estética facial y medicina estética', 'Estètica facial i medicina estètica'),
    kicker: l('Rostro', 'Rostre'),
    intro: l('Redefine y rejuvenece tus rasgos de forma sutil y armoniosa, con tratamientos de cabina y de medicina estética.', 'Redefineix i rejoveneix els teus trets de manera subtil i harmoniosa, amb tractaments de cabina i de medicina estètica.'),
    groups: [
      {
        title: l('Estética facial', 'Estètica facial'),
        items: [
          { img: 'facial', name: l('Hydra Hêbê', 'Hydra Hêbê'), url: P('hydra-hebe'), price: '110 €', duration: l('90 min · una sesión', '90 min · una sessió'),
            desc: l('Mejora al instante el aspecto de tu piel. Más limpia, más tersa, más luminosa.', "Millora a l'instant l'aspecte de la teva pell. Més neta, més llisa, més lluminosa."),
            benefits: [l('Reduce poros, puntos negros y grasa', 'Redueix porus, punts negres i greix'), l('Piel más hidratada y rejuvenecida', 'Pell més hidratada i rejovenida')] },
          { img: 'facial-masaje', name: l('Lifting Glow', 'Lifting Glow'), url: P('reafirmant-d-estiu'), price: '90 €', duration: l('80 min', '80 min'),
            desc: l('Ideal para pieles maduras o que buscan firmeza y efecto lifting.', 'Ideal per a pells madures o que busquen fermesa i efecte lifting.'),
            benefits: [l('Limpieza, diatermia y mascarilla de colágeno', 'Neteja, diatèrmia i mascareta de col·lagen'), l('Masaje facial tonificante y sérum tensor', 'Massatge facial tonificant i sèrum tensor')] },
          { name: l('Hidratación y luminosidad', 'Hidratació i lluminositat'), url: P('hidratacio-i-luminositat'), price: 'desde 65 €' },
          { name: l('Mirada perfecta', 'Mirada perfecta'), url: P('mirada-perfecte') },
          { name: l('Rejuvenecedores y reafirmantes', 'Rejovenidors i reafirmants'), url: P('mirada-perfecte-copia') },
        ],
      },
      {
        title: l('Medicina estética', 'Medicina estètica'),
        intro: l('Déjate asesorar por nuestro equipo de especialistas en medicina estética.', "Deixa't assessorar pel nostre equip d'especialistes en medicina estètica."),
        items: [
          { img: 'medicina', name: l('Neuromodulación', 'Neuromodulació'), desc: l('Reduce líneas de expresión y arrugas, aportando a tu rostro una apariencia fresca y rejuvenecida.', "Redueix línies d'expressió i arrugues, i aporta al teu rostre una aparença fresca i rejovenida.") },
          { name: l('Aumento e hidratación de labios', 'Augment i hidratació de llavis'), desc: l('Consigue unos labios definidos, voluminosos y naturales.', 'Aconsegueix uns llavis definits, voluminosos i naturals.') },
          { img: 'medicina-2', name: l('Ácido hialurónico', 'Àcid hialurònic'), desc: l('Restaura el volumen y mejora la simetría de tu rostro.', 'Restaura el volum i millora la simetria del teu rostre.') },
          { name: l('Vitaminas y mesoterapia', 'Vitamines i mesoteràpia'), desc: l('Hidrata y revitaliza tu piel desde el interior.', "Hidrata i revitalitza la teva pell des de l'interior.") },
          { name: l('Peelings químicos', 'Peelings químics'), desc: l('Renueva la piel, eliminando impurezas y aportando luminosidad.', 'Renova la pell, elimina impureses i aporta lluminositat.') },
          { name: l('Manchas en la piel', 'Taques a la pell'), desc: l('Recupera una piel luminosa y uniforme con tratamientos despigmentantes.', 'Recupera una pell lluminosa i uniforme amb tractaments despigmentants.') },
        ],
      },
    ],
  },
  {
    id: 'corporal', layout: 'full', image: 'cuerpo-cut', tone: 'orquidea',
    title: l('Estética corporal, depilación láser y diatermia', 'Estètica corporal, depilació làser i diatèrmia'),
    kicker: l('Cuerpo', 'Cos'),
    intro: l('Hidratación, reafirmación y revitalización para lucir una piel suave, firme y cuidada.', 'Hidratació, reafirmació i revitalització per lluir una pell suau, ferma i cuidada.'),
    groups: [
      {
        title: l('Estética corporal', 'Estètica corporal'),
        intro: l('Tonifica el cuerpo y mejora la circulación con electroestimulación y presoterapia.', 'Tonifica el cos i millora la circulació amb electroestimulació i pressoteràpia.'),
        items: [
          { img: 'corporal', name: l('Body Sculpt Drenante', 'Body Sculpt Drenant'), url: P('body-sculpt-drenant'), duration: l('10 sesiones de I-Model · 25 min', '10 sessions de I-Model · 25 min'),
            desc: l('Para tonificar, reducir volumen y activar el cuerpo sin esfuerzo.', 'Per tonificar, reduir volum i activar el cos sense esforç.'),
            benefits: [l('Abdomen, piernas, glúteos, brazos y espalda', 'Abdomen, cames, glutis, braços i esquena'), l('Mejora de la circulación y activación muscular', 'Millora de la circulació i activació muscular')] },
          { img: 'presoterapia', name: l('Drenantes', 'Drenants'), url: P('drenants'), price: 'desde 22 €' },
          { name: l('Rejuvenecedores y reafirmantes', 'Rejovenidors i reafirmants'), url: P('rejovenidors-i-reafirmants') },
          { name: l('Pack Hêbê Silhouette', 'Pack Hêbê Silhouette'), url: P('hebe-silhouette') },
        ],
      },
      {
        title: l('Depilación láser', 'Depilació làser'),
        items: [
          { img: 'laser', name: l('Depilación láser femenina', 'Depilació làser femenina'), url: P('depilacio-laser-feminina'), price: 'desde 19,90 €' },
          { name: l('Depilación láser masculina', 'Depilació làser masculina'), url: P('depilacio-laser-masculina-1'), price: 'desde 24,90 €' },
        ],
      },
      {
        title: l('Diatermia', 'Diatèrmia'),
        items: [{ name: l('Diatermia', 'Diatèrmia'), url: P('diatermia'), price: 'desde 65 €' }],
      },
    ],
  },
  {
    id: 'bienestar', layout: 'stack', image: 'bienestar', tone: 'melocoton',
    title: l('Topcorpus, masajes y micropigmentación', 'Topcorpus, massatges i micropigmentació'),
    kicker: l('Bienestar', 'Benestar'),
    intro: l('Un entorno acogedor que invita a la relajación, con profesionales con experiencia y dedicación.', 'Un entorn acollidor que convida a la relaxació, amb professionals amb experiència i dedicació.'),
    groups: [
      {
        title: l('Tratamientos', 'Tractaments'),
        items: [
          { name: l('Topcorpus', 'Topcorpus'), url: P('topcorpus') },
          { img: 'bienestar', name: l('Masajes', 'Massatges'), url: P('massatges'), desc: l('Masaje terapéutico y drenaje linfático manual.', 'Massatge terapèutic i drenatge limfàtic manual.') },
          { img: 'consulta', name: l('Micropigmentación', 'Micropigmentació'), url: P('micropgmanetacio'), desc: l('Microblading y micropigmentación.', 'Microblading i micropigmentació.') },
        ],
      },
    ],
  },
  {
    id: 'crio', layout: 'frost', image: 'crio', tone: 'bosque',
    title: l('Crio by Hêbê', 'Crio by Hêbê'),
    kicker: l('Tecnología', 'Tecnologia'),
    intro: l('Tecnología avanzada para tu belleza: tratamientos no invasivos que utilizan el frío controlado.', 'Tecnologia avançada per a la teva bellesa: tractaments no invasius que utilitzen el fred controlat.'),
    groups: [
      {
        title: l('Crio by Hêbê', 'Crio by Hêbê'),
        items: [
          { img: 'cuerpo-cut', name: l('Crio by Hêbê Corporal', 'Crio by Hêbê Corporal'), desc: l('Combina la criolipólisis con tecnologías de nueva generación para moldear la silueta.', 'Combina la criolipòlisi amb tecnologies de nova generació per modelar la silueta.'),
            benefits: [l('No invasivo, con frío controlado', 'No invasiu, amb fred controlat'), l('Reduce la grasa localizada y mejora la textura de la piel', 'Redueix el greix localitzat i millora la textura de la pell')] },
          { img: 'crio', name: l('Crio by Hêbê Facial', 'Crio by Hêbê Facial'), desc: l('Combina el poder del frío con tecnologías especializadas para el rostro.', 'Combina el poder del fred amb tecnologies especialitzades per al rostre.'),
            benefits: [l('Combate la flacidez', 'Combat la flacciditat'), l('Revitaliza la piel y mejora su calidad', 'Revitalitza la pell i en millora la qualitat')] },
        ],
      },
    ],
  },
]

/** Resultados publicados por el centro en su web (fotos reales de antes y después). */
export const results = ['resultado-1', 'resultado-2', 'resultado-3']
