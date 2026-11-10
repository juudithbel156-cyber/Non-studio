# NAU essentials — web

Boutique de moda femenina · Carrer Pintor Fortuny, 6 · 08760 Martorell · +34 937 76 59 87 · [@nauessentials](https://www.instagram.com/nauessentials/)

## Ejecutar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # producción en /dist (hosting estático: Netlify, Vercel, Cloudflare Pages…)
```

> El brief pedía Next.js. Se ha usado **Vite + React + TypeScript** (misma base de componentes) porque la web es una sola página estática. Si se conecta Shopify o Stripe con backend propio, el código se puede mover a Next.js sin reescribir componentes.

## Dirección artística

**"Pensat per a tu"**, el lema de su etiqueta de cuero cosida, es el centro del sistema:
- **La puntada** (líneas de puntos) enmarca, separa y se "cose" al aparecer.
- **Colores medidos** de la foto de perfil de Instagram: cuero `#9A4A12` (único acento), olivo `#4F5A3F`, lino, arena, piedra, hueso y negro profundo.
- **Tipografías:** Fraunces (serif editorial, cursiva en titulares), Hanken Grotesk (texto) y Quicksand para "nau", redondeada como su logotipo en minúsculas.
- **3D (React Three Fiber):** lienzos de lino que ondean y reaccionan al ratón, la etiqueta NAU balanceándose como un péndulo y la sombra de una rama de olivo; la cámara atraviesa las telas al hacer scroll.

## Estructura

| Archivo | Contenido |
|---|---|
| `src/data/store.ts` | Dirección, teléfono, Instagram, **horario (pendiente)** |
| `src/data/catalog.ts` | **Catálogo de demostración**: productos, tallas, colecciones, lookbook |
| `src/store/cart.tsx` | Bolsa (variantes por talla, cantidades, persistencia local) |
| `src/three/` | Escena del hero, objetos 3D (lino, etiqueta, mimbre, paja, ganchillo, olivo) y bodegones |
| `src/sections/` | Hero · The Collection (scroll horizontal) · New Arrivals (filtros + ficha) · The NAU World · Lookbook · Visit Us · Instagram |
| `src/still.tsx` + `still.html` | Herramienta interna que exporta los bodegones 3D como imágenes |

## Pendiente antes de publicar

1. **Fotografías:** portada, colecciones, lookbook, Instagram y fachada usan 6 publicaciones reales de @nauessentials (`src/assets/img/ig-*.webp`). Las fichas de producto siguen con renders de demostración hasta tener fotos de cada prenda.
2. **Catálogo real.** Reemplazar los productos de `catalog.ts` (nombre, precio, tallas, descripción, imagen) y quitar `demo: true`.
3. **Horario** en `store.ts`.
4. **Textos legales** (privacidad, aviso legal, cookies) redactados por el responsable legal.
5. **Texto de "The NAU World"**: propuesta basada en la identidad de la marca, a validar con la propietaria.
6. **Dominio** en `index.html`, `public/robots.txt` y `public/sitemap.xml`.

## Conectar pagos

Hoy la bolsa **no cobra**: envía la selección a la tienda por WhatsApp para confirmar disponibilidad. Para venta online:
- **Shopify (recomendado):** Storefront API → `cartCreate` con las variantes (talla) → redirigir a `checkoutUrl`. Sustituir `checkoutUrl()` en `src/store/cart.tsx` y cargar productos desde Shopify en lugar de `catalog.ts`.
- **Stripe Checkout:** función serverless que cree la sesión con los `price_id` de cada variante; nunca crear precios desde el navegador.

## Instagram

No hay conexión con la API de Instagram: la sección muestra imágenes de la web que enlazan al perfil. Para mostrar publicaciones reales hace falta un token de la Instagram Graph API de la cuenta de NAU (o un widget autorizado).
