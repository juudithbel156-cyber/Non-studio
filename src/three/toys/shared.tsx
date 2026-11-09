import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'

/** Paleta de los juguetes (no son colores corporativos: ver src/index.css para la marca). */
export const C = {
  red: '#E52421',
  blue: '#1B3D9A',
  sky: '#3B82F6',
  yellow: '#FFCC00',
  green: '#16A34A',
  orange: '#F97316',
  white: '#F7F8FC',
  black: '#1D2233',
  fur: '#B8773D',
  furLight: '#E2B07A',
  wood: '#D9A066',
}

/** Plástico brillante con barniz (clearcoat) para reflejos sutiles. */
export function Plastic({ color, rough = 0.32, emissive, emissiveIntensity = 0 }: { color: string; rough?: number; emissive?: string; emissiveIntensity?: number }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={rough}
      metalness={0}
      clearcoat={0.7}
      clearcoatRoughness={0.25}
      emissive={emissive ?? '#000000'}
      emissiveIntensity={emissiveIntensity}
    />
  )
}

/**
 * Interacción común: hover (escala + cursor) y clic (marca de tiempo para animar).
 * `since()` devuelve los segundos desde el último clic.
 */
export function useToy() {
  const group = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const clickAt = useRef(-100)
  const s = useRef(1)

  useEffect(() => () => { document.body.style.cursor = '' }, [])

  useFrame((_, dt) => {
    s.current = THREE.MathUtils.damp(s.current, hovered ? 1.09 : 1, 10, dt)
    if (group.current) group.current.scale.setScalar(s.current)
  })

  const bind = {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' },
    onPointerOut: () => { setHovered(false); document.body.style.cursor = '' },
    onClick: (e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); clickAt.current = performance.now() / 1000 },
  }
  const since = () => performance.now() / 1000 - clickAt.current
  return { group, hovered, bind, since }
}

/** Geometría de estrella extruida (reutilizable). */
export function useStarGeometry(outer = 0.5, inner = 0.22, depth = 0.12, points = 5) {
  return useMemo(() => {
    const shape = new THREE.Shape()
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outer : inner
      const a = (i / (points * 2)) * Math.PI * 2 + Math.PI / 2
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      if (i === 0) shape.moveTo(x, y)
      else shape.lineTo(x, y)
    }
    shape.closePath()
    const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 3 })
    g.center()
    return g
  }, [outer, inner, depth, points])
}

/** Amortiguación de rebote tras un clic: devuelve 0..1. */
export function bounce(t: number, freq = 7, decay = 2.2) {
  if (t < 0 || t > 3) return 0
  return Math.abs(Math.sin(t * freq)) * Math.exp(-t * decay)
}
