import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

/* ------------------------------------------------------------------ */
/* Paleta de materiales                                                */
/* ------------------------------------------------------------------ */
export const PAL = {
  cream: '#EFE6DA',
  sand: '#D8C3A8',
  stone: '#B79E84',
  cocoa: '#4A3328',
  gold: '#C6A06A',
  blush: '#E9C2B2',
  serum: '#E7B985',
  ice: '#E8F1F4',
}

type Q = { hq: boolean }

function Glass({ hq, color = '#ffffff', thickness = 1, roughness = 0.04, chroma = 0.04 }: Q & { color?: string; thickness?: number; roughness?: number; chroma?: number }) {
  // Transmisión física nativa: un único render compartido para todo el cristal de la escena
  return (
    <meshPhysicalMaterial
      color={color}
      transmission={1}
      thickness={thickness}
      roughness={roughness}
      ior={1.5}
      dispersion={hq ? chroma * 40 : 0}
      clearcoat={1}
      clearcoatRoughness={0.05}
      specularIntensity={1}
      envMapIntensity={1.2}
      attenuationColor="#f3e3cf"
      attenuationDistance={4}
    />
  )
}

/* Frasco de sérum con gotero */
export function Bottle({ hq, ...p }: Q & JSX.IntrinsicElements['group']) {
  const glass = useMemo(() => {
    const pts = [[0, 0], [0.5, 0], [0.56, 0.06], [0.58, 1.3], [0.52, 1.52], [0.3, 1.66], [0.22, 1.72], [0.22, 1.86], [0, 1.86]]
    return new THREE.LatheGeometry(pts.map(([x, y]) => new THREE.Vector2(x, y)), 64)
  }, [])
  const liquid = useMemo(() => {
    const pts = [[0, 0.06], [0.48, 0.06], [0.52, 0.12], [0.53, 1.1], [0, 1.1]]
    return new THREE.LatheGeometry(pts.map(([x, y]) => new THREE.Vector2(x, y)), 48)
  }, [])
  return (
    <group {...p}>
      <mesh geometry={glass} castShadow><Glass hq={hq} color="#fff6ec" thickness={0.6} /></mesh>
      <mesh geometry={liquid}><meshPhysicalMaterial color="#D69A5F" roughness={0.12} clearcoat={1} clearcoatRoughness={0.1} sheen={0.4} sheenColor="#ffd9a8" /></mesh>
      {/* collar dorado */}
      <mesh position={[0, 1.95, 0]} castShadow><cylinderGeometry args={[0.27, 0.27, 0.22, 48]} /><meshStandardMaterial color={PAL.gold} metalness={1} roughness={0.22} /></mesh>
      <mesh position={[0, 1.84, 0]}><torusGeometry args={[0.25, 0.025, 12, 48]} /><meshStandardMaterial color={PAL.gold} metalness={1} roughness={0.2} /></mesh>
      {/* pera del gotero */}
      <mesh position={[0, 2.34, 0]} castShadow><capsuleGeometry args={[0.2, 0.42, 12, 32]} /><meshPhysicalMaterial color={PAL.cocoa} roughness={0.55} sheen={0.6} sheenColor="#8b6a58" /></mesh>
    </group>
  )
}

/* Tarro de crema */
export function Jar({ hq, ...p }: Q & JSX.IntrinsicElements['group']) {
  return (
    <group {...p}>
      <mesh position={[0, 0.32, 0]} castShadow><cylinderGeometry args={[0.62, 0.62, 0.64, 64]} /><Glass hq={hq} color="#fffaf3" thickness={1.4} roughness={0.12} /></mesh>
      <mesh position={[0, 0.32, 0]}><cylinderGeometry args={[0.5, 0.5, 0.5, 48]} /><meshPhysicalMaterial color="#F7EFE6" roughness={0.6} sheen={0.4} /></mesh>
      <mesh position={[0, 0.74, 0]} castShadow><cylinderGeometry args={[0.65, 0.65, 0.22, 64]} /><meshStandardMaterial color={PAL.gold} metalness={1} roughness={0.25} /></mesh>
    </group>
  )
}

export function GlassSphere({ hq, r = 0.5, tint = '#ffffff', ...p }: Q & { r?: number; tint?: string } & JSX.IntrinsicElements['mesh']) {
  return (
    <mesh castShadow {...p}>
      <sphereGeometry args={[r, 64, 64]} />
      <Glass hq={hq} color={tint} thickness={r * 2} chroma={0.06} />
    </mesh>
  )
}

