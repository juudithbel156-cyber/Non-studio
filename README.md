# Juguettos Martorell — experiencia web 3D

Web de una sola página para **Juguettos Martorell** (Carrer Josep Pla, 10-12 · 08760 Martorell · 930 17 24 00) con una escena 3D real en la portada: una habitación de juguetes por la que la cámara viaja al hacer scroll y cuyos juguetes reaccionan al ratón y al clic.

## Ejecutar

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # versión de producción en /dist
npm run preview   # sirve /dist en http://localhost:4173
```

El contenido de `/dist` se puede publicar en cualquier hosting estático (Netlify, Vercel, GitHub Pages, Hostinger…).

## Dirección artística

- **Concepto:** "entrar en la tienda". La portada es un interior de juguetería en 3D con la identidad azul; al hacer scroll la cámara se acerca y se asoma a la caja de juguetes, y la escena se funde con la sección de la tienda.
- **Color:** azul corporativo como "noche" del escenario, rojo y amarillo como acentos (botones, destellos, juguetes), contenido sobre blanco y azul nube.
- **Tipografía:** Baloo 2 (titulares, redondeada y amable) + Nunito (texto).
- **Movimiento:** un único gran momento (el viaje de cámara); el resto de animaciones son sobrias y responden al usuario (inclinación 3D de tarjetas, apertura de categorías).

## Arquitectura

| Carpeta | Contenido |
|---|---|
| `src/config/site.ts` | Dirección, teléfono, horario, redes sociales, logotipo, mapa |
| `src/content/*.ts` | Equipo, categorías, marcas, novedades, servicios, fotos de la tienda |
| `src/i18n/` | Textos de la interfaz en español y catalán (`?lang=ca` o selector ES/CA) |
| `src/three/` | Escenas 3D (React Three Fiber + Drei) y juguetes modelados en código |
| `src/sections/` | Una sección por archivo (Hero, Store, Team, Toys, Brands, News, Services, Contact) |
| `src/components/` | Cabecera, logotipo, tarjeta 3D, ilustraciones, iconos |

**Tecnologías:** React 18, Vite, TypeScript, Tailwind CSS 4, Three.js, React Three Fiber, Drei, GSAP + ScrollTrigger, Framer Motion, Lenis.

### 3D y rendimiento

- Los juguetes (coche teledirigido, oso, caja de juguetes, piezas de construcción, pelota, cohete, patito, aros apilables, peonza, estrellas) están modelados con geometría en código: no hay modelos pesados que descargar.
- Sombras reales, iluminación ambiental con `Environment`/`Lightformer`, suelo con reflejos (`MeshReflectorMaterial`) en escritorio.
- En móvil: menos objetos, sin reflejos ni sombras dinámicas (sombras de contacto), resolución reducida. `PerformanceMonitor` baja la calidad automáticamente si el equipo no llega.
- Las escenas se pausan fuera de pantalla; la maqueta de la tienda solo se descarga al acercarse.
- Sin WebGL se muestra una versión ilustrada con parallax. Con "reducir movimiento" activado no hay scroll suave, ni viaje de cámara, ni flotación.

### SEO

Metadatos, Open Graph, `hreflang` es/ca, datos estructurados `ToyStore` (LocalBusiness) en `index.html`, `public/robots.txt` y `public/sitemap.xml`. **Sustituye `www.juguettosmartorell.es` por el dominio definitivo** en esos tres archivos y añade `public/og-image.png` (1200×630).

## Contenido pendiente (marcado en la web con etiquetas amarillas)

Nada de esto se ha inventado: todo está identificado como provisional.

1. **Logotipo oficial** → copia el archivo en `public/brand/` y pon su ruta en `site.brand.logoSrc`.
2. **Colores exactos de marca** → tokens en `src/index.css` (`--color-azul`, `--color-rojo`, `--color-amarillo`).
3. **Fotos de la tienda** → `public/images/tienda/` + rutas en `src/content/store.ts`.
4. **Equipo** → nombres, puestos, textos y fotos en `src/content/team.ts` (pon `placeholder: false`).
5. **Horario** → `site.hours` en `src/config/site.ts`.
6. **Redes sociales** → URLs en `site.social` (las vacías no se muestran).
7. **Marcas** → `src/content/brands.ts`; marca `verified: true` solo tras confirmar que la tienda las trabaja. Puedes añadir `logo` y `url`.
8. **Servicios** → `src/content/services.ts`; pon `confirmed: true` al verificar.
9. **Campañas** → `src/content/promos.ts`; añade fechas reales y pon `placeholder: false`.
10. **Imágenes de categorías** (opcional) → campo `image` en `src/content/categories.ts`.
11. **Formulario de contacto** → copia `.env.example` a `.env` y define `VITE_CONTACT_ENDPOINT` (Formspree, Getform o API propia) o `VITE_CONTACT_EMAIL`. Sin configurar, el formulario valida y remite al teléfono.
12. **Textos legales** (aviso legal, privacidad, cookies) → no incluidos; añádelos antes de publicar.
