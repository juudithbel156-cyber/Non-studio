/** Herramienta interna: renderiza un bodegón 3D a pantalla completa para exportarlo como imagen. */
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Composition, Studio, type Variant } from './three/StillLife'

const q = new URLSearchParams(location.search)
const variant = (q.get('v') || 'facial') as Variant
const CAM: Record<Variant, { pos: [number, number, number]; look: [number, number, number]; fov: number }> = {
  hero: { pos: [2.4, 2.6, 8.6], look: [0.6, 1.3, 0], fov: 30 },
  about: { pos: [1.4, 2.8, 7.8], look: [0, 1.4, 0], fov: 34 },
  facial: { pos: [1.2, 3.0, 7.6], look: [0.1, 1.1, 0], fov: 34 },
  corporal: { pos: [0.9, 2.6, 7.2], look: [0.2, 0.9, 0], fov: 34 },
  bienestar: { pos: [0.6, 3.4, 6.8], look: [0, 0.5, 0], fov: 34 },
  crio: { pos: [0.9, 2.8, 6.8], look: [0.2, 0.9, 0], fov: 34 },
}
function Ready() {
  const n = useRef(0)
  useFrame(() => {
    n.current++
    if (n.current === 3) setTimeout(() => { document.title = 'ready' }, 9000)
  })
  return null
}
const c = CAM[variant]
createRoot(document.getElementById('root')!).render(
  <Canvas shadows dpr={1} gl={{ preserveDrawingBuffer: true, antialias: true }} camera={{ position: c.pos, fov: c.fov }} onCreated={({ camera }) => camera.lookAt(...c.look)}>
    <Studio variant={variant} />
    <Composition variant={variant} hq animate={false} />
    <Ready />
  </Canvas>,
)