export function Pearl({ r = 0.16, ...p }: { r?: number } & JSX.IntrinsicElements['mesh']) {
  return (
    <mesh castShadow {...p}>
      <sphereGeometry args={[r, 48, 48]} />
      <meshPhysicalMaterial color="#F6EFE8" roughness={0.22} iridescence={1} iridescenceIOR={1.6} iridescenceThicknessRange={[200, 700]} sheen={1} sheenColor="#ffffff" clearcoat={1} />
    </mesh>
  )
}

/* Pétalo: forma de lágrima curvada */
function usePetalGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0, 0)
    s.bezierCurveTo(0.42, 0.18, 0.5, 0.82, 0, 1.15)
    s.bezierCurveTo(-0.5, 0.82, -0.42, 0.18, 0, 0)
    const g = new THREE.ShapeGeometry(s, 24)
    const pos = g.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i)
      pos.setZ(i, x * x * 0.9 - Math.sin(y * 2.4) * 0.12)
    }
    g.computeVertexNormals()
    g.translate(0, -0.55, 0)
    return g
  }, [])
}
export function Petal({ color = PAL.blush, ...p }: { color?: string } & JSX.IntrinsicElements['mesh']) {
  const g = usePetalGeometry()
  return (
    <mesh geometry={g} castShadow {...p}>
      <meshPhysicalMaterial color={color} roughness={0.55} sheen={1} sheenColor="#fff4ef" sheenRoughness={0.4} side={THREE.DoubleSide} transmission={0.15} thickness={0.2} />
    </mesh>
  )
}

export function Drop({ hq, s = 0.08, ...p }: Q & { s?: number } & JSX.IntrinsicElements['mesh']) {
  return (
    <mesh scale={[s, s * 0.82, s]} {...p}>
      <sphereGeometry args={[1, 32, 32]} />
      <Glass hq={hq} color="#ffffff" thickness={0.3} chroma={0.02} />
    </mesh>
  )
}

/* Guijarro orgánico */
export function Pebble({ color = PAL.stone, seed = 1, ...p }: { color?: string; seed?: number } & JSX.IntrinsicElements['mesh']) {
  const g = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 64, 48)
    const pos = geo.attributes.position as THREE.BufferAttribute
    const v = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      const n = Math.sin(v.x * 3 + seed) * 0.04 + Math.sin(v.z * 4 + seed * 2) * 0.03 + Math.sin(v.y * 5 + seed * 3) * 0.02
      v.multiplyScalar(1 + n)
      pos.setXYZ(i, v.x, v.y, v.z)
    }
    geo.computeVertexNormals()
    return geo
  }, [seed])
  return (
    <mesh geometry={g} castShadow receiveShadow {...p}>
      <meshPhysicalMaterial color={color} roughness={0.78} sheen={0.3} sheenColor="#fff" />
    </mesh>
  )
}

export function Ice({ hq, ...p }: Q & JSX.IntrinsicElements['group']) {
  return (
    <group {...p}>
      <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.12} smoothness={5} castShadow>
        <Glass hq={hq} color={PAL.ice} thickness={1.2} roughness={0.28} chroma={0.08} />
      </RoundedBox>
    </group>
  )
}

