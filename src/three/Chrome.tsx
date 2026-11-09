import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js'

/** Material de cromo pulido: refleja el entorno con los colores de la marca. */
export function useChrome(tint = '#ffffff') {
  return useMemo(() => new THREE.MeshPhysicalMaterial({ color: tint, metalness: 1, roughness: 0.09, clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: 1.15 }), [tint])
}

/**
 * Entorno de estudio: ventanas de luz blancas y tiras naranja / orquídea / melocotón,
 * para que el cromo devuelva reflejos de la identidad de Hêbê.
 */
function GradientDome() {
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(40, 64, 48)
    const pos = g.attributes.position as THREE.BufferAttribute
    const cols: number[] = []
    const stops: [number, string][] = [[-1, '#24322c'], [-0.35, '#6d7570'], [-0.04, '#f2b48e'], [0.08, '#fbf4ef'], [0.45, '#d9dde3'], [1, '#ffffff']]
    const c = new THREE.Color(), a = new THREE.Color(), b = new THREE.Color()
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i) / 40
      let k = 0
      while (k < stops.length - 2 && y > stops[k + 1][0]) k++
      const [y0, c0] = stops[k], [y1, c1] = stops[k + 1]
      c.copy(a.set(c0)).lerp(b.set(c1), THREE.MathUtils.clamp((y - y0) / (y1 - y0), 0, 1))
      cols.push(c.r, c.g, c.b)
    }
    g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3))
    return g
  }, [])
  return <mesh geometry={geo}><meshBasicMaterial vertexColors side={THREE.BackSide} toneMapped={false} /></mesh>
}

export function BrandStudio() {
  return (
    <Environment resolution={512} frames={1}>
      <GradientDome />
      <Lightformer form="circle" intensity={3} position={[0, 7, 2]} rotation={[Math.PI / 2, 0, 0]} scale={6} />
      <Lightformer form="rect" intensity={2.2} color="#E45418" position={[-7, 0.5, 0]} rotation={[0, Math.PI / 2, 0]} scale={[6, 1.4, 1]} />
      <Lightformer form="rect" intensity={1.8} color="#D07CAC" position={[7, -0.5, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[6, 2, 1]} />
      <Lightformer form="circle" intensity={2.5} position={[3, 2, 8]} scale={1.6} />
    </Environment>
  )
}

type Pointer = { x: number; y: number }

/**
 * Metal líquido: metaballs (MarchingCubes) que se funden entre sí como mercurio.
 * `progress` (0..1, scroll) estira y separa las gotas; el ratón las atrae.
 */
export function LiquidMetal({ progress, resolution = 56, scale = 3.2, position = [0, 0, 0] as [number, number, number], seed = 0, count = 7 }: {
  progress?: React.MutableRefObject<number>; resolution?: number; scale?: number; position?: [number, number, number]; seed?: number; count?: number
}) {
  const mat = useChrome('#f2f2f2')
  const mc = useMemo(() => {
    const m = new MarchingCubes(resolution, mat, false, false, 60000)
    m.isolation = 80
    return m
  }, [resolution, mat])
  const pointer = useRef<Pointer>({ x: 0, y: 0 })
  const { viewport } = useThree()

  useEffect(() => () => mc.geometry.dispose(), [mc])

  useFrame((state, dt) => {
    pointer.current.x = THREE.MathUtils.damp(pointer.current.x, state.pointer.x, 3, dt)
    pointer.current.y = THREE.MathUtils.damp(pointer.current.y, state.pointer.y, 3, dt)
    const t = state.clock.elapsedTime * 0.45 + seed
    const p = progress?.current ?? 0
    const spread = 0.17 + p * 0.12
    mc.reset()
    const strength = 0.55
    const subtract = 12
    for (let i = 0; i < count; i++) {
      const k = i / count
      const x = 0.5 + Math.sin(t * (0.9 + k * 0.6) + i * 1.7) * spread + pointer.current.x * 0.08 * (i % 2 ? 1 : -0.6)
      const y = 0.5 + Math.cos(t * (0.7 + k * 0.5) + i * 2.3) * spread * 0.85 + pointer.current.y * 0.07
      const z = 0.5 + Math.sin(t * 0.8 + i * 3.1) * 0.12
      mc.addBall(x, y, z, strength * (0.85 + 0.3 * Math.sin(t + i)), subtract)
    }
    // gota que persigue el cursor
    mc.addBall(0.5 + pointer.current.x * 0.24, 0.5 + pointer.current.y * 0.22, 0.6, 0.35, subtract)
    mc.update()
    mc.rotation.y = Math.sin(t * 0.3) * 0.4 + p * 1.2
    mc.rotation.z = p * 0.6
    void viewport
  })

  return <primitive object={mc} position={position} scale={scale} />
}

/** Fotografía recortada como plano dentro de la escena 3D, para que el cromo pase delante y detrás. */
export function PhotoPlane({ src, height = 5.4, position = [0, 0, 0] as [number, number, number], progress }: { src: string; height?: number; position?: [number, number, number]; progress?: React.MutableRefObject<number> }) {
  const tex = useLoader(THREE.TextureLoader, src)
  tex.colorSpace = THREE.SRGBColorSpace
  const ratio = tex.image.width / tex.image.height
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state, dt) => {
    const p = progress?.current ?? 0
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, position[1] - p * 0.6, 4, dt)
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, state.pointer.x * 0.08, 3, dt)
    const s = 1 + p * 0.12
    ref.current.scale.set(s, s, 1)
  })
  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[height * ratio, height]} />
      <meshBasicMaterial map={tex} transparent alphaTest={0.02} toneMapped={false} />
    </mesh>
  )
}

/**
 * Símbolo del logotipo de Hêbê en cromo: cuatro lazos elípticos entrelazados
 * dentro de un anillo partido (interpretación 3D del símbolo original).
 */
export function ChromeSymbol({ progress }: { progress?: React.MutableRefObject<number> }) {
  const mat = useChrome('#ffffff')
  const rose = useChrome('#FCC8A8')
  const loops = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0.62, 0.36, 0.78, 0, Math.PI * 2, false, 0)
    const pts = curve.getPoints(96).map((p) => new THREE.Vector3(p.x, p.y, 0))
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true), 160, 0.07, 24, true)
  }, [])
  const arc = useMemo(() => new THREE.TorusGeometry(1.75, 0.065, 24, 80, Math.PI * 0.38), [])
  const g = useRef<THREE.Group>(null!)
  useFrame((state, dt) => {
    const p = progress?.current ?? 0
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, p * Math.PI * 2 + state.pointer.x * 0.4, 3, dt)
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, -0.25 + state.pointer.y * 0.3, 3, dt)
    g.current.rotation.z = state.clock.elapsedTime * 0.08
  })
  return (
    <group ref={g}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} geometry={loops} material={i % 2 ? rose : mat} rotation={[0, i % 2 ? 0.35 : -0.35, (i * Math.PI) / 2 + Math.PI / 4]} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={'a' + i} geometry={arc} material={mat} rotation={[0, 0, (i * Math.PI) / 2 + 0.2]} />
      ))}
    </group>
  )
}
