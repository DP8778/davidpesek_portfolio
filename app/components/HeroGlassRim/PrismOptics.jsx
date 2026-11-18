// The label lip terminates on the inner face of the glass below the continuous
// outer crest. Geometry is expressed in local CSS pixels.
export function prismGeometry({ width, height, radius, label, bevel = 6.4 }) {
  const r = Math.max(1, Math.min(radius, width / 2, height / 2));
  const wall = Math.min(Math.max(.75, bevel), r * .62, 14);
  const top = wall * .96;
  const depth = Math.min(height / 2, Math.max(top + 2, label.bottom));
  const left = Math.max(top, label.left);
  const end = Math.max(left + 1, Math.min(label.right, width - r));
  const bend = Math.min(12, (end - left) / 4, (depth - top) * .94);
  const start = end - 2 * bend;
  const x1 = start + bend * 1.35, x2 = end - bend * 1.35;
  const curve = `C ${x1} ${depth} ${x2} ${top} ${end} ${top}`;
  // Reflect the right shoulder about the tab centre for a matching entrance.
  const mirror = x => left + end - x;
  const lip = `M ${left} ${top} C ${mirror(x2)} ${top} ${mirror(x1)} ${depth} ${mirror(start)} ${depth} H ${start} ${curve}`;
  const face = lip + " Z";
  const arc = t => {
    const a = t * Math.PI / 2, nx = Math.cos(a), ny = Math.sin(a);
    return [r * (1 - nx), r * (1 - ny), nx, ny];
  };
  const shoulder = t => {
    const q = 1 - t;
    const x = q**3 * start + 3*q*q*t*x1 + 3*q*t*t*x2 + t**3*end;
    const y = (q**3 + 3*q*q*t)*depth + (3*q*t*t + t**3)*top;
    const dx = 3*(q*q*(x1-start) + 2*q*t*(x2-x1) + t*t*(end-x2));
    const dy = 6*q*t*(top-depth);
    const len = Math.hypot(dx, dy) || 1;
    return [x, y, -dy/len, dx/len];
  };
  return { wall, top, depth, left, start, end, r, lip, face, arc, shoulder };
}

function ribbon(sample, from, to, offset, halfWidth) {
  const points = [[], []];
  for (let i = 0; i <= 32; i++) {
    const t = i / 32, [x, y, nx, ny] = sample(from + (to - from) * t);
    const spread = halfWidth * Math.sin(Math.PI * t) ** 1.25;
    for (let side = 0; side < 2; side++) {
      const d = offset + (side ? -spread : spread);
      points[side].push((x + nx*d).toFixed(3) + " " + (y + ny*d).toFixed(3));
    }
  }
  return "M" + points[0].concat(points[1].reverse()).join(" L") + "Z";
}

