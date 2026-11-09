import { useMemo, useRef } from 'react'
import { useFrame, type GroupProps } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { C, Plastic, useToy, useStarGeometry, bounce } from './shared'

/* ------------------------------------------------------------------ */
/* Coche teledirigido — clic: avanza y vuelve, faros parpadean          */
/* ------------------------------------------------------------------ */
export function RCCar(props: GroupProps) {
  const { group, bind, since } = useToy()
  const body = useRef<THREE.Group>(null!)
  const wheels = useRef<THREE.Group[]>([])
  const lights = useRef<THREE.MeshStandardMaterial[]>([])
  const last = useRef(0)
  const angle = useRef(0)

  useFrame((state) => {
    const t = since()
    const x = t < 1.8 ? Math.sin((t / 1.8) * Math.PI) * 1.4 : 0
    const dx = x - last.current
    last.current = x
    angle.current -= dx / 0.27
    body.current.position.x = x
    body.current.position.y = Math.sin(state.clock.elapsedTime * 9) * 0.006
    body.current.rotation.z = t < 1.8 ? -dx * 3 : 0
    wheels.current.forEach((w) => w && (w.rotation.z = angle.current))
    const flash = t < 1.8 ? (Math.sin(t * 20) > 0 ? 4 : 1) : 1.4
    lights.current.forEach((m) => m && (m.emissiveIntensity = flash))
  })

  const wheelPos: [number, number, number][] = [[0.62, 0.27, 0.52], [-0.62, 0.27, 0.52], [0.62, 0.27, -0.52], [-0.62, 0.27, -0.52]]

  return (
    <group {...props}>
      <group ref={group} {...bind}>
        <group ref={body}>
          <RoundedBox args={[2, 0.5, 1.05]} radius={0.16} smoothness={4} position={[0, 0.52, 0]} castShadow>
            <Plastic color={C.red} />
          </RoundedBox>
          <RoundedBox args={[1.02, 0.42, 0.9]} radius={0.14} smoothness={4} position={[-0.12, 0.92, 0]} castShadow>
            <meshPhysicalMaterial color="#1A2C66" roughness={0.08} metalness={0.3} clearcoat={1} />
          </RoundedBox>
          {[-0.13, 0.13].map((z) => (
            <mesh key={z} position={[0.08, 0.775, z]}>
              <boxGeometry args={[1.9, 0.02, 0.12]} />
              <Plastic color={C.white} />
            </mesh>
          ))}
          {/* alerón */}
          <mesh position={[-0.92, 1.05, 0]} castShadow>
            <boxGeometry args={[0.22, 0.06, 1.12]} />
            <Plastic color={C.black} />
          </mesh>
          {[-0.4, 0.4].map((z) => (
            <mesh key={z} position={[-0.92, 0.88, z]}>
              <boxGeometry args={[0.06, 0.28, 0.06]} />
              <Plastic color={C.black} />
            </mesh>
          ))}
          {/* faros */}
          {[-0.32, 0.32].map((z, i) => (
            <mesh key={z} position={[1.0, 0.56, z]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial ref={(m) => { if (m) lights.current[i] = m }} color="#FFF6C8" emissive="#FFE27A" emissiveIntensity={1.4} />
            </mesh>
          ))}
          {/* antena */}
          <mesh position={[-0.7, 1.25, 0.36]}>
            <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
            <meshStandardMaterial color={C.black} />
          </mesh>
          <mesh position={[-0.7, 1.62, 0.36]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <Plastic color={C.yellow} />
          </mesh>
          {wheelPos.map((p, i) => (
            <group key={i} position={p} ref={(g) => { if (g) wheels.current[i] = g }}>
              <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.27, 0.27, 0.22, 28]} />
                <meshStandardMaterial color="#222634" roughness={0.85} />
              </mesh>
              <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, p[2] > 0 ? 0.112 : -0.112]}>
                <cylinderGeometry args={[0.15, 0.15, 0.01, 20]} />
                <meshStandardMaterial color="#C9CEDB" metalness={0.8} roughness={0.25} />
              </mesh>
              <mesh position={[0.08, 0.08, p[2] > 0 ? 0.118 : -0.118]}>
                <boxGeometry args={[0.06, 0.06, 0.01]} />
                <meshStandardMaterial color={C.yellow} />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Oso de peluche — clic: salta y saluda                               */
/* ------------------------------------------------------------------ */
function Fur({ light = false }: { light?: boolean }) {
  return <meshPhysicalMaterial color={light ? C.furLight : C.fur} roughness={0.95} sheen={1} sheenColor="#FFD9A8" sheenRoughness={0.45} />
}

export function Teddy(props: GroupProps) {
  const { group, bind, since } = useToy()
  const inner = useRef<THREE.Group>(null!)
  const head = useRef<THREE.Group>(null!)
  const arm = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = since()
    const e = state.clock.elapsedTime
    inner.current.position.y = bounce(t, 6, 2.6) * 0.5
    inner.current.scale.y = 1 + Math.sin(e * 1.6) * 0.012
    head.current.rotation.z = Math.sin(e * 0.9) * 0.05 + (t < 2 ? Math.sin(t * 8) * 0.15 * Math.exp(-t) : 0)
    arm.current.rotation.z = -0.6 - (t < 2.2 ? Math.abs(Math.sin(t * 7)) * 1.4 * Math.exp(-t * 0.8) : 0)
  })

  return (
    <group {...props}>
      <group ref={group} {...bind}>
        <group ref={inner}>
          <mesh position={[0, 0.78, 0]} scale={[1, 1.1, 0.9]} castShadow><sphereGeometry args={[0.62, 32, 32]} /><Fur /></mesh>
          <mesh position={[0, 0.72, 0.42]} scale={[1, 1.15, 0.45]}><sphereGeometry args={[0.4, 32, 32]} /><Fur light /></mesh>
          {/* piernas */}
          {[-0.34, 0.34].map((x) => (
            <group key={x}>
              <mesh position={[x, 0.24, 0.3]} scale={[1, 0.85, 1.25]} castShadow><sphereGeometry args={[0.27, 24, 24]} /><Fur /></mesh>
              <mesh position={[x, 0.24, 0.62]} rotation={[0, 0, 0]} scale={[1, 1, 0.3]}><sphereGeometry args={[0.15, 20, 20]} /><Fur light /></mesh>
            </group>
          ))}
          {/* brazos */}
          <group position={[-0.58, 1.05, 0.08]} rotation={[0, 0, 0.6]}>
            <mesh position={[0, -0.25, 0]} castShadow><capsuleGeometry args={[0.16, 0.36, 8, 16]} /><Fur /></mesh>
          </group>
          <group ref={arm} position={[0.58, 1.05, 0.08]} rotation={[0, 0, -0.6]}>
            <mesh position={[0, -0.25, 0]} castShadow><capsuleGeometry args={[0.16, 0.36, 8, 16]} /><Fur /></mesh>
          </group>
          {/* pajarita */}
          <group position={[0, 1.27, 0.45]}>
            <mesh position={[-0.12, 0, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.1, 0.22, 16]} /><Plastic color={C.red} /></mesh>
            <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}><coneGeometry args={[0.1, 0.22, 16]} /><Plastic color={C.red} /></mesh>
            <mesh><sphereGeometry args={[0.06, 12, 12]} /><Plastic color={C.red} /></mesh>
          </group>
          {/* cabeza */}
          <group ref={head} position={[0, 1.66, 0]}>
            <mesh castShadow><sphereGeometry args={[0.48, 32, 32]} /><Fur /></mesh>
            {[-0.36, 0.36].map((x) => (
              <group key={x} position={[x, 0.34, -0.02]}>
                <mesh castShadow><sphereGeometry args={[0.17, 20, 20]} /><Fur /></mesh>
                <mesh position={[0, 0, 0.1]} scale={[1, 1, 0.4]}><sphereGeometry args={[0.1, 16, 16]} /><Fur light /></mesh>
              </group>
            ))}
            <mesh position={[0, -0.1, 0.4]} scale={[1.1, 0.8, 0.75]}><sphereGeometry args={[0.2, 24, 24]} /><Fur light /></mesh>
            <mesh position={[0, -0.04, 0.56]} scale={[1.2, 0.85, 0.8]}><sphereGeometry args={[0.065, 16, 16]} /><meshPhysicalMaterial color="#2A1810" roughness={0.2} clearcoat={1} /></mesh>
            {[-0.17, 0.17].map((x) => (
              <mesh key={x} position={[x, 0.1, 0.42]}><sphereGeometry args={[0.055, 16, 16]} /><meshPhysicalMaterial color="#120C0A" roughness={0.1} clearcoat={1} /></mesh>
            ))}
          </group>
        </group>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Pieza de construcción                                               */
/* ------------------------------------------------------------------ */
export function Brick({ color, nx = 2, nz = 2, ...props }: GroupProps & { color: string; nx?: number; nz?: number }) {
  const u = 0.42
  const studs = useMemo(() => {
    const s: [number, number][] = []
    for (let i = 0; i < nx; i++) for (let j = 0; j < nz; j++) s.push([(i - (nx - 1) / 2) * u, (j - (nz - 1) / 2) * u])
    return s
  }, [nx, nz])
  return (
    <group {...props}>
      <RoundedBox args={[nx * u, 0.4, nz * u]} radius={0.04} smoothness={3} position={[0, 0.2, 0]} castShadow receiveShadow>
        <Plastic color={color} rough={0.25} />
      </RoundedBox>
      {studs.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.46, z]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.12, 20]} />
          <Plastic color={color} rough={0.25} />
        </mesh>
      ))}
    </group>
  )
}

