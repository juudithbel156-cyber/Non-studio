import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { useState } from 'react'
import { CameraDrift, Composition, Studio } from './StillLife'

export default function HeroScene({ zoom, mobile, reduced, active }: { zoom: React.MutableRefObject<number>; mobile: boolean; reduced: boolean; active: boolean }) {
  const [dpr, setDpr] = useState(mobile ? 1.25 : 1.6)
  const base: [number, number, number] = mobile ? [0.9, 4.6, 14.5] : [-0.9, 2.8, 9.8]
  const look: [number, number, number] = mobile ? [0.6, 4.3, 0] : [-1.8, 1.55, 0]
  return (
    <Canvas shadows={!mobile} dpr={dpr} frameloop={active ? 'always' : 'never'} camera={{ position: base, fov: 30 }} onCreated={({ camera }) => camera.lookAt(...look)} gl={{ antialias: true, powerPreference: 'high-performance' }} aria-hidden>
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <Studio variant="hero" shadows={!mobile} />
      <Composition variant="hero" hq={!mobile} animate={!reduced} />
      {!reduced && <CameraDrift base={base} look={look} zoom={zoom} />}
    </Canvas>
  )
}