export default function PrismOptics({ geometry, uid, tabOnly = false }) {
  const { wall: w, top, left, start, end, r, depth, lip, face, arc, shoulder } = prismGeometry(geometry);
  const id = k => uid + "-prism-" + k;
  const paint = k => "url(#" + id(k) + ")";
  const cornerLight = { gradientUnits: "userSpaceOnUse", x1: 0, y1: r, x2: r, y2: 0 };
  const tabLight = { gradientUnits: "userSpaceOnUse", x1: start, y1: depth, x2: end, y2: top };
  const cool = ribbon(arc, .08, .92, w * .31, w * .21);
  const warm = ribbon(arc, .06, .85, w * .76, w * .205);
  const innerBounce = ribbon(arc, .12, .76, w * 1.10, w * .41);
  const pin = ribbon(arc, .22, .68, w * .49, w * .083);
  const tabRay = ribbon(shoulder, .035, .965, .62, .48);
  return <g fill="none" stroke="none">
    <defs>
      <linearGradient id={id("face")} x1=".08" x2=".92" y1="0" y2="1">
        <stop stopColor="var(--prism-tab-top)" /><stop offset=".5" stopColor="var(--prism-surface)" />
        <stop offset=".85" stopColor="var(--prism-tab-foot)" /><stop offset="1" stopColor="var(--prism-tab-top)" />
      </linearGradient>
      <linearGradient id={id("feather")} gradientUnits="userSpaceOnUse" x1={left} x2={left+17} y1="0" y2="0">
        <stop stopColor="white" stopOpacity=".85" /><stop offset="1" stopColor="white" />
      </linearGradient>
      <mask id={id("tab-mask")} maskUnits="userSpaceOnUse" x={left-8} y="0" width={end-left+18} height={depth+14}>
        <rect x={left-8} width={end-left+18} height={depth+14} fill={paint("feather")} />
      </mask>
      <linearGradient id={id("lip-glint")} gradientUnits="userSpaceOnUse" x1={left} x2={end} y1="0" y2="0">
        <stop stopColor="white" stopOpacity=".10" /><stop offset=".4" stopColor="white" stopOpacity=".28" />
        <stop offset=".70" stopColor="#ffedc8" stopOpacity=".6" /><stop offset="1" stopColor="white" stopOpacity=".75" />
      </linearGradient>
      <linearGradient id={id("lip")} gradientUnits="userSpaceOnUse" x1={left} x2={end} y1="0" y2="0">
        <stop stopColor="var(--prism-lip-color)" stopOpacity=".04" /><stop offset=".10" stopColor="var(--prism-lip-color)" stopOpacity=".76" />
        <stop offset=".69" stopColor="var(--prism-lip-color)" /><stop offset=".95" stopColor="var(--prism-lip-color)" stopOpacity=".7" />
        <stop offset="1" stopColor="var(--prism-lip-color)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={id("contact")} gradientUnits="userSpaceOnUse" x1={left} x2={end} y1="0" y2="0">
        <stop stopColor="var(--prism-contact)" stopOpacity="0" /><stop offset=".13" stopColor="var(--prism-contact)" stopOpacity=".74" />
        <stop offset=".77" stopColor="var(--prism-contact)" /><stop offset="1" stopColor="var(--prism-contact)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={id("cold")} {...cornerLight}>
        <stop stopColor="var(--hero-prism-cyan)" stopOpacity="0" /><stop offset=".33" stopColor="var(--hero-prism-cyan)" />
        <stop offset=".55" stopColor="#69fbff" /><stop offset=".78" stopColor="var(--hero-prism-blue)" />
        <stop offset=".94" stopColor="var(--hero-prism-blue)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={id("warm")} {...cornerLight}>
        <stop stopColor="var(--hero-prism-gold)" stopOpacity="0" /><stop offset=".24" stopColor="var(--hero-prism-gold)" />
        <stop offset=".49" stopColor="var(--hero-prism-red)" /><stop offset=".66" stopColor="#ff9fcb" />
        <stop offset=".85" stopColor="var(--hero-prism-red)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={id("split")} {...tabLight}>
        <stop stopColor="var(--hero-prism-cyan)" stopOpacity=".25" /><stop offset=".20" stopColor="var(--hero-prism-cyan)" />
        <stop offset=".36" stopColor="var(--hero-prism-blue)" /><stop offset=".51" stopColor="var(--prism-contact)" stopOpacity=".22" />
        <stop offset=".64" stopColor="var(--hero-prism-red)" /><stop offset=".80" stopColor="var(--hero-prism-gold)" />
        <stop offset="1" stopColor="var(--hero-prism-gold)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={id("side-glass")} gradientUnits="userSpaceOnUse" x1="0" x2={w*2.15} y1="0" y2="0">
        <stop stopColor="var(--prism-contact)" stopOpacity=".38" />
        <stop offset=".22" stopColor="white" stopOpacity=".92" />
        <stop offset=".48" stopColor="white" stopOpacity=".20" />
        <stop offset=".78" stopColor="var(--hero-prism-cyan)" stopOpacity=".16" />
        <stop offset="1" stopColor="var(--prism-contact)" stopOpacity="0" />
      </linearGradient>
      <filter id={id("penumbra")} filterUnits="userSpaceOnUse" x={left-12} y="-5" width={end-left+24} height={depth+22}>
        <feGaussianBlur stdDeviation="2.2" />
      </filter>
      <filter id={id("bounce")} filterUnits="userSpaceOnUse" x="-6" y="-6" width={r+22} height={r+22}>
        <feGaussianBlur stdDeviation={w*.51} />
      </filter>
      <filter id={id("bleed")} filterUnits="userSpaceOnUse" x="0" y="0" width={r+12} height={r+12}>
        <feGaussianBlur stdDeviation="1.45" />
      </filter>
    </defs>

    <g mask={paint("tab-mask")}>
      <path d={lip} transform="translate(.4 2.3)" stroke={paint("contact")} strokeWidth="3.8" opacity=".58" filter={paint("penumbra")} />
      <path d={face} fill={paint("face")} />
      <path d={lip} stroke={paint("lip")} strokeWidth="1.05" />
      <path d={lip} transform="translate(0 -.64)" stroke={paint("lip-glint")} strokeWidth=".75" />
    </g>

    {!tabOnly && <>
      <path d={ribbon(arc, .025, .965, w*.51, w*.36)} fill="var(--prism-contact)" />
      <path d={ribbon(arc, .095, .92, w*.50, w*.255)} fill="#fff" />
    </>}
    <path d={ribbon(shoulder, 0, 1, .3, 1.26)} fill="var(--prism-contact)" />
    <path d={ribbon(shoulder, .02, .98, -.48, .63)} fill="#fff" fillOpacity=".94" />

    {/* A broad translucent wall makes the long left side read as glass, not as
        a single outline. The narrow highlights describe its two optical faces. */}
    {!tabOnly && <>
      <path d={`M ${w*.56} ${r*.72} V ${geometry.height-r*.72}`} stroke={paint("side-glass")} strokeWidth={w*1.7} opacity=".78" />
      <path d={`M ${w*.28} ${r*.76} V ${geometry.height-r*.76}`} stroke="white" strokeWidth=".8" opacity=".72" />
      <path d={`M ${w*1.12} ${r*.82} V ${geometry.height-r*.82}`} stroke="var(--prism-contact)" strokeWidth=".75" opacity=".38" />
    </>}

    <g opacity="var(--hero-prism-spectrum-opacity)">
      {!tabOnly && <>
        <path d={innerBounce} fill={paint("warm")} opacity=".31" filter={paint("bounce")} />
        <g filter={paint("bleed")} opacity=".32"><path d={warm} fill={paint("warm")} /></g>
        <path d={cool} fill={paint("cold")} /><path d={warm} fill={paint("warm")} />
        <path d={pin} fill="white" opacity=".91" />
      </>}
      <path d={tabRay} fill={paint("split")} stroke={paint("split")} strokeWidth="var(--hero-prism-spectrum-width)" />
      <g transform={`translate(${left + end} 0) scale(-1 1)`} opacity=".8">
        <path d={tabRay} fill={paint("split")} />
      </g>
    </g>
  </g>;
}
