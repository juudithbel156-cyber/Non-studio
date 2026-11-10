import { useMemo, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

/* ------------------------------------------------------------------ */
/* Texturas procedurales (sin descargas)                               */
/* ------------------------------------------------------------------ */
function canvasTex(size: number, draw: (g: CanvasRenderingContext2D, s: number) => void, repeat = 1) {
  const c = document.createElement('canvas'); c.width = c.height = size
  const g = c.getContext('2d')!; draw(g, size)
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat); t.anisotropy = 8
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/** Trama de lino: hilos irregulares en dos direcciones. */
export function useLinenTex(repeat = 6) {
  return useMemo(() => canvasTex(512, (g, s) => {
    g.fillStyle = '#ffffff'; g.fillRect(0, 0, s, s)
    for (let i = 0; i < s; i += 3) {
      const a = 0.05 + Math.random() * 0.09
      g.fillStyle = `rgba(80,60,40,${a})`; g.fillRect(0, i, s, 1 + Math.random())
      g.fillStyle = `rgba(80,60,40,${a * 0.8})`; g.fillRect(i, 0, 1 + Math.random(), s)
    }
    for (let k = 0; k < 160; k++) { // slubs: engrosamientos típicos del lino
      g.fillStyle = 'rgba(70,50,30,.12)'; const y = Math.random() * s
      g.fillRect(Math.random() * s, y, 10 + Math.random() * 40, 2)
    }
  }, repeat), [repeat])
}

/** Trenzado de mimbre / paja. */
export function useWeaveTex(base: string, dark: string, repeat = 4) {
  return useMemo(() => canvasTex(256, (g, s) => {
    g.fillStyle = base; g.fillRect(0, 0, s, s)
    const n = 8, w = s / n
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const horiz = (x + y) % 2 === 0
      const grd = horiz ? g.createLinearGradient(0, y * w, 0, y * w + w) : g.createLinearGradient(x * w, 0, x * w + w, 0)
      grd.addColorStop(0, dark); grd.addColorStop(0.5, base); grd.addColorStop(1, dark)
      g.fillStyle = grd; g.fillRect(x * w + 1, y * w + 1, w - 2, w - 2)
      g.strokeStyle = 'rgba(60,35,10,.35)'; g.lineWidth = 1
      for (let k = 2; k < w - 2; k += 3) {
        g.beginPath()
        if (horiz) { g.moveTo(x * w + 2, y * w + k); g.lineTo(x * w + w - 2, y * w + k) } else { g.moveTo(x * w + k, y * w + 2); g.lineTo(x * w + k, y * w + w - 2) }
        g.stroke()
      }
    }
  }, repeat), [base, dark, repeat])
}

/** Ganchillo: mapa alfa con calados. */
export function useCrochetAlpha(repeat = 6) {
  return useMemo(() => {
    const t = canvasTex(256, (g, s) => {
      // patrón de "granny square": anillos de cadeneta con calados
      g.fillStyle = '#000'; g.fillRect(0, 0, s, s)
      g.strokeStyle = '#fff'; g.lineCap = 'round'
      const n = 2, w = s / n
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const cx = x * w + w / 2, cy = y * w + w / 2
        for (const [r, lw] of [[w * 0.12, 7], [w * 0.27, 6], [w * 0.42, 7]] as const) {
          g.lineWidth = lw; const k = Math.round(r / 4)
          for (let i = 0; i < k; i++) { const a0 = (i / k) * Math.PI * 2; g.beginPath(); g.arc(cx, cy, r, a0 + 0.08, a0 + (Math.PI * 2) / k - 0.08); g.stroke() }
        }
        g.lineWidth = 5
        for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; g.beginPath(); g.moveTo(cx + Math.cos(a) * w * 0.12, cy + Math.sin(a) * w * 0.12); g.lineTo(cx + Math.cos(a) * w * 0.42, cy + Math.sin(a) * w * 0.42); g.stroke() }
      }
    }, repeat)
    t.colorSpace = THREE.NoColorSpace
    return t
  }, [repeat])
}

