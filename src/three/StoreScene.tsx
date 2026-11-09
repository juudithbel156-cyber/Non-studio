import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, PresentationControls, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { Ball, Brick, Duck, Teddy } from './toys/Toys'
import { C, Plastic } from './toys/shared'

/** Rótulo dibujado en un canvas 2D con la tipografía de la web (sin cargar fuentes 3D). */
function useSignTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 256
    const g = c.getContext('2d')!
    const t = new THREE.CanvasTexture(c)
    const draw = () => {
    g.clearRect(0, 0, c.width, c.height)
    g.fillStyle = C.blue
    g.fillRect(0, 0, c.width, c.height)
    g.fillStyle = '#FFFFFF'
    g.font = '800 150px "Baloo 2", "Nunito", sans-serif'
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.fillText('Juguettos', c.width / 2 - 30, c.height / 2 + 10)
    g.strokeStyle = C.yellow
    g.lineWidth = 16
    g.lineCap = 'round'
    ;[[860, 70, 905, 35], [880, 125, 940, 120], [860, 180, 905, 210]].forEach(([a, b, d, e]) => {
      g.beginPath(); g.moveTo(a, b); g.lineTo(d, e); g.stroke()
    })
    t.needsUpdate = true
    }
    draw()
    document.fonts?.ready.then(draw)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 4
    return t
  }, [])
}

function Awning() {
  const stripes = 10
  return (
    <group position={[0, 2.38, 1.08]} rotation={[0.5, 0, 0]}>
      {Array.from({ length: stripes }).map((_, i) => (
        <mesh key={i} position={[-1.8 + (i + 0.5) * (3.6 / stripes), 0, 0.3]} castShadow>
          <boxGeometry args={[3.6 / stripes, 0.04, 0.7]} />
          <Plastic color={i % 2 ? '#FFFFFF' : C.red} rough={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function Storefront() {
  const sign = useSignTexture()
  const glow = useRef<THREE.MeshStandardMaterial>(null!)
  useFrame((s) => {
    if (glow.current) glow.current.emissiveIntensity = 0.9 + Math.sin(s.clock.elapsedTime * 1.5) * 0.15
  })
  return (
    <group>
      {/* edificio */}
      <RoundedBox args={[4, 3.4, 2]} radius={0.12} smoothness={4} position={[0, 1.7, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#F4F6FC" roughness={0.6} clearcoat={0.2} />
      </RoundedBox>
      {/* rótulo */}
      <mesh position={[0, 2.95, 1.015]}>
        <planeGeometry args={[3.4, 0.85]} />
        <meshStandardMaterial map={sign} roughness={0.4} />
      </mesh>
      <Awning />
      {/* escaparate iluminado */}
      <mesh position={[0, 1.15, 1.01]}>
        <planeGeometry args={[3.3, 1.7]} />
        <meshStandardMaterial ref={glow} color="#FFF2CF" emissive="#FFD98A" emissiveIntensity={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.15, 1.03]}>
        <boxGeometry args={[0.06, 1.7, 0.04]} />
        <Plastic color={C.blue} />
      </mesh>
      <mesh position={[0, 0.27, 1.05]}>
        <boxGeometry args={[3.5, 0.12, 0.2]} />
        <Plastic color={C.blue} />
      </mesh>
      {/* juguetes en el escaparate */}
      <group position={[0, 0.33, 1.25]}>
        <Teddy position={[-0.9, 0, 0]} scale={0.42} rotation={[0, 0.3, 0]} />
        <Ball position={[0.15, 0, 0.05]} radius={0.22} />
        <Brick color={C.red} position={[0.75, 0, 0]} scale={0.6} rotation={[0, 0.4, 0]} />
        <Duck position={[1.25, 0, 0.1]} scale={0.4} rotation={[0, -0.6, 0]} />
      </group>
      {/* acera */}
      <RoundedBox args={[5.2, 0.2, 3.2]} radius={0.06} position={[0, -0.1, 0.4]} receiveShadow>
        <meshStandardMaterial color="#DCE3F5" roughness={0.9} />
      </RoundedBox>
    </group>
  )
}

export default function StoreScene({ active, reduced }: { active: boolean; reduced: boolean }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [4.4, 3.4, 10.2], fov: 32 }}
      aria-hidden
    >
      <color attach="background" args={['#EEF2FF']} />
      <Suspense fallback={null}>
      <hemisphereLight args={['#ffffff', '#BFD0FF', 1.1]} />
      <directionalLight position={[4, 7, 5]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={2.5} position={[0, 5, 5]} rotation={[Math.PI / 3, 0, 0]} scale={[10, 4, 1]} />
      </Environment>
      <PresentationControls
        global={false}
        cursor
        snap
        polar={[-0.1, 0.25]}
        azimuth={[-0.7, 0.7]}
        rotation={[0, -0.35, 0]}
      >
        <Float speed={reduced ? 0 : 1.2} rotationIntensity={0.15} floatIntensity={reduced ? 0 : 0.3}>
          <group position={[0, -1.2, 0]}>
            <Storefront />
          </group>
        </Float>
      </PresentationControls>
      <ContactShadows position={[0, -1.35, 0]} opacity={0.35} scale={12} blur={2.6} far={3} color="#1B3D9A" />
      </Suspense>
    </Canvas>
  )
}
