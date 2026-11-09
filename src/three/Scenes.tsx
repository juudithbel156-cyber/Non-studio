import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { BrandStudio, ChromeSymbol, LiquidMetal, PhotoPlane } from './Chrome'

type P = { progress: React.MutableRefObject<number>; active: boolean; mobile: boolean }

/**
 * Hero: la foto recortada vive dentro de la escena y el metal líquido la atraviesa:
 * unas gotas quedan detrás de ella y otras por delante.
 */
export function HeroScene({ progress, active, mobile, photo }: P & { photo: string }) {
  const [dpr, setDpr] = useState(mobile ? 1.3 : 1.75)
  return (
    <Canvas dpr={dpr} frameloop={active ? 'always' : 'never'} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} camera={{ position: [0, 0, 10], fov: 30 }} aria-hidden>
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <Suspense fallback={null}>
        <BrandStudio />
        {/* detrás de la foto */}
        <LiquidMetal progress={progress} resolution={mobile ? 36 : 60} scale={mobile ? 1.7 : 2.5} position={mobile ? [0.95, 1.75, -1.5] : [-1.9, 0.55, -1.4]} seed={0} />
        <PhotoPlane src={photo} height={mobile ? 3.0 : 4.9} position={mobile ? [0, 0.15, 0] : [0, -0.35, 0]} progress={progress} />
        {/* delante de la foto */}
        <LiquidMetal progress={progress} resolution={mobile ? 30 : 48} scale={mobile ? 1.0 : 1.5} position={mobile ? [1.0, -0.6, 1.3] : [-1.55, -1.35, 1.5]} seed={3.3} count={5} />
      </Suspense>
    </Canvas>
  )
}

export function SymbolScene({ progress, active, mobile }: P) {
  return (
    <Canvas dpr={mobile ? 1.3 : 1.6} frameloop={active ? 'always' : 'never'} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 7.2], fov: 32 }} aria-hidden>
      <Suspense fallback={null}>
        <BrandStudio />
        <ChromeSymbol progress={progress} />
      </Suspense>
    </Canvas>
  )
}

export function BlobScene({ progress, active, mobile }: P) {
  return (
    <Canvas dpr={mobile ? 1.2 : 1.5} frameloop={active ? 'always' : 'never'} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 8], fov: 30 }} aria-hidden>
      <Suspense fallback={null}>
        <BrandStudio />
        <LiquidMetal progress={progress} resolution={mobile ? 30 : 44} scale={2.6} seed={7} count={6} />
      </Suspense>
    </Canvas>
  )
}

export default HeroScene
