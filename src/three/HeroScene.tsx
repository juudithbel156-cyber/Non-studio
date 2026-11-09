import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  MeshReflectorMaterial,
  PerformanceMonitor,
} from '@react-three/drei'
import * as THREE from 'three'
import { Ball, BrickStack, Brick, Duck, RCCar, Rocket, SpinTop, StackRings, StarToy, Teddy, ToyBox } from './toys/Toys'
import { C } from './toys/shared'

export type HeroSceneProps = {
  /** Progreso del scroll de la portada (0..1), escrito desde GSAP ScrollTrigger. */
  progress: React.MutableRefObject<number>
  active: boolean
  mobile: boolean
  reduced: boolean
}

const BG = '#10296F'

/* Recorrido de cámara: posiciones y puntos de mira por progreso del scroll */
function useCameraPath(mobile: boolean) {
  return useMemo(() => {
    const z0 = mobile ? 14.5 : 10.5
    const pos = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.6, z0),
      new THREE.Vector3(mobile ? 1.5 : 2.8, 2.3, mobile ? 9.5 : 7.4),
      new THREE.Vector3(1.0, 3.2, 3.0),
      new THREE.Vector3(0, 4.4, 0.4),
    ])
    const look = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, mobile ? 3.3 : 1.15, 0),
      new THREE.Vector3(0, mobile ? 1.6 : 0.9, -0.8),
      new THREE.Vector3(0, 0.6, -2.4),
      new THREE.Vector3(0, 0.4, -2.9),
    ])
    return { pos, look }
  }, [mobile])
}

function CameraRig({ progress, mobile, reduced }: Omit<HeroSceneProps, 'active'>) {
  const { pos, look } = useCameraPath(mobile)
  const target = useRef(new THREE.Vector3(0, 1.15, 0))
  const tmpP = useMemo(() => new THREE.Vector3(), [])
  const tmpL = useMemo(() => new THREE.Vector3(), [])
  const smooth = useRef(0)

  useFrame((state, dt) => {
    const raw = reduced ? 0 : progress.current
    smooth.current = THREE.MathUtils.damp(smooth.current, raw, 4, dt)
    const p = THREE.MathUtils.smootherstep(smooth.current, 0, 1)
    pos.getPoint(p, tmpP)
    look.getPoint(p, tmpL)
    // parallax con el ratón (más suave al final del recorrido)
    const k = (1 - p * 0.7) * (reduced ? 0 : 1)
    tmpP.x += state.pointer.x * 0.7 * k
    tmpP.y += state.pointer.y * 0.35 * k
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, tmpP.x, 5, dt)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, tmpP.y, 5, dt)
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, tmpP.z, 5, dt)
    target.current.lerp(tmpL, 1 - Math.exp(-6 * dt))
    state.camera.lookAt(target.current)
  })
  return null
}

/** Grupo que se inclina hacia el ratón (profundidad diferenciada por capa). */
function PointerLayer({ depth, children, reduced }: { depth: number; children: React.ReactNode; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame((state, dt) => {
    if (reduced) return
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, state.pointer.x * 0.08 * depth, 4, dt)
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, state.pointer.y * 0.12 * depth, 4, dt)
  })
  return <group ref={ref}>{children}</group>
}

