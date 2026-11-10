import { useMemo } from 'react'
import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import { Crochet, Drape, LeatherTag, OliveBranch, StrawHat, useWeaveTex } from './Objects'

export type StillId = 'lino' | 'etiqueta' | 'ganchillo' | 'negro' | 'cesta' | 'sombrero' | 'p-lino' | 'p-negro' | 'p-arena' | 'p-piedra' | 'p-ganchillo' | 'p-cuero'

const BG: Record<string, string> = { lino: '#D9CDBA', etiqueta: '#E5DED2', ganchillo: '#CDBFA8', negro: '#B9B2A6', cesta: '#E1D6C4', sombrero: '#D2C3AA' }
export const bgOf = (id: StillId) => BG[id] ?? '#E3DBCD'

/** Fondo continuo (ciclorama) de estudio fotográfico. */
function Cyclorama({ color }: { color: string }) {
  const geo = useMemo(() => {
    const pts = [] as THREE.Vector2[]
    for (let i = 0; i <= 20; i++) { const a = (i / 20) * Math.PI / 2; pts.push(new THREE.Vector2(-6 + Math.sin(a) * 3, 3 - Math.cos(a) * 3)) }
    const shape = new THREE.Shape(); shape.moveTo(-20, 12)
    const g = new THREE.PlaneGeometry(40, 40, 1, 60); const pos = g.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const v = (pos.getY(i) + 20) / 40 // 0 delante, 1 fondo
      const d = v * 22, R = 4
      let y = 0, z = 6 - d
      if (d > 14) { const a = Math.min((d - 14) / R, Math.PI / 2); y = R - Math.cos(a) * R + Math.max(0, d - 14 - R * Math.PI / 2); z = 6 - 14 - Math.sin(a) * R }
      pos.setY(i, y); pos.setZ(i, z)
    }
    g.computeVertexNormals(); return g
  }, [])
  return <mesh geometry={geo} receiveShadow><meshStandardMaterial color={color} roughness={1} /></mesh>
}

function Studio({ color }: { color: string }) {
  return (
    <>
      <color attach="background" args={[color]} />
      <ambientLight intensity={0.25} />
      {/* luz de ventana cálida, con rama de olivo fuera de plano proyectando sombra */}
      <directionalLight position={[-7, 4.2, 4]} intensity={2.8} color="#ffe8cc" castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0008} shadow-normalBias={0.04}>
        <orthographicCamera attach="shadow-camera" args={[-8, 8, 8, -8, 0.5, 30]} />
      </directionalLight>
      <OliveBranch position={[-4.6, 5.5, 3.1]} rotation={[0.3, 0, -2.2]} scale={1.7} />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2} color="#fff1df" position={[-5, 4, 4]} scale={[6, 4, 1]} />
        <Lightformer form="rect" intensity={0.8} position={[5, 2, 3]} scale={[4, 6, 1]} />
      </Environment>
      <Cyclorama color={color} />
      <ContactShadows position={[0, 0.003, 0]} opacity={0.4} scale={12} blur={2.4} far={3} color="#3a2a1a" frames={1} />
    </>
  )
}

const PRODUCT_COLOR: Record<string, string> = { 'p-lino': '#E8E0D2', 'p-negro': '#1C1B19', 'p-arena': '#C9B69A', 'p-piedra': '#9C968C', 'p-cuero': '#A3582A' }

export function StillScene({ id }: { id: StillId }) {
  const bg = bgOf(id)
  const flat = (col: string, seed: number, extra?: JSX.Element) => (
    <group>
      <Drape color={col} seed={seed} rotation={[-Math.PI / 2, 0, 0.3]} position={[0, 0.5, 0]} />
      {extra}
    </group>
  )
  const content = (() => {
    switch (id) {
      case 'lino': return flat('#E6DDCD', 3)
      case 'negro': return flat('#1E1D1B', 7, <LeatherTag position={[0.2, 0.86, 0.1]} rotation={[-Math.PI / 2 + 0.05, 0, -0.4]} scale={0.7} swing={false} />)
      case 'etiqueta': return flat('#E8E0D2', 5, <LeatherTag position={[-0.1, 0.88, 0.2]} rotation={[-Math.PI / 2 + 0.05, 0, 0.35]} scale={0.75} swing={false} />)
      case 'ganchillo': return flat('#C9B699', 11, <Crochet color="#F1EADF" position={[0.2, 0.62, 0.1]} rotation={[-Math.PI / 2 + 0.05, 0, 0.5]} scale={1.3} />)
      case 'cesta': return <WeaveMacro />
      case 'sombrero': return flat('#E6DDCD', 13, <StrawHat position={[0.1, 0.62, 0.1]} rotation={[0.08, 0, 0.1]} />)
      case 'p-ganchillo': return flat('#2A2824', 17, <Crochet color="#F1EADF" position={[0, 0.68, 0]} rotation={[-Math.PI / 2 + 0.05, 0, 0.3]} scale={1.1} />)
      default: return flat(PRODUCT_COLOR[id] ?? '#E6DED0', id.length * 3 + 1)
    }
  })()
  return (
    <>
      <Studio color={bg} />
      {content}
    </>
  )
}

function WeaveMacro() {
  // cesta vista desde arriba, con lino dentro, sobre lino
  return (
    <group>
      <Drape color="#E6DDCD" seed={21} rotation={[-Math.PI / 2, 0, 0.3]} position={[0, 0.5, 0]} />
      <BasketTop />
    </group>
  )
}
function BasketTop() {
  const tex = useWeaveTex('#C49455', '#87582A', 3)
  const geo = useMemo(() => new THREE.LatheGeometry([[0.0, 0], [1.0, 0], [1.15, 0.4], [1.25, 0.85], [1.3, 0.9]].map(([x, y]) => new THREE.Vector2(x, y)), 72), [])
  return (
    <group position={[0.3, 0.55, 0.2]}>
      <mesh geometry={geo} castShadow receiveShadow><meshStandardMaterial map={tex} bumpMap={tex} bumpScale={2} roughness={0.9} side={THREE.DoubleSide} /></mesh>
      <Drape color="#EFE8DC" seed={5} size={2.2} depth={0.07} rotation={[-Math.PI / 2, 0, 0.8]} position={[0, 0.5, 0]} scale={0.95} />
      <mesh position={[0, 0.92, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.27, 0.06, 12, 72]} /><meshStandardMaterial color="#8E5A28" roughness={0.8} /></mesh>
    </group>
  )
}

export const CAM: Record<string, { pos: [number, number, number]; look: [number, number, number]; fov: number }> = {
  default: { pos: [0.6, 4.2, 2.4], look: [0, 0.5, 0], fov: 40 },
  cesta: { pos: [0.6, 5.6, 2.8], look: [0.2, 0.6, 0], fov: 40 },
  negro: { pos: [0.4, 4.4, 2.2], look: [0.1, 0.6, 0], fov: 42 },
  etiqueta: { pos: [0.3, 3.6, 1.8], look: [-0.05, 0.9, 0], fov: 42 },
  sombrero: { pos: [0.4, 5.6, 3.0], look: [0.0, 0.6, 0], fov: 40 },
}