/** Etiqueta de cuero NAU: "nau" + "Pensat per a tu" + costura de puntos (como la etiqueta real). */
export function useTagTex() {
  return useMemo(() => {
    const t = canvasTex(1024, (g, s) => {
      const H = s * 0.62
      g.fillStyle = '#9A4A12'; g.fillRect(0, 0, s, s)
      const img = g.getImageData(0, 0, s, s)
      for (let i = 0; i < img.data.length; i += 4) { const n = (Math.random() - 0.5) * 18; img.data[i] += n; img.data[i + 1] += n * 0.7; img.data[i + 2] += n * 0.4 }
      g.putImageData(img, 0, 0)
      g.fillStyle = '#F3EEE6'
      const m = 60
      for (let x = m; x <= s - m; x += 26) { g.beginPath(); g.arc(x, m, 5, 0, 7); g.fill(); g.beginPath(); g.arc(x, H - m, 5, 0, 7); g.fill() }
      for (let y = m; y <= H - m; y += 26) { g.beginPath(); g.arc(m, y, 5, 0, 7); g.fill(); g.beginPath(); g.arc(s - m, y, 5, 0, 7); g.fill() }
      g.textAlign = 'center'; g.textBaseline = 'middle'
      g.font = '500 260px Quicksand, "Hanken Grotesk", sans-serif'; g.fillText('nau', s / 2, H * 0.46)
      g.font = 'italic 300 70px Fraunces, Georgia, serif'; g.fillText('Pensat per a tu', s / 2, H * 0.74)
    }, 1)
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping
    t.repeat.set(1, 1)
    return t
  }, [])
}

/* ------------------------------------------------------------------ */
/* Tela de lino animada (simulación ligera en CPU)                      */
/* ------------------------------------------------------------------ */
export function Cloth({ w = 4, h = 5, seg = 64, color = '#E6DED0', wind = 1, pointer = true, drape = 0, ...p }: { w?: number; h?: number; seg?: number; color?: string; wind?: number; pointer?: boolean; drape?: number } & JSX.IntrinsicElements['mesh']) {
  const geo = useMemo(() => new THREE.PlaneGeometry(w, h, seg, Math.round(seg * h / w)), [w, h, seg])
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array as Float32Array), [geo])
  const tex = useLinenTex(5)
  const m = useRef(new THREE.Vector2())
  useFrame((s, dt) => {
    m.current.x = THREE.MathUtils.damp(m.current.x, pointer ? s.pointer.x : 0, 2, dt)
    m.current.y = THREE.MathUtils.damp(m.current.y, pointer ? s.pointer.y : 0, 2, dt)
    const t = s.clock.elapsedTime * wind
    const pos = geo.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3], y = base[i * 3 + 1]
      const top = (y + h / 2) / h // 1 arriba (sujeta), 0 abajo (libre)
      const free = 1 - top * 0.85
      const z = (Math.sin(x * 1.3 + t * 1.1) * 0.22 + Math.sin(y * 1.7 - t * 0.8 + x * 0.6) * 0.18 + Math.sin((x + y) * 3.1 + t * 1.6) * 0.04) * free
        + m.current.x * 0.35 * free * Math.sin(y * 0.8) + drape * (x * x) * 0.12 * free
      pos.setXYZ(i, x + Math.sin(y * 2 + t) * 0.04 * free + m.current.x * 0.15 * free, y + Math.cos(x * 2 + t) * 0.02 * free, z)
    }
    pos.needsUpdate = true; geo.computeVertexNormals()
  })
  return (
    <mesh geometry={geo} castShadow receiveShadow {...p}>
      <meshPhysicalMaterial color={color} map={tex} bumpMap={tex} bumpScale={0.6} roughness={0.92} sheen={1} sheenRoughness={0.6} sheenColor="#fff7ea" side={THREE.DoubleSide} />
    </mesh>
  )
}

/** Etiqueta de cuero con cordón; se balancea con el ratón como un péndulo. */
export function LeatherTag({ swing = true, ...p }: { swing?: boolean } & JSX.IntrinsicElements['group']) {
  const tex = useTagTex()
  const g = useRef<THREE.Group>(null!)
  const shape = useMemo(() => {
    const s = new THREE.Shape(); const W = 1.6, H = 1.0, r = 0.08
    s.moveTo(-W / 2 + r, -H / 2); s.lineTo(W / 2 - r, -H / 2); s.quadraticCurveTo(W / 2, -H / 2, W / 2, -H / 2 + r)
    s.lineTo(W / 2, H / 2 - r); s.quadraticCurveTo(W / 2, H / 2, W / 2 - r, H / 2); s.lineTo(-W / 2 + r, H / 2)
    s.quadraticCurveTo(-W / 2, H / 2, -W / 2, H / 2 - r); s.lineTo(-W / 2, -H / 2 + r); s.quadraticCurveTo(-W / 2, -H / 2, -W / 2 + r, -H / 2)
    const hole = new THREE.Path(); hole.absarc(0, H / 2 - 0.13, 0.045, 0, Math.PI * 2, true); s.holes.push(hole)
    const geo = new THREE.ExtrudeGeometry(s, { depth: 0.04, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3 })
    // UV planas para la cara frontal (0..1 según el tamaño)
    const uv = geo.attributes.uv as THREE.BufferAttribute, pos = geo.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) + W / 2) / W, ((pos.getY(i) + H / 2) / H) * 0.62 + 0.38)
    geo.center(); return geo
  }, [])
  useFrame((s, dt) => {
    if (!swing) return
    const t = s.clock.elapsedTime
    const target = Math.sin(t * 1.3) * 0.08 + s.pointer.x * 0.35
    g.current.rotation.z = THREE.MathUtils.damp(g.current.rotation.z, target, 2.5, dt)
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, Math.sin(t * 0.7) * 0.35 + s.pointer.x * 0.4, 2, dt)
  })
  return (
    <group {...p}>
      <group ref={g}>
        {swing && <mesh position={[0, -0.75, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 1.5, 8]} />
          <meshStandardMaterial color="#E9E2D4" roughness={0.9} />
        </mesh>}
        <mesh geometry={shape} position={swing ? [0, -1.5 - 0.37, 0] : [0, 0, 0]} castShadow>
          <meshPhysicalMaterial map={tex} roughness={0.62} clearcoat={0.25} clearcoatRoughness={0.6} sheen={0.4} sheenColor="#d9a173" />
        </mesh>
      </group>
    </group>
  )
}

