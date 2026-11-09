import type { ToyIcon } from '../content/categories'

/**
 * Ilustraciones representativas de cada categoría (provisionales, sustituibles por fotografía:
 * rellena `image` en src/content/categories.ts).
 */
export function ToyArt({ icon, className = '' }: { icon: ToyIcon; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <radialGradient id="hl" cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id="ds" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#0A1A4F" floodOpacity=".28" />
        </filter>
      </defs>
      <g filter="url(#ds)">{art[icon]}</g>
    </svg>
  )
}

const brick = (x: number, y: number, w: number, c: string, d: string) => (
  <g>
    <rect x={x} y={y} width={w} height="34" rx="6" fill={c} />
    <rect x={x} y={y + 26} width={w} height="8" rx="4" fill={d} />
    {Array.from({ length: Math.round(w / 26) }).map((_, i) => (
      <g key={i}>
        <rect x={x + 6 + i * 26} y={y - 9} width="16" height="11" rx="3" fill={c} />
        <rect x={x + 6 + i * 26} y={y - 3} width="16" height="5" rx="2" fill={d} opacity=".6" />
      </g>
    ))}
  </g>
)

const art: Record<ToyIcon, JSX.Element> = {
  blocks: (
    <g>
      {brick(36, 130, 104, '#1B3D9A', '#122C73')}
      {brick(50, 92, 52, '#FFCC00', '#D9A800')}
      {brick(104, 92, 52, '#E52421', '#B5161A')}
      <g transform="rotate(-14 90 60)">{brick(64, 52, 52, '#16A34A', '#0F7A37')}</g>
    </g>
  ),
  doll: (
    <g>
      <path d="M70 120c0-20 14-30 30-30s30 10 30 30l12 54H58Z" fill="#E2559A" />
      <path d="M58 174h84l-4-14H62Z" fill="#B83A78" />
      <circle cx="100" cy="66" r="32" fill="#F7C9A6" />
      <path d="M66 66c0-24 16-38 34-38s34 14 34 38c-6-14-20-20-34-20s-26 6-34 20Z" fill="#6B3A1E" />
      <path d="M66 62c-6 20-4 40 4 54M134 62c6 20 4 40-4 54" stroke="#6B3A1E" strokeWidth="9" strokeLinecap="round" fill="none" />
      <circle cx="88" cy="70" r="4" fill="#2A1810" /><circle cx="112" cy="70" r="4" fill="#2A1810" />
      <path d="M92 82q8 6 16 0" stroke="#C2410C" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="80" cy="80" r="5" fill="#F9A8D4" opacity=".7" /><circle cx="120" cy="80" r="5" fill="#F9A8D4" opacity=".7" />
      <circle cx="100" cy="66" r="32" fill="url(#hl)" />
    </g>
  ),
  car: (
    <g>
      <path d="M30 130c0-14 8-22 22-24l22-24c4-4 8-6 14-6h36c8 0 14 4 18 10l14 20c14 2 22 10 22 24v8H30Z" fill="#E52421" />
      <path d="M80 86h26v22H66Zm32 0h14c4 0 8 2 10 6l10 16h-34Z" fill="#1A2C66" />
      <rect x="30" y="132" width="148" height="10" rx="5" fill="#B5161A" />
      <path d="M40 116h132" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".9" />
      {[64, 146].map((x) => (
        <g key={x}><circle cx={x} cy="146" r="20" fill="#1D2233" /><circle cx={x} cy="146" r="9" fill="#C9CEDB" /></g>
      ))}
      <circle cx="172" cy="122" r="5" fill="#FFE27A" />
      <path d="M52 106l22-24c4-4 8-6 14-6h36" stroke="#fff" strokeOpacity=".4" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  ),
  board: (
    <g>
      <path d="M28 120 100 82l72 38-72 38Z" fill="#0E9F6E" />
      <path d="M28 120v12l72 38v-12Z" fill="#087A54" /><path d="M172 120v12l-72 38v-12Z" fill="#0A6847" />
      <path d="M52 120 100 95l48 25-48 25Z" fill="#fff" opacity=".9" />
      <path d="M76 120l24-12 24 12-24 12Z" fill="#FFCC00" />
      <g transform="translate(120 40) rotate(18)">
        <rect width="40" height="40" rx="9" fill="#fff" />
        <circle cx="11" cy="11" r="4.5" fill="#1B3D9A" /><circle cx="20" cy="20" r="4.5" fill="#1B3D9A" /><circle cx="29" cy="29" r="4.5" fill="#1B3D9A" />
      </g>
      <path d="M70 70a10 10 0 1 1 20 0c0 6-4 8-4 14h8v8H66v-8h8c0-6-4-8-4-14Z" fill="#E52421" />
    </g>
  ),
  baby: (
    <g>
      <rect x="92" y="40" width="16" height="120" rx="8" fill="#D9A066" />
      <ellipse cx="100" cy="166" rx="52" ry="12" fill="#C68A4F" />
      {['#E52421', '#F97316', '#FFCC00', '#16A34A', '#3B82F6'].map((c, i) => (
        <ellipse key={c} cx="100" cy={148 - i * 22} rx={48 - i * 7} ry="13" fill={c} />
      ))}
      <circle cx="100" cy="40" r="13" fill="#E52421" />
      <circle cx="96" cy="36" r="4" fill="#fff" opacity=".6" />
    </g>
  ),
  teddy: (
    <g>
      <circle cx="62" cy="52" r="18" fill="#B8773D" /><circle cx="138" cy="52" r="18" fill="#B8773D" />
      <circle cx="62" cy="52" r="9" fill="#E2B07A" /><circle cx="138" cy="52" r="9" fill="#E2B07A" />
      <ellipse cx="100" cy="140" rx="48" ry="44" fill="#B8773D" />
      <ellipse cx="100" cy="146" rx="28" ry="28" fill="#E2B07A" />
      <circle cx="100" cy="78" r="40" fill="#B8773D" />
      <ellipse cx="100" cy="92" rx="18" ry="14" fill="#E2B07A" />
      <ellipse cx="100" cy="86" rx="7" ry="5" fill="#2A1810" />
      <circle cx="84" cy="72" r="5" fill="#120C0A" /><circle cx="116" cy="72" r="5" fill="#120C0A" />
      <path d="M84 116l16 8 16-8v16l-16-8-16 8Z" fill="#E52421" />
      <circle cx="100" cy="78" r="40" fill="url(#hl)" />
    </g>
  ),
  abc: (
    <g>
      {[
        { x: 30, y: 104, c: '#7C3AED', l: 'A', r: -8 },
        { x: 86, y: 112, c: '#FFCC00', l: 'B', r: 6 },
        { x: 58, y: 56, c: '#E52421', l: 'C', r: 10 },
        { x: 120, y: 64, c: '#3B82F6', l: '1', r: -6 },
      ].map((b) => (
        <g key={b.l} transform={`rotate(${b.r} ${b.x + 26} ${b.y + 26})`}>
          <rect x={b.x} y={b.y} width="52" height="52" rx="10" fill={b.c} />
          <rect x={b.x} y={b.y + 44} width="52" height="8" rx="4" fill="#000" opacity=".15" />
          <text x={b.x + 26} y={b.y + 37} textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontWeight="800" fontSize="34" fill="#fff">{b.l}</text>
        </g>
      ))}
    </g>
  ),
  figure: (
    <g>
      <ellipse cx="100" cy="172" rx="44" ry="10" fill="#0369A1" />
      <rect x="78" y="112" width="44" height="60" rx="10" fill="#0EA5E9" />
      <rect x="60" y="112" width="18" height="44" rx="9" fill="#0EA5E9" /><rect x="122" y="112" width="18" height="44" rx="9" fill="#0EA5E9" />
      <rect x="70" y="40" width="60" height="64" rx="18" fill="#FFCC00" />
      <rect x="76" y="62" width="48" height="16" rx="8" fill="#1D2233" />
      <circle cx="90" cy="70" r="4" fill="#38BDF8" /><circle cx="110" cy="70" r="4" fill="#38BDF8" />
      <path d="M100 40V24" stroke="#1D2233" strokeWidth="4" strokeLinecap="round" /><circle cx="100" cy="22" r="6" fill="#E52421" />
      <path d="M78 140h44" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".6" />
    </g>
  ),
  craft: (
    <g>
      <path d="M40 150c0-40 28-74 66-74 30 0 54 22 54 48 0 16-12 20-22 18-10-2-16 4-14 14 2 12-8 20-28 20-34 0-56-8-56-26Z" fill="#FDF2F8" />
      <circle cx="74" cy="118" r="11" fill="#E52421" /><circle cx="100" cy="98" r="11" fill="#FFCC00" />
      <circle cx="130" cy="108" r="11" fill="#3B82F6" /><circle cx="78" cy="150" r="11" fill="#16A34A" />
      <g transform="rotate(38 150 60)">
        <rect x="142" y="10" width="14" height="86" rx="6" fill="#EC4899" />
        <rect x="142" y="80" width="14" height="10" fill="#C9CEDB" />
        <path d="M142 90h14l-7 20Z" fill="#1D2233" />
      </g>
    </g>
  ),
  star: (
    <g>
      <path d="m100 26 20 44 48 5-36 32 10 48-42-24-42 24 10-48-36-32 48-5Z" fill="#FFCC00" />
      <path d="m100 26 20 44 48 5-36 32 10 48-42-24Z" fill="#F5B800" />
      <path d="m100 50 12 26 28 3-21 19 6 28-25-14" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="5" strokeLinecap="round" />
      <circle cx="46" cy="44" r="6" fill="#E52421" /><circle cx="160" cy="160" r="7" fill="#3B82F6" /><circle cx="164" cy="40" r="5" fill="#16A34A" />
    </g>
  ),
}