/** Torre de piezas — clic: la pieza superior salta y gira. */
export function BrickStack(props: GroupProps) {
  const { group, bind, since } = useToy()
  const top = useRef<THREE.Group>(null!)
  useFrame(() => {
    const t = since()
    top.current.position.y = 0.8 + bounce(t, 5, 1.8) * 1.2
    top.current.rotation.y = 0.35 + (t < 3 ? (1 - Math.exp(-t * 1.5)) * Math.PI * 2 : 0)
  })
  return (
    <group {...props}>
      <group ref={group} {...bind}>
        <Brick color={C.blue} nx={4} nz={2} />
        <Brick color={C.yellow} nx={2} nz={2} position={[-0.3, 0.4, 0]} rotation={[0, 0.12, 0]} />
        <group ref={top} position={[0.2, 0.8, 0]}>
          <Brick color={C.red} nx={2} nz={2} />
        </group>
        <Brick color={C.green} nx={2} nz={1} position={[1.25, 0, 0.6]} rotation={[0, 0.7, 0]} />
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Pelota de playa — clic: rebota                                      */
/* ------------------------------------------------------------------ */
export function Ball({ radius = 0.5, ...props }: GroupProps & { radius?: number }) {
  const { group, bind, since } = useToy()
  const inner = useRef<THREE.Group>(null!)
  const colors = [C.red, C.white, C.blue, C.yellow, C.white, C.green]
  useFrame((state, dt) => {
    const t = since()
    inner.current.position.y = radius + bounce(t, 6, 1.6) * 1.6
    inner.current.rotation.x += dt * (0.15 + (t < 3 ? 4 * Math.exp(-t) : 0))
    inner.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.4
  })
  return (
    <group {...props}>
      <group ref={group} {...bind}>
        <group ref={inner}>
          {colors.map((c, i) => (
            <mesh key={i} castShadow>
              <sphereGeometry args={[radius, 32, 24, (i / 6) * Math.PI * 2, Math.PI / 3]} />
              <Plastic color={c} rough={0.2} />
            </mesh>
          ))}
          {[1, -1].map((s) => (
            <mesh key={s} position={[0, s * radius * 0.985, 0]} scale={[1, 0.25, 1]}>
              <sphereGeometry args={[radius * 0.16, 16, 16]} />
              <Plastic color={C.white} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Cohete — clic: despega y vuelve                                     */
/* ------------------------------------------------------------------ */
export function Rocket({ boost, ...props }: GroupProps & { boost?: React.MutableRefObject<number> }) {
  const { group, bind, since } = useToy()
  const inner = useRef<THREE.Group>(null!)
  const flame = useRef<THREE.Mesh>(null!)
  const bodyGeo = useMemo(() => {
    const pts = [
      [0, 0], [0.28, 0.02], [0.4, 0.25], [0.44, 0.8], [0.4, 1.35], [0.3, 1.75], [0.16, 2.02], [0, 2.12],
    ].map(([x, y]) => new THREE.Vector2(x, y))
    return new THREE.LatheGeometry(pts, 40)
  }, [])
  const finGeo = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0, 0); s.lineTo(0.42, -0.25); s.lineTo(0.42, -0.6); s.lineTo(0, 0.55); s.closePath()
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.06, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 })
    g.translate(0, 0, -0.03)
    return g
  }, [])

  useFrame((state) => {
    const t = since()
    const lift = t < 2.6 ? Math.sin((t / 2.6) * Math.PI) * 2.4 : 0
    const extra = boost?.current ?? 0
    inner.current.position.y = lift
    inner.current.rotation.y = state.clock.elapsedTime * 0.4 + (t < 2.6 ? t * 3 : 0)
    const f = 0.7 + Math.sin(state.clock.elapsedTime * 30) * 0.12 + (t < 2.6 ? 1.2 : 0) + extra * 1.5
    flame.current.scale.set(1, f, 1)
  })

  return (
    <group {...props}>
      <group ref={group} {...bind}>
        <group ref={inner}>
          <mesh geometry={bodyGeo} castShadow><Plastic color={C.white} rough={0.22} /></mesh>
          {/* punta roja */}
          <mesh position={[0, 1.95, 0]}>
            <coneGeometry args={[0.22, 0.36, 32]} />
            <Plastic color={C.red} />
          </mesh>
          <mesh position={[0, 1.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.4, 0.04, 12, 40]} />
            <Plastic color={C.red} />
          </mesh>
          {/* ventana */}
          <group position={[0, 1.05, 0.4]}>
            <mesh rotation={[0, 0, 0]}><torusGeometry args={[0.16, 0.045, 12, 32]} /><meshStandardMaterial color="#C9CEDB" metalness={0.9} roughness={0.2} /></mesh>
            <mesh scale={[1, 1, 0.45]}><sphereGeometry args={[0.15, 24, 24]} /><meshPhysicalMaterial color="#3B82F6" roughness={0.05} clearcoat={1} emissive="#1E3A8A" emissiveIntensity={0.5} /></mesh>
          </group>
          {/* aletas */}
          {[0, 1, 2].map((i) => (
            <group key={i} rotation={[0, (i / 3) * Math.PI * 2, 0]}>
              <mesh geometry={finGeo} position={[0.34, 0.5, 0]} castShadow><Plastic color={C.red} /></mesh>
            </group>
          ))}
          <mesh position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.22, 0.28, 0.18, 24]} />
            <meshStandardMaterial color="#6B7280" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh ref={flame} position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.2, 0.7, 24, 1, true]} />
            <meshBasicMaterial color="#FFB020" transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Caja de juguetes — clic: la tapa se abre y salen piezas             */
