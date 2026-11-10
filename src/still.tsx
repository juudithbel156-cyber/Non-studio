/** Herramienta interna: exporta los bodegones 3D como imágenes provisionales. */
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { CAM, StillScene, type StillId } from './three/Stills'

const id = (new URLSearchParams(location.search).get('v') || 'lino') as StillId
const c = CAM[id] ?? CAM.default
function Ready() {
  const n = useRef(0)
  useFrame(() => { if (++n.current === 3) setTimeout(() => { document.title = 'ready' }, 8000) })
  return null
}
document.fonts.ready.then(() => {
  createRoot(document.getElementById('root')!).render(
    <Canvas shadows dpr={1} gl={{ preserveDrawingBuffer: true, antialias: true }} camera={{ position: c.pos, fov: c.fov }} onCreated={({ camera }) => camera.lookAt(...c.look)}>
      <StillScene id={id} />
      <Ready />
    </Canvas>,
  )
})