/* Fondo de tienda: pared, estanterías y lámparas de aro (como un interior de juguetería) */
function StoreBackdrop({ low, mobile }: { low: boolean; mobile: boolean }) {
  const boxes = useMemo(() => {
    const cols = [C.red, C.yellow, C.sky, C.green, '#F472B6', C.orange, '#FFFFFF']
    const items: { p: [number, number, number]; s: [number, number, number]; c: string }[] = []
    let seed = 7
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    for (const y of [0.9, 2.3, 3.7, 5.1]) {
      for (let x = -13; x < 13; ) {
        const w = 0.5 + rnd() * 0.8
        const h = 0.6 + rnd() * 0.6
        items.push({ p: [x + w / 2, y + h / 2, -10.6], s: [w, h, 0.5], c: cols[Math.floor(rnd() * cols.length)] })
        x += w + 0.08 + rnd() * 0.25
      }
    }
    return items
  }, [])
  const mesh = useRef<THREE.InstancedMesh>(null!)
  useLayoutEffect(() => {
    {
      const m = new THREE.Matrix4()
      const col = new THREE.Color()
      const navy = new THREE.Color('#10296F')
      boxes.forEach((b, i) => {
        m.compose(new THREE.Vector3(...b.p), new THREE.Quaternion(), new THREE.Vector3(...b.s))
        mesh.current.setMatrixAt(i, m)
        mesh.current.setColorAt(i, col.set(b.c).lerp(navy, 0.5))
      })
      mesh.current.instanceMatrix.needsUpdate = true
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
    }
  }, [boxes])

  return (
    <group>
      <mesh position={[0, 6, -11]}>
        <planeGeometry args={[40, 16]} />
        <meshStandardMaterial color="#0C2160" roughness={1} />
      </mesh>
      {[0.85, 2.25, 3.65, 5.05].map((y) => (
        <mesh key={y} position={[0, y, -10.5]}>
          <boxGeometry args={[27, 0.08, 0.9]} />
          <meshStandardMaterial color="#1E3F9E" roughness={0.6} />
        </mesh>
      ))}
      <instancedMesh ref={mesh} args={[undefined, undefined, boxes.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.55} />
      </instancedMesh>
      {/* lámparas de aro */}
      {!mobile && [-5, 0, 5].map((x, i) => (
        <group key={x} position={[x, 7.4, -4.5 - i * 0.4]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.1, 0.06, 12, 64]} />
            <meshStandardMaterial color="#FFF4D6" emissive="#FFE2A8" emissiveIntensity={3} toneMapped={false} />
          </mesh>
        </group>
      ))}
      {!low && <pointLight position={[0, 5.6, -3.5]} intensity={18} distance={14} color="#FFE2A8" />}
    </group>
  )
}

function Floor({ low }: { low: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[60, 60]} />
      {low ? (
        <meshStandardMaterial color="#1A3A99" roughness={0.6} metalness={0.1} />
      ) : (
        <MeshReflectorMaterial
          blur={[320, 90]}
          resolution={512}
          mixBlur={1}
          mixStrength={1.2}
          roughness={0.9}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#18388F"
          metalness={0.4}
          mirror={0}
        />
      )}
    </mesh>
  )
}

