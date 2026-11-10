import { useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Lightformer, PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'
import { Cloth, LeatherTag, OliveBranch } from './Objects'

type P = { progress: React.MutableRefObject<number>; mobile: boolean; reduced: boolean; active: boolean }

/** Cámara: parallax con el ratón y, con el scroll, avance hacia la tela ("atravesarla"). */
function Rig({ progress, reduced }: { progress: React.MutableRefObject<number>; reduced: boolean }) {
  const { camera } = useThree()
  useFrame((s, dt) => {
    const p = reduced ? 0 : progress.current
    const tx = s.pointer.x * 0.6 * (1 - p)
    const ty = 0.2 + s.pointer.y * 0.3 * (1 - p)
    const tz = 8 - p * 7.2
    camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, 3, dt)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, 3, dt)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, tz, 3, dt)
    camera.lookAt(0, 0.2, 0)
  })
  return null
}

/**
 * Hero: lienzos de lino colgados que ondean (reaccionan al ratón),
 * la etiqueta NAU de cuero balanceándose y sombras de olivo.
 */
export default function HeroScene({ progress, mobile, reduced, active }: P) {
  const [dpr, setDpr] = useState(mobile ? 1.25 : 1.6)
  return (
    <Canvas shadows dpr={dpr} frameloop={active ? 'always' : 'never'} camera={{ position: [0, 0.2, 8], fov: mobile ? 46 : 34 }} gl={{ antialias: true, powerPreference: 'high-performance' }} aria-hidden>
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <color attach="background" args={['#E3DBCD']} />
      <fog attach="fog" args={['#E3DBCD', 9, 18]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[-6, 6, 6]} intensity={2.4} color="#ffe6c6" castShadow shadow-mapSize={[1536, 1536]} shadow-bias={-0.0006}>
        <orthographicCamera attach="shadow-camera" args={[-8, 8, 8, -8, 0.5, 30]} />
      </directionalLight>
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.2} color="#fff0dd" position={[-5, 4, 5]} scale={[6, 4, 1]} />
        <Lightformer form="rect" intensity={0.8} position={[5, 1, 3]} scale={[4, 6, 1]} />
      </Environment>

      <Rig progress={progress} reduced={reduced} />

      {/* pared del fondo, recibe las sombras */}
      <mesh position={[0, 0, -3]} receiveShadow><planeGeometry args={[40, 20]} /><meshStandardMaterial color="#DDD3C3" roughness={1} /></mesh>
      {/* rama de olivo fuera de plano: su sombra cae sobre la pared y las telas */}
      <OliveBranch position={[-5.2, 3.6, 3.4]} rotation={[0.2, 0.3, -2.3]} scale={1.9} />

      <Cloth w={mobile ? 2.4 : 3} h={6} seg={mobile ? 34 : 54} color="#E9E1D3" position={mobile ? [-0.9, 1, -1.2] : [-2.6, 0.9, -1.4]} wind={reduced ? 0 : 0.9} pointer={!reduced} />
      <Cloth w={mobile ? 2 : 2.4} h={5.4} seg={mobile ? 30 : 46} color="#C9B89D" position={mobile ? [1.3, 1.3, -0.6] : [2.7, 1.2, -0.9]} wind={reduced ? 0 : 1.1} pointer={!reduced} />
      {!mobile && <Cloth w={1.8} h={4.6} seg={36} color="#1E1D1B" position={[0.4, 1.8, -2.2]} wind={reduced ? 0 : 0.7} pointer={!reduced} />}

      <Float speed={reduced ? 0 : 1.2} rotationIntensity={0} floatIntensity={reduced ? 0 : 0.25}>
        <LeatherTag position={mobile ? [0.6, 2.2, 1.2] : [0.3, 3.3, 1.4]} scale={mobile ? 0.7 : 1.05} swing={!reduced} />
      </Float>
    </Canvas>
  )
}
