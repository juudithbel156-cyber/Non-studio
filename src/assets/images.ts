// Imágenes PROVISIONALES (renders 3D de materiales NAU). Sustituir por fotografía real con el mismo nombre.
const m = import.meta.glob('./img/*.webp', { eager: true, import: 'default' }) as Record<string, string>
export const IMG: Record<string, string> = Object.fromEntries(Object.entries(m).map(([k, v]) => [k.replace('./img/', '').replace('.webp', ''), v]))