export function Basket(p: JSX.IntrinsicElements['group']) {
  const tex = useWeaveTex('#B98544', '#7A4A1A', 6)
  const body = useMemo(() => new THREE.LatheGeometry([[0, 0], [0.75, 0], [0.85, 0.08], [1.0, 0.7], [1.08, 1.25], [1.1, 1.3]].map(([x, y]) => new THREE.Vector2(x, y)), 64), [])
  return (
    <group {...p}>
      <mesh geometry={body} castShadow receiveShadow>
        <meshStandardMaterial map={tex} bumpMap={tex} bumpScale={1.5} roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.55, 1.3, 0]} rotation={[0, 0, 0]} castShadow>
          <torusGeometry args={[0.42, 0.04, 12, 40, Math.PI]} />
          <meshStandardMaterial color="#7A3A10" roughness={0.6} />
        </mesh>
      ))}
    </group>
  )
}

export function StrawHat(p: JSX.IntrinsicElements['group']) {
  const tex = useWeaveTex('#D9BC85', '#A8834A', 10)
  const geo = useMemo(() => new THREE.LatheGeometry([[0, 0.62], [0.42, 0.6], [0.52, 0.42], [0.55, 0.12], [0.62, 0.06], [1.35, 0.02], [1.45, -0.02]].map(([x, y]) => new THREE.Vector2(x, y)), 72), [])
  return (
    <group {...p}>
      <mesh geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial map={tex} bumpMap={tex} bumpScale={1.2} roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.565, 0.555, 0.12, 64, 1, true]} />
        <meshStandardMaterial color="#0E0D0B" roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

/** Manta de ganchillo doblada sobre sí misma. */
export function Crochet({ color = '#EFE7DA', ...p }: { color?: string } & JSX.IntrinsicElements['mesh']) {
  const alpha = useCrochetAlpha(7)
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(3, 2.2, 60, 44); const pos = g.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = pos.getY(i); pos.setZ(i, Math.sin(x * 2.2) * 0.12 + Math.cos(y * 3 + x) * 0.06) }
    g.computeVertexNormals(); return g
  }, [])
  return (
    <mesh geometry={geo} castShadow receiveShadow {...p}>
      <meshStandardMaterial color={color} alphaMap={alpha} alphaTest={0.5} roughness={1} side={THREE.DoubleSide} />
    </mesh>
  )
}