/* Pedestal de yeso */
export function Plinth({ r = 1.2, h = 0.5, color = PAL.sand, ...p }: { r?: number; h?: number; color?: string } & JSX.IntrinsicElements['mesh']) {
  return (
    <mesh castShadow receiveShadow position-y={h / 2} {...p}>
      <cylinderGeometry args={[r, r, h, 96]} />
      <meshStandardMaterial color={color} roughness={0.92} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/* Composiciones                                                        */
/* ------------------------------------------------------------------ */
export type Variant = 'hero' | 'about' | 'facial' | 'corporal' | 'bienestar' | 'crio'

export const BG: Record<Variant, string> = {
  hero: '#EADFD1', about: '#E9DED0', facial: '#EBD8CC', corporal: '#E2D6C6', bienestar: '#E3D9CB', crio: '#E2E9EC',
}

function Floaty({ children, speed = 1, intensity = 0.4, animate }: { children: React.ReactNode; speed?: number; intensity?: number; animate: boolean }) {
  return animate ? <Float speed={speed} rotationIntensity={0.3} floatIntensity={intensity}>{children}</Float> : <>{children}</>
}

export function Composition({ variant, hq, animate }: { variant: Variant; hq: boolean; animate: boolean }) {
  switch (variant) {
    case 'hero':
      return (
        <group>
          <Plinth r={1.35} h={0.55} />
          <Plinth r={0.85} h={1.1} position={[1.9, 0.55, -0.9]} color="#CDB59A" />
          <Bottle hq={hq} position={[0.05, 0.55, 0]} rotation={[0, 0.4, 0]} scale={1.05} />
          <Jar hq={hq} position={[1.9, 1.1, -0.9]} scale={0.8} />
          <Floaty animate={animate} speed={1.2}><GlassSphere hq={hq} r={0.55} position={[-1.35, 2.5, 0.6]} /></Floaty>
          <Floaty animate={animate} speed={0.9}><GlassSphere hq={hq} r={0.3} position={[1.25, 2.9, 0.7]} tint="#fff5ea" /></Floaty>
          <Pearl position={[-0.85, 0.71, 0.75]} />
          <Pearl r={0.11} position={[-0.55, 0.66, 0.95]} />
          <Floaty animate={animate} speed={1.6} intensity={0.8}><Petal position={[-1.9, 1.5, 1.2]} rotation={[0.6, 0.4, 0.8]} scale={0.55} /></Floaty>
          <Floaty animate={animate} speed={1.3} intensity={0.9}><Petal position={[0.9, 1.9, 1.5]} rotation={[-0.5, -0.6, -1.2]} scale={0.45} color="#E4B6A4" /></Floaty>
          <Floaty animate={animate} speed={1.1} intensity={0.7}><Petal position={[2.7, 2.4, 0.4]} rotation={[0.3, 0.9, 2.2]} scale={0.4} /></Floaty>
          <Petal position={[0.9, 0.57, 0.65]} rotation={[-Math.PI / 2 + 0.15, 0, 0.6]} scale={0.42} />
          <Drop hq={hq} position={[-0.3, 0.6, 1.05]} />
          <Drop hq={hq} s={0.05} position={[0.45, 0.59, 1.1]} />
          <Drop hq={hq} s={0.06} position={[1.6, 1.14, -0.3]} />
        </group>
      )
    case 'about':
      return (
        <group>
          <Plinth r={1.1} h={1.4} color="#D6C1A6" />
          <GlassSphere hq={hq} r={0.62} position={[0, 2.02, 0]} />
          <Pearl r={0.2} position={[-0.6, 1.6, 0.6]} />
          <Petal position={[0.5, 1.42, 0.55]} rotation={[-Math.PI / 2 + 0.2, 0, -0.5]} scale={0.5} />
          <Petal position={[-1.4, 0.8, 0.9]} rotation={[0.4, 0.6, 1.4]} scale={0.5} color="#E4B6A4" />
        </group>
      )
    case 'facial':
      return (
        <group>
          <Plinth r={1.3} h={0.4} color="#D9BBA6" />
          <Bottle hq={hq} position={[-0.45, 0.4, -0.1]} rotation={[0, 0.6, 0]} />
          <Jar hq={hq} position={[0.75, 0.4, 0.35]} scale={0.72} />
          <GlassSphere hq={hq} r={0.34} position={[0.25, 0.74, 1.0]} tint="#fff1ea" />
          {[[-1.2, 0.42, 0.8, 0.4], [1.3, 0.42, -0.4, 1.6], [-0.1, 0.43, 1.25, 2.4]].map(([x, y, z, r], i) => (
            <Petal key={i} position={[x, y, z]} rotation={[-Math.PI / 2 + 0.2, 0, r]} scale={0.5} color={i % 2 ? '#E4B6A4' : PAL.blush} />
          ))}
          <Drop hq={hq} position={[0.95, 0.46, 0.95]} />
        </group>
      )
    case 'corporal':
      return (
        <group>
          <Pebble seed={1} scale={[1.2, 0.36, 1.0]} position={[0, 0.34, 0]} color="#B49B82" />
          <Pebble seed={2} scale={[0.85, 0.3, 0.72]} position={[0.1, 0.94, 0.02]} rotation={[0, 0.6, 0.05]} color="#CDB79E" />
          <Pebble seed={3} scale={[0.55, 0.24, 0.48]} position={[0.02, 1.41, 0.05]} rotation={[0, 1.4, -0.06]} color="#8E7663" />
          <GlassSphere hq={hq} r={0.42} position={[1.55, 0.42, 0.4]} />
          <Pebble seed={5} scale={[0.4, 0.22, 0.34]} position={[-1.4, 0.22, 0.6]} color="#CDB79E" />
          <Drop hq={hq} position={[0.25, 1.66, 0.2]} s={0.07} />
          <Drop hq={hq} position={[-0.3, 1.24, 0.5]} s={0.06} />
          <Drop hq={hq} position={[0.6, 0.72, 0.62]} s={0.08} />
        </group>
      )
    case 'bienestar':
      return (
        <group>
          <Plinth r={1.5} h={0.3} color="#CBB59B" />
          <Pebble seed={7} scale={[0.6, 0.38, 0.5]} position={[-0.6, 0.62, 0]} color="#8E7663" />
          <Pebble seed={8} scale={[0.45, 0.3, 0.4]} position={[0.5, 0.55, 0.3]} color="#E0CFBA" />
          <Jar hq={hq} position={[0.4, 0.3, -0.7]} scale={0.6} />
          <Pearl r={0.18} position={[-0.05, 0.48, 0.85]} />
          <Pearl r={0.12} position={[0.25, 0.42, 1.05]} />
          <Petal position={[-1.1, 0.33, 0.9]} rotation={[-Math.PI / 2 + 0.1, 0, 0.9]} scale={0.55} color="#E8D3C2" />
          <Petal position={[1.2, 0.33, 0.6]} rotation={[-Math.PI / 2 + 0.15, 0, 2.5]} scale={0.5} />
        </group>
      )
    case 'crio':
      return (
        <group>
          <Plinth r={1.4} h={0.4} color="#D4DDE1" />
          <Ice hq={hq} position={[-0.5, 0.82, 0]} rotation={[0.1, 0.5, 0.05]} />
          <Ice hq={hq} position={[0.45, 0.72, 0.5]} rotation={[0.3, -0.4, 0.2]} scale={0.75} />
          <Ice hq={hq} position={[0.2, 1.48, -0.25]} rotation={[0.6, 0.3, 0.4]} scale={0.6} />
          <GlassSphere hq={hq} r={0.38} position={[1.3, 0.78, -0.2]} tint="#eef7fa" />
          <Drop hq={hq} position={[-0.9, 0.45, 0.9]} />
          <Drop hq={hq} s={0.05} position={[0.9, 0.44, 1.0]} />
        </group>
      )
  }
}

export function Studio({ variant, shadows = true }: { variant: Variant; shadows?: boolean }) {
  return (
    <>
      <color attach="background" args={[BG[variant]]} />
      <fog attach="fog" args={[BG[variant], 9, 22]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[-4, 8, 5]} intensity={2.2} color="#fff3e3" castShadow={shadows} shadow-mapSize={[2048, 2048]} shadow-radius={8} shadow-bias={-0.0003}>
        <orthographicCamera attach="shadow-camera" args={[-6, 6, 6, -6, 0.5, 30]} />
      </directionalLight>
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} color="#fff4e6" position={[-4, 5, 3]} rotation={[0, 0.6, 0]} scale={[6, 4, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#ffe9d6" position={[5, 2, 2]} rotation={[0, -0.9, 0]} scale={[3, 6, 1]} />
        <Lightformer form="ring" intensity={1.2} position={[0, 6, -4]} scale={4} />
        <Lightformer form="rect" intensity={2.2} color="#fff6ea" position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[8, 8, 1]} />
        <Lightformer form="rect" intensity={0.8} color={BG[variant]} position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[20, 20, 1]} />
      </Environment>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color={BG[variant]} roughness={1} />
      </mesh>
      <ContactShadows position={[0, 0.005, 0]} opacity={0.35} scale={14} blur={2.8} far={4} color="#4A3328" frames={1} />
    </>
  )
}

/** Parallax de cámara con el ratón y zoom lento (para el hero). */
export function CameraDrift({ base, look, zoom }: { base: [number, number, number]; look: [number, number, number]; zoom: React.MutableRefObject<number> }) {
  const t = useRef(new THREE.Vector3(...look))
  useFrame((s, dt) => {
    const z = zoom.current
    const tx = base[0] + s.pointer.x * 0.5
    const ty = base[1] + s.pointer.y * 0.3 - z * 0.4
    const tz = base[2] - z * 2.2
    s.camera.position.x = THREE.MathUtils.damp(s.camera.position.x, tx, 3, dt)
    s.camera.position.y = THREE.MathUtils.damp(s.camera.position.y, ty, 3, dt)
    s.camera.position.z = THREE.MathUtils.damp(s.camera.position.z, tz, 3, dt)
    s.camera.lookAt(t.current)
  })
  return null
}
