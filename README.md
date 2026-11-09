# Hêbê by Clau — web premium

Rediseño de [hebebyclau.cat](https://hebebyclau.cat/es). Concepto: **belleza en metal líquido**. Tipografía gigante en el naranja del logotipo, fotografía real recortada delante y esculturas 3D de cromo (Three.js) que pasan por delante y por detrás de la foto.

**Colores corporativos** (medidos de los recursos de la marca): naranja `#E45418` (logotipo), melocotón `#FCB484` (símbolo), orquídea `#D07CAC` (fichas de resultados), bosque `#2F4A3E` (rótulo de la fachada).
**Tipografía:** Unbounded (titulares) + Poppins (la fuente de la web original).

## Ejecutar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # versión de producción en /dist
```

## Estructura

| Archivo | Contenido |
|---|---|
| `src/content/site.ts` | Contenido real: contacto, horario, equipo, tratamientos y precios (ES/CA) |
| `src/assets/foto/` | Fotografías de la web original (`*-cut` = recortes sin fondo) |
| `src/three/Chrome.tsx` | Metal líquido (MarchingCubes), foto dentro de la escena 3D, símbolo del logotipo en cromo |
| `src/sections/` | Portada, Tratamientos (banda orquídea con pestañas), Sobre Hêbê, Resultados, Equipo, El centro |
| `src/pages/CategoryPage.tsx` | Página de cada categoría con su color corporativo |
| `src/router.tsx` · `src/components/Cursor.tsx` | Transiciones de cortina y cursor personalizado |

## Pendiente

1. **Logotipo vectorial** (SVG): ahora se usa el PNG de la web.
2. **WhatsApp, redes sociales y reserva online**: la web original no los publica (`contact.whatsapp`, `contact.social`).
3. **Newsletter**: el formulario abre un correo a info@hebebyclau.cat hasta conectar una herramienta de email.
4. **Body Sculpt Drenante**: la web original muestra 380 € y una promoción "de 450 € a 320 €"; aparece "a consultar" hasta confirmarlo.
