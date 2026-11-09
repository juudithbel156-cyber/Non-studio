# Hêbê by Clau — web premium

Rediseño de [hebebyclau.cat](https://hebebyclau.cat/es): experiencia editorial de belleza de lujo con 3D (Three.js / React Three Fiber), animaciones GSAP + ScrollTrigger, scroll suave con Lenis, cursor personalizado y transiciones entre páginas.

## Ejecutar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # versión de producción en /dist
```

## Estructura

| Archivo | Contenido |
|---|---|
| `src/content/site.ts` | **Todo el contenido real**: contacto, horario, equipo, tratamientos, precios (ES/CA) |
| `src/i18n/dict.ts` | Textos de interfaz en español y catalán |
| `src/three/StillLife.tsx` | Bodegones 3D: frasco de sérum, tarro, esferas de cristal, perlas, pétalos, gotas, hielo |
| `src/sections/` | Hero, Sobre Hêbê, Tratamientos, Destacados, Opiniones, Reserva |
| `src/pages/CategoryPage.tsx` | Página de cada categoría (`#tratamiento-facial`, `-corporal`, `-bienestar`, `-crio`) |
| `src/router.tsx` | Navegación con transición de cortina |
| `src/components/Cursor.tsx` | Cursor: punto + círculo, efecto magnético y etiquetas Ver/Descubrir/Explorar |
| `src/still.tsx` + `still.html` | Herramienta interna para exportar bodegones 3D como imágenes |

## Contenido

Todo el texto comercial viene de la web original y de su ficha de Treatwell (nov. 2026). No se han inventado precios, tratamientos, certificaciones ni resultados. Precios publicados: Hydra Hêbê 110 €, Lifting Glow 90 €, Hidratación y luminosidad desde 65 €, Diatermia desde 65 €, Drenantes desde 22 €, Depilación láser desde 19,90 € (mujer) y 24,90 € (hombre).

## Pendiente

1. **Fotografía real**: las imágenes de `src/assets/*.webp` son bodegones 3D provisionales (marcados en la web). Sustitúyelas por fotos del centro con el mismo nombre.
2. **Logotipo** vectorial (ahora es tipográfico, en `src/components/ui.tsx`).
3. **WhatsApp y redes sociales**: la web original no los publica. Rellena `contact.whatsapp` y `contact.social` en `src/content/site.ts`.
4. **Sistema de reservas**: los botones llaman al 650 019 339. Si hay agenda online, cambia los enlaces.
5. **Newsletter**: el formulario abre un correo a info@hebebyclau.cat hasta que se conecte una herramienta de email.
6. Precio de Body Sculpt Drenante: la web original muestra 380 € y una promoción "de 450 € a 320 €" contradictorias; aquí aparece "a consultar" hasta confirmarlo.
