import { store } from '../data/store'
import { IMG } from '../assets/images'
import { MaskText } from '../components/ui'

/**
 * Instagram: NO hay conexión con la API (no simulamos un feed real).
 * Mosaico con publicaciones recientes del perfil (descargadas del widget público) que enlaza al perfil original.
 * Para mostrar publicaciones reales, conectar Instagram Basic Display / Graph API (ver README)
 * o sustituir estas imágenes por capturas autorizadas.
 */
const TILES = ['ig-look-3', 'ig-botas', 'ig-look-1', 'ig-fachada', 'ig-look-4', 'ig-look-2']
export function Instagram() {
  return (
    <section aria-labelledby="ig-title" className="relative overflow-hidden bg-hueso pb-28 md:pb-40">
      <div className="gutter wrap">
        <div className="flex flex-col justify-between gap-6 border-t border-negro/10 pt-16 md:flex-row md:items-end">
          <div>
            <p className="meta text-cuero">Instagram</p>
            <MaskText as="h2" text={store.instagram.handle} className="h-lg mt-4" />
          </div>
          <a href={store.instagram.url} target="_blank" rel="noopener noreferrer" data-magnetic className="btn btn-negro self-start md:self-auto">Seguir en Instagram</a>
        </div>
        <ul className="mt-12 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
          {TILES.map((t) => (
            <li key={t}>
              <a href={store.instagram.url} target="_blank" rel="noopener noreferrer" data-cursor="Abrir" className="group relative block aspect-square overflow-hidden">
                <img src={IMG[t]} alt="Publicación de @nauessentials" loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <span className="absolute inset-0 grid place-items-center bg-negro/0 text-[13px] text-hueso opacity-0 transition-all duration-500 group-hover:bg-negro/35 group-hover:opacity-100">Ver perfil</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[12px] text-piedra">Publicaciones recientes de @nauessentials. Toca cualquiera para ver el perfil completo.</p>
      </div>
    </section>
  )
}