/** Rama de olivo: tallo curvo con hojas lanceoladas. */
export function OliveBranch(p: JSX.IntrinsicElements['group']) {
  const leaf = useMemo(() => {
    const s = new THREE.Shape(); s.moveTo(0, 0); s.quadraticCurveTo(0.06, 0.22, 0, 0.5); s.quadraticCurveTo(-0.06, 0.22, 0, 0)
    const g = new THREE.ShapeGeometry(s, 8); return g
  }, [])
  const stem = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.3, 0.8, 0.05), new THREE.Vector3(0.4, 1.7, 0), new THREE.Vector3(0.2, 2.5, -0.05)]), 40, 0.018, 6), [])
  const leaves = useMemo(() => Array.from({ length: 26 }, (_, i) => {
    const t = 0.08 + i / 28; const pt = (stem.parameters.path as THREE.Curve<THREE.Vector3>).getPointAt(Math.min(t, 1))
    return { pos: pt, rot: [Math.random() * 0.6 - 0.3, Math.random() * Math.PI, (i % 2 ? 1 : -1) * (0.9 + Math.random() * 0.4)] as [number, number, number], s: 0.8 + Math.random() * 0.4, light: i % 3 === 0 }
  }), [stem])
  return (
    <group {...p}>
      <mesh geometry={stem}><meshStandardMaterial color="#5A4A33" roughness={0.9} /></mesh>
      {leaves.map((l, i) => (
        <mesh key={i} geometry={leaf} position={l.pos} rotation={l.rot} scale={l.s} castShadow>
          <meshStandardMaterial color={l.light ? '#8C9775' : '#4F5A3F'} roughness={0.7} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

/** Prenda doblada (para fichas de producto de demostración). */
export function Folded({ color = '#E6DED0', layers = 3, ...p }: { color?: string; layers?: number } & JSX.IntrinsicElements['group']) {
  const tex = useLinenTex(3)
  const geo = useMemo(() => {
    const g = new THREE.BoxGeometry(2.2, 0.16, 1.6, 40, 2, 30); const pos = g.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i)
      const r = Math.max(Math.abs(x) / 1.1, Math.abs(z) / 0.8)
      pos.setY(i, y * (1 - Math.pow(r, 6) * 0.7) + Math.sin(x * 4) * 0.008 + Math.sin(z * 5 + x) * 0.006)
    }
    g.computeVertexNormals(); return g
  }, [])
  return (
    <group {...p}>
      {Array.from({ length: layers }).map((_, i) => (
        <mesh key={i} geometry={geo} position={[Math.sin(i * 2.1) * 0.05, i * 0.15, Math.cos(i * 1.7) * 0.04]} rotation={[0, Math.sin(i) * 0.04, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial color={color} map={tex} bumpMap={tex} bumpScale={0.8} roughness={0.95} sheen={1} sheenRoughness={0.6} sheenColor="#ffffff" />
        </mesh>
      ))}
      {/* cuello / pliegue superior */}
      <mesh position={[0, layers * 0.15 + 0.02, -0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.32, 0.035, 10, 40, Math.PI]} />
        <meshPhysicalMaterial color={color} roughness={0.95} sheen={1} />
      </mesh>
    </group>
  )
}

/** Tejido en primer plano con pliegues profundos (para fotografía de detalle). */
export function Drape({ color = '#E6DED0', seed = 1, size = 9, depth = 0.085, ...p }: { color?: string; seed?: number; size?: number; depth?: number } & JSX.IntrinsicElements['mesh']) {
  const tex = useLinenTex(9)
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(size, size, 220, 220); const pos = g.attributes.position as THREE.BufferAttribute
    const r = (k: number) => Math.abs(Math.sin(seed * 12.9898 + k * 78.233) * 43758.5453) % 1
    const folds = Array.from({ length: 7 }, (_, k) => ({ f: 0.6 + r(k) * 1.6, ph: r(k + 9) * 6.28, a: depth * (0.4 + r(k + 3)), tilt: (r(k + 5) - 0.5) * 0.9 }))
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i); let z = 0
      for (const fd of folds) { const u = x + y * fd.tilt; const w = Math.sin(u * fd.f + fd.ph); z += fd.a * (w * 0.75 + Math.sign(w) * Math.pow(Math.abs(w), 0.6) * 0.25) }
      z += Math.sin(x * 7 + y * 3) * 0.006
      pos.setZ(i, z)
    }
    g.computeVertexNormals(); return g
  }, [seed, size, depth])
  return (
    <mesh geometry={geo} castShadow receiveShadow {...p}>
      <meshPhysicalMaterial color={color} map={tex} bumpMap={tex} bumpScale={0.9} roughness={0.93} sheen={1} sheenRoughness={0.55} sheenColor="#fff6e8" side={THREE.DoubleSide} />
    </mesh>
  )
}

/** Fotografía real colgada como un lienzo, con pinzas, que se balancea con el ratón. */
export function HangingPhoto({ src, height = 3.6, ...p }: { src: string; height?: number } & JSX.IntrinsicElements['group']) {
  const tex = useLoader(THREE.TextureLoader, src)
  tex.colorSpace = THREE.SRGBColorSpace
  const ratio = tex.image.width / tex.image.height
  const g = useRef<THREE.Group>(null!)
  useFrame((s, dt) => {
    const t = s.clock.elapsedTime
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, s.pointer.x * 0.25 + Math.sin(t * 0.6) * 0.05, 2.5, dt)
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, -s.pointer.y * 0.06, 2.5, dt)
  })
  const w = height * ratio
  return (
    <group {...p}>
      <group ref={g}>
        <mesh position={[0, -height / 2, 0]} castShadow>
          <planeGeometry args={[w, height]} />
          <meshStandardMaterial map={tex} roughness={0.7} side={THREE.DoubleSide} />
        </mesh>
        {[-w * 0.32, w * 0.32].map((x) => (
          <mesh key={x} position={[x, 0.02, 0.03]} castShadow>
            <boxGeometry args={[0.08, 0.28, 0.06]} />
            <meshStandardMaterial color="#B9875A" roughness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
