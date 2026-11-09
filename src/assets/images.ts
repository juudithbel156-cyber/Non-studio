// Fotografías reales de hebebyclau.cat. Las *-cut son recortes sin fondo.
const m = import.meta.glob('./foto/*.webp', { eager: true, import: 'default' }) as Record<string, string>
export const IMG: Record<string, string> = Object.fromEntries(Object.entries(m).map(([k, v]) => [k.replace('./foto/', '').replace('.webp', ''), v]))
export { default as LOGO } from './logo-original.png'