/* ------------------------------------------------------------------ */
export function ToyBox(props: GroupProps) {
  const { group, bind, since } = useToy()
  const lid = useRef<THREE.Group>(null!)
  const pops = useRef<THREE.Group>(null!)
  const star = useStarGeometry(0.34, 0.15, 0.06)

  useFrame((state) => {
    const t = since()
    const e = state.clock.elapsedTime
    const open = t < 2.4 ? Math.sin((t / 2.4) * Math.PI) : 0
    lid.current.rotation.x = -0.95 - open * 0.7 + Math.sin(e * 1.2) * 0.03
    pops.current.position.y = open * 0.9
    pops.current.rotation.y = e * 0.2
  })

  const W = 2.6, H = 1.25, D = 1.7, T = 0.14
  return (
    <group {...props}>
      <group ref={group} {...bind}>
        <RoundedBox args={[W, T, D]} radius={0.05} position={[0, T / 2, 0]} castShadow receiveShadow><Plastic color={C.blue} /></RoundedBox>
        <RoundedBox args={[W, H, T]} radius={0.06} position={[0, H / 2, D / 2 - T / 2]} castShadow><Plastic color={C.blue} /></RoundedBox>
        <RoundedBox args={[W, H, T]} radius={0.06} position={[0, H / 2, -D / 2 + T / 2]} castShadow><Plastic color={C.blue} /></RoundedBox>
        <RoundedBox args={[T, H, D]} radius={0.06} position={[W / 2 - T / 2, H / 2, 0]} castShadow><Plastic color={C.blue} /></RoundedBox>
        <RoundedBox args={[T, H, D]} radius={0.06} position={[-W / 2 + T / 2, H / 2, 0]} castShadow><Plastic color={C.blue} /></RoundedBox>
        {/* ribete y estrellas */}
        <mesh position={[0, H - 0.05, D / 2 + 0.005]}><boxGeometry args={[W + 0.02, 0.1, 0.02]} /><Plastic color={C.yellow} /></mesh>
        {[-0.75, 0, 0.75].map((x, i) => (
          <mesh key={x} geometry={star} position={[x, H / 2, D / 2 + 0.03]} rotation={[0, 0, i * 0.3]}>
            <Plastic color={i === 1 ? C.red : C.yellow} />
          </mesh>
        ))}
        {/* contenido */}
        <group ref={pops} position={[0, 0.6, 0]}>
          <mesh position={[-0.6, 0.55, 0]} castShadow><sphereGeometry args={[0.3, 24, 24]} /><Plastic color={C.red} /></mesh>
          <Brick color={C.yellow} position={[0.25, 0.45, -0.1]} rotation={[0.3, 0.5, 0.2]} />
          <mesh position={[0.75, 0.6, 0.15]} rotation={[0.5, 0.2, 0.4]} castShadow><boxGeometry args={[0.42, 0.42, 0.42]} /><Plastic color={C.green} /></mesh>
          <mesh position={[-0.05, 0.85, 0.3]} geometry={star} rotation={[-0.3, 0.4, 0.2]} castShadow><Plastic color={C.yellow} /></mesh>
        </group>
        {/* tapa con bisagra trasera */}
        <group ref={lid} position={[0, H, -D / 2]}>
          <RoundedBox args={[W + 0.08, T, D + 0.06]} radius={0.06} position={[0, 0, D / 2]} castShadow><Plastic color={C.red} /></RoundedBox>
          <mesh geometry={star} position={[0, T / 2 + 0.03, D / 2]} rotation={[-Math.PI / 2, 0, 0]} scale={1.4}><Plastic color={C.yellow} /></mesh>
        </group>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Patito de goma — clic: se balancea                                  */
/* ------------------------------------------------------------------ */
export function Duck(props: GroupProps) {
  const { group, bind, since } = useToy()
  const inner = useRef<THREE.Group>(null!)
  useFrame((state) => {
    const t = since()
    const e = state.clock.elapsedTime
    const w = t < 2.5 ? Math.sin(t * 12) * 0.35 * Math.exp(-t * 1.4) : 0
    inner.current.rotation.z = Math.sin(e * 1.3) * 0.04 + w
    inner.current.scale.set(1 + w * 0.2, 1 - Math.abs(w) * 0.3, 1)
  })
  return (
    <group {...props}>
      <group ref={group} {...bind}>
        <group ref={inner}>
          <mesh position={[0, 0.36, 0]} scale={[1.25, 0.82, 1]} castShadow><sphereGeometry args={[0.45, 32, 32]} /><Plastic color={C.yellow} rough={0.2} /></mesh>
          <mesh position={[-0.5, 0.55, 0]} rotation={[0, 0, 0.9]}><coneGeometry args={[0.16, 0.3, 20]} /><Plastic color={C.yellow} rough={0.2} /></mesh>
          <mesh position={[0.3, 0.86, 0]} castShadow><sphereGeometry args={[0.3, 32, 32]} /><Plastic color={C.yellow} rough={0.2} /></mesh>
          <mesh position={[0.6, 0.8, 0]} scale={[1, 0.36, 0.8]}><sphereGeometry args={[0.17, 20, 20]} /><Plastic color={C.orange} /></mesh>
          {[-0.14, 0.14].map((z) => (
            <mesh key={z} position={[0.48, 0.94, z]}><sphereGeometry args={[0.04, 12, 12]} /><meshPhysicalMaterial color={C.black} clearcoat={1} roughness={0.1} /></mesh>
          ))}
        </group>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Aros apilables — clic: los aros saltan en cascada                   */
/* ------------------------------------------------------------------ */
export function StackRings(props: GroupProps) {
  const { group, bind, since } = useToy()
  const rings = useRef<THREE.Mesh[]>([])
  const cols = [C.red, C.orange, C.yellow, C.green, C.sky]
  useFrame(() => {
    const t = since()
    rings.current.forEach((r, i) => {
      if (!r) return
      r.position.y = 0.2 + i * 0.25 + bounce(t - i * 0.12, 6, 2) * 0.6
    })
  })
  return (
    <group {...props}>
      <group ref={group} {...bind}>
        <mesh position={[0, 0.06, 0]} castShadow receiveShadow><cylinderGeometry args={[0.6, 0.65, 0.12, 32]} /><meshPhysicalMaterial color={C.wood} roughness={0.6} clearcoat={0.4} /></mesh>
        <mesh position={[0, 0.8, 0]}><cylinderGeometry args={[0.07, 0.07, 1.5, 16]} /><meshPhysicalMaterial color={C.wood} roughness={0.6} /></mesh>
        <mesh position={[0, 1.6, 0]}><sphereGeometry args={[0.14, 20, 20]} /><Plastic color={C.red} /></mesh>
        {cols.map((c, i) => (
          <mesh key={c} ref={(m) => { if (m) rings.current[i] = m }} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.46 - i * 0.065, 0.11, 16, 40]} />
            <Plastic color={c} rough={0.25} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Peonza — gira siempre; clic: acelera                                */
/* ------------------------------------------------------------------ */
export function SpinTop(props: GroupProps) {
  const { group, bind, since } = useToy()
  const inner = useRef<THREE.Group>(null!)
  const geo = useMemo(() => {
    const pts = [[0, 0], [0.05, 0.04], [0.5, 0.38], [0.52, 0.48], [0.18, 0.66], [0.06, 0.7], [0.06, 0.95], [0, 0.97]].map(([x, y]) => new THREE.Vector2(x, y))
    return new THREE.LatheGeometry(pts, 48)
  }, [])
  useFrame((state, dt) => {
    const t = since()
    inner.current.rotation.y += dt * (2 + (t < 3 ? 18 * Math.exp(-t) : 0))
    inner.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.08
  })
  return (
    <group {...props}>
      <group ref={group} {...bind}>
        <group ref={inner}>
          <mesh geometry={geo} castShadow><Plastic color={C.sky} rough={0.2} /></mesh>
          <mesh position={[0, 0.43, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.5, 0.05, 12, 48]} /><Plastic color={C.yellow} /></mesh>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[Math.cos(i * Math.PI / 2) * 0.34, 0.5, Math.sin(i * Math.PI / 2) * 0.34]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <Plastic color={C.red} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Estrella flotante (decoración de fondo)                             */
/* ------------------------------------------------------------------ */
export function StarToy({ color = C.yellow, ...props }: GroupProps & { color?: string }) {
  const { group, bind, since } = useToy()
  const geo = useStarGeometry(0.5, 0.22, 0.14)
  const inner = useRef<THREE.Group>(null!)
  useFrame((state, dt) => {
    const t = since()
    inner.current.rotation.y += dt * (0.4 + (t < 2 ? 10 * Math.exp(-t * 2) : 0))
    inner.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1
  })
  return (
    <group {...props}>
      <group ref={group} {...bind}>
        <group ref={inner}>
          <mesh geometry={geo} castShadow><Plastic color={color} emissive={color} emissiveIntensity={0.15} /></mesh>
        </group>
      </group>
    </group>
  )
}
