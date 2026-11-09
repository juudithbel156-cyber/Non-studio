/**
 * Separador ondulado: se coloca dentro de una sección `relative` y dibuja su borde superior
 * en el color de esa misma sección, montado sobre la anterior.
 */
export function Wave({ color, flip = false }: { color: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 z-[1] block h-10 w-full md:h-16"
      style={{ transform: `translateY(-99%) ${flip ? 'scaleX(-1)' : ''}` }}
    >
      <path d="M0 80V46c120-30 240-40 360-22s240 44 360 36 240-50 360-52 240 30 360 30v42Z" fill={color} />
    </svg>
  )
}
