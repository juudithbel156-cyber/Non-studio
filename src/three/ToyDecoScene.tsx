import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import { Ball, BrickStack, Duck, RCCar, Rocket, SpinTop, StackRings, StarToy, Teddy, ToyBox } from './toys/Toys'

const MAP = {
  teddy: Teddy, car: RCCar, rocket: Rocket, ball: Ball, duck: Duck,
  rings: StackRings, top: SpinTop, star: StarToy, box: ToyBox, bricks: BrickStack,
} as const

export type DecoKind = keyof typeof MAP
export type DecoToy = {
  kind: DecoKind
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  color?: string
  /** true = flota en el aire; false = apoyado en el "suelo" con sombra */
  air?: boolean
}

/** Gira suavemente el grupo según el scroll de la página y el ratón. */
function ScrollTurn({ children, reduced }: { children: React.ReactNode; reduced: boolean }) {
  const g = useRef<THREE.Group>(null!)
  useFrame((state, dt) => {
    if (reduced) return
    const target = Math.sin(window.scrollY * 0.0016) * 0.45 + state.pointer.x * 0.25
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, target, 3, dt)
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, -state.pointer.y * 0.08, 3, dt)
  })
  return <group ref={g}>{children}</group>
}

export default function ToyDecoScene({ toys, reduced, active, camZ = 6, shadow = true }: { toys: DecoToy[]; reduced: boolean; active: boolean; camZ?: number; shadow?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      frameloop={active ? 'always' : 'never'}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 1.1, camZ], fov: 34 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.7, 0)}
      aria-hidden
    >
      <hemisphereLight args={['#ffffff', '#9DB6F5', 1.1]} />
      <directionalLight position={[3, 6, 4]} intensity={2.2} />
      <pointLight position={[-4, 2, 3]} intensity={18} distance={14} color="#FFD27A" />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={2.5} position={[0, 5, 5]} rotation={[Math.PI / 3, 0, 0]} scale={[10, 4, 1]} />
        <Lightformer form="ring" intensity={1.5} color="#FFE2A8" position={[-5, 2, 1]} scale={3} />
      </Environment>
      <ScrollTurn reduced={reduced}>
        {toys.map((t, i) => {
          const C = MAP[t.kind] as React.ComponentType<Record<string, unknown>>
          const node = <C position={t.position} rotation={t.rotation} scale={t.scale} {...(t.color ? { color: t.color } : {})} />
          return t.air ? (
            <Float key={i} speed={reduced ? 0 : 1.6} rotationIntensity={0.4} floatIntensity={reduced ? 0 : 0.8}>{node}</Float>
          ) : (
            <group key={i}>{node}</group>
          )
        })}
      </ScrollTurn>
      {shadow && <ContactShadows position={[0, 0, 0]} opacity={0.3} scale={8} blur={2.4} far={2.5} color="#10296F" frames={reduced ? 1 : Infinity} />}
    </Canvas>
  )
}