function Toys({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  const fs = reduced ? 0 : 1.4
  return (
    <>
      {/* plano medio */}
      <PointerLayer depth={1} reduced={reduced}>
        <ToyBox position={[0, 0, -2.7]} rotation={[0, -0.12, 0]} scale={1.1} />
        <RCCar position={mobile ? [-1.6, 0, 1.6] : [-3.1, 0, 1.1]} rotation={[0, 0.55, 0]} scale={mobile ? 0.8 : 1} />
        <Teddy position={mobile ? [1.7, 0, 0.3] : [3.2, 0, 0.1]} rotation={[0, -0.5, 0]} scale={mobile ? 0.95 : 1.15} />
        <Ball position={[-1.8, 0, -0.6]} radius={0.5} />
        {!mobile && <StackRings position={[-4.8, 0, -1.8]} rotation={[0, 0.3, 0]} />}
        {!mobile && <SpinTop position={[-0.9, 0, 3.4]} scale={0.75} />}
        <BrickStack position={mobile ? [0.6, 0, 3.4] : [1.6, 0, 2.5]} rotation={[0, -0.35, 0]} scale={0.85} />
        <Duck position={mobile ? [-0.9, 0, 4.5] : [2.6, 0, 4.1]} rotation={[0, -1.1, 0]} scale={0.8} />
      </PointerLayer>

      {/* aire: cohete y estrellas */}
      <PointerLayer depth={1.6} reduced={reduced}>
        <Float speed={fs} rotationIntensity={0.25} floatIntensity={reduced ? 0 : 0.9}>
          <Rocket position={mobile ? [1.9, 3.1, -3] : [4.5, 2.2, -2.6]} rotation={[0, 0, -0.32]} scale={mobile ? 0.7 : 0.95} />
        </Float>
        <Float speed={fs} floatIntensity={reduced ? 0 : 1.2}>
          <StarToy position={[-3.4, 3.6, -5]} scale={0.9} />
        </Float>
        <Float speed={fs * 0.8} floatIntensity={reduced ? 0 : 1.2}>
          <StarToy position={[2.6, 4.6, -7]} scale={0.7} color={C.red} />
        </Float>
        {!mobile && (
          <Float speed={fs * 1.1} floatIntensity={reduced ? 0 : 1}>
            <StarToy position={[-6.5, 2.6, -4]} scale={0.6} color={C.sky} />
          </Float>
        )}
      </PointerLayer>

      {/* primer plano: piezas que "salen" de la pantalla al avanzar la cámara */}
      <PointerLayer depth={2.6} reduced={reduced}>
        <Float speed={fs * 0.7} rotationIntensity={0.6} floatIntensity={reduced ? 0 : 0.6}>
          <Brick color={C.yellow} nx={2} nz={2} position={mobile ? [-1.9, 0.9, 8.6] : [-3.3, 0.8, 7.2]} rotation={[0.5, 0.6, 0.3]} />
        </Float>
        <Float speed={fs * 0.9} rotationIntensity={0.8} floatIntensity={reduced ? 0 : 0.8}>
          <StarToy position={mobile ? [1.6, 3.2, 8] : [2.9, 2.9, 6.6]} scale={0.55} />
        </Float>
        <Float speed={fs * 0.8} rotationIntensity={0.5} floatIntensity={reduced ? 0 : 0.7}>
          <Brick color={C.red} nx={2} nz={1} position={mobile ? [1.4, 0.4, 9.4] : [3.6, 0.5, 7.8]} rotation={[-0.4, -0.5, 0.6]} />
        </Float>
      </PointerLayer>
    </>
  )
}

function Lights({ low }: { low: boolean }) {
  return (
    <>
      <hemisphereLight args={['#C9DBFF', '#1B3D9A', 0.75]} />
      <directionalLight
        position={[5, 9, 6]}
        intensity={2.4}
        castShadow={!low}
        shadow-mapSize={[1536, 1536]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      />
      <pointLight position={[-6, 4, 4]} intensity={40} distance={22} color="#FFD27A" />
      <pointLight position={[7, 3, -3]} intensity={30} distance={18} color="#FF6B6B" />
    </>
  )
}

function SceneContents({ progress, mobile, reduced, low }: Omit<HeroSceneProps, 'active'> & { low: boolean }) {
  const { scene } = useThree()
  useMemo(() => {
    scene.background = new THREE.Color(BG)
    scene.fog = new THREE.Fog(BG, 11, 27)
  }, [scene])
  return (
    <>
      <CameraRig progress={progress} mobile={mobile} reduced={reduced} />
      <Lights low={low} />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 6, 4]} rotation={[Math.PI / 2.2, 0, 0]} scale={[12, 4, 1]} />
        <Lightformer form="ring" intensity={2} color="#FFE2A8" position={[-6, 3, 2]} scale={4} />
        <Lightformer form="rect" intensity={1.5} color="#6EA8FF" position={[6, 2, -2]} rotation={[0, -Math.PI / 2, 0]} scale={[8, 3, 1]} />
      </Environment>
      <StoreBackdrop low={low} mobile={mobile} />
      <Floor low={low} />
      {low && <ContactShadows position={[0, 0.01, 0]} opacity={0.55} scale={22} blur={2.4} far={4} frames={1} color="#06143F" />}
      <Toys mobile={mobile} reduced={reduced} />
    </>
  )
}

export default function HeroScene({ progress, active, mobile, reduced }: HeroSceneProps) {
  const [low, setLow] = useState(mobile)
  const [dpr, setDpr] = useState<number>(mobile ? 1.25 : 1.75)
  return (
    <Canvas
      className="!absolute inset-0"
      shadows={!low}
      dpr={dpr}
      frameloop={active ? 'always' : 'never'}
      camera={{ fov: mobile ? 52 : 40, position: [0, 1.6, mobile ? 14.5 : 10.5], near: 0.1, far: 60 }}
      gl={{ antialias: !mobile, powerPreference: 'high-performance' }}
      aria-hidden
    >
      <PerformanceMonitor onDecline={() => { setDpr(1); setLow(true) }} />
      <SceneContents progress={progress} mobile={mobile} reduced={reduced} low={low} />
    </Canvas>
  )
}
