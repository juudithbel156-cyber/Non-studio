import { useEffect, useRef, useState, type ComponentType } from 'react'
import { hasWebGL, useInView, usePrefersReducedMotion } from '../hooks/env'
import type { DecoToy } from '../three/ToyDecoScene'

type SceneProps = { toys: DecoToy[]; reduced: boolean; active: boolean; camZ?: number; shadow?: boolean }

// El módulo 3D se descarga una sola vez y solo cuando un decorado se acerca a pantalla
let loader: Promise<ComponentType<SceneProps>> | null = null
const load = () => (loader ??= import('../three/ToyDecoScene').then((m) => m.default))

/**
 * Juguetes 3D decorativos e interactivos (se pueden tocar).
 * Se montan al acercarse a pantalla y se desmontan al alejarse, para no acumular contextos WebGL.
 */
export function ToyDeco({ toys, className = '', camZ, shadow }: { toys: DecoToy[]; className?: string; camZ?: number; shadow?: boolean }) {
  const box = useRef<HTMLDivElement>(null)
  const near = useInView(box, '250px')
  const reduced = usePrefersReducedMotion()
  const [Scene, setScene] = useState<ComponentType<SceneProps> | null>(null)

  useEffect(() => {
    if (!near || Scene || !hasWebGL()) return
    let alive = true
    load().then((S) => alive && setScene(() => S))
    return () => { alive = false }
  }, [near, Scene])

  return (
    <div ref={box} className={className}>
      {Scene && near && <Scene toys={toys} reduced={reduced} active={near} camZ={camZ} shadow={shadow} />}
    </div>
  )
}
