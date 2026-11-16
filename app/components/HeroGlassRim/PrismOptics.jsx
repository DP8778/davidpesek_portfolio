// Prism Corners: a closed outer pane and a separate, shallow lip under the name.
// All measurements are local CSS pixels, even in the zoomed Storybook detail.
export function prismGeometry({ width, height, radius, label }) {
  const inset = Math.min(2.1, width / 8, height / 8);
  const radiusAt = (offset) => Math.max(0, Math.min(radius, width / 2, height / 2) - offset);
  const depth = Math.min(height / 2, Math.max(inset + 2, label.bottom));
  const left = Math.max(inset, label.left);
  const end = Math.max(left + 1, Math.min(label.right + 17, width - radiusAt(inset) - inset));
  const bend = Math.min(30, (end - left) / 3, depth * .9);
  const start = end - 2 * bend;
  const elbow = Math.min(12, (start - left) / 2, depth / 2);
  const curve = `C ${start + bend * 1.4} ${depth} ${end - bend * 1.4} ${inset + .5} ${end} ${inset + .5}`;
  const shoulder = `M ${start} ${depth} ${curve}`;
  const lip = `M ${left} ${depth - elbow} Q ${left + 1.5} ${depth} ${left + elbow} ${depth} H ${start} ${curve}`;
  const face = lip + ` L ${end} ${inset} H ${left} Z`;
  const corner = (offset) => {
    const r = radiusAt(offset);
    return `M ${offset} ${r + offset + 4} v -4 A ${r} ${r} 0 0 1 ${r + offset} ${offset} h 6`;
  };
  return { inset, depth, left, end, start, lip, face, shoulder, corner, radiusAt };
}

export default function PrismOptics({ geometry, uid }) {
  const { width, height } = geometry;
  const { inset, depth, left, end, start, lip, face, shoulder, corner, radiusAt } = prismGeometry(geometry);
  const id = (key) => `${uid}-prism-${key}`;
  const paint = (key) => `url(#${id(key)})`;
  const rimRect = (offset) => ({
    x: offset, y: offset, width: width - 2 * offset, height: height - 2 * offset, rx: radiusAt(offset),
  });
  const cornerLight = { gradientUnits: "userSpaceOnUse", x1: inset, y1: radiusAt(inset), x2: radiusAt(inset) + inset, y2: inset };
  const tabLight = { gradientUnits: "userSpaceOnUse", x1: start, y1: depth, x2: end, y2: inset };

  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id={id("facet")} x2="55%" y2="100%">
          <stop stopColor="var(--hero-glass-facet-mid)" stopOpacity=".65" />
          <stop offset=".24" stopColor="var(--hero-glass-facet-bright)" stopOpacity=".38" />
          <stop offset=".7" stopColor="var(--hero-glass-facet-shadow)" stopOpacity=".5" />
          <stop offset="1" stopColor="var(--hero-glass-facet-bright)" stopOpacity=".84" />
        </linearGradient>
        <linearGradient id={id("shine")} x2="22%" y2="100%">
          <stop stopColor="#fff" stopOpacity=".96" /><stop offset=".24" stopColor="#fff" stopOpacity=".12" />
          <stop offset=".7" stopColor="#fff" stopOpacity=".06" /><stop offset="1" stopColor="#fff" stopOpacity=".78" />
        </linearGradient>
        <linearGradient id={id("face")} x2="0" y2="100%">
          <stop stopColor="var(--prism-tab-top)" /><stop offset=".55" stopColor="var(--prism-surface)" />
          <stop offset="1" stopColor="var(--prism-tab-foot)" />
        </linearGradient>
        <linearGradient id={id("lip")} gradientUnits="userSpaceOnUse" x1={left} x2={end} y1="0" y2="0">
          <stop stopColor="var(--prism-lip-color)" stopOpacity="0" />
          <stop offset=".12" stopColor="var(--prism-lip-color)" stopOpacity=".5" />
          <stop offset=".8" stopColor="var(--prism-lip-color)" stopOpacity=".82" />
          <stop offset="1" stopColor="var(--prism-lip-color)" stopOpacity=".12" />
        </linearGradient>
        <linearGradient id={id("cool")} {...cornerLight}>
          <stop stopColor="var(--hero-prism-cyan)" stopOpacity="0" />
          <stop offset=".20" stopColor="var(--hero-prism-cyan)" stopOpacity=".25" />
          <stop offset=".42" stopColor="var(--hero-prism-cyan)" />
          <stop offset=".68" stopColor="var(--hero-prism-blue)" />
          <stop offset=".94" stopColor="var(--hero-prism-blue)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("warm")} {...cornerLight}>
          <stop stopColor="var(--hero-prism-gold)" stopOpacity="0" />
          <stop offset=".23" stopColor="var(--hero-prism-gold)" />
          <stop offset=".54" stopColor="var(--hero-prism-red)" />
          <stop offset=".83" stopColor="var(--hero-prism-red)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("return")} {...tabLight}>
          <stop stopColor="var(--hero-prism-cyan)" stopOpacity="0" />
          <stop offset=".18" stopColor="var(--hero-prism-cyan)" /><stop offset=".38" stopColor="var(--hero-prism-blue)" />
          <stop offset=".54" stopColor="var(--prism-lip-color)" />
          <stop offset=".69" stopColor="var(--hero-prism-red)" /><stop offset=".8" stopColor="var(--hero-prism-gold)" />
          <stop offset="1" stopColor="var(--hero-prism-gold)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Opaque face hides the grid under the HTML name. The lower return is
          thin and fades at the left; it never cuts into the upper perimeter. */}
      <path d={lip} transform="translate(0 1.5)" stroke={paint("lip")} strokeWidth="2.8" opacity=".13" />
      <path d={face} fill={paint("face")} />
      <path d={lip} stroke={paint("lip")} strokeWidth=".8" />
      <path d={lip} transform="translate(0 -.65)" stroke={paint("shine")} strokeWidth=".55" />

      <rect {...rimRect(inset)} stroke={paint("facet")} strokeWidth="var(--hero-prism-edge-width)" />
      <rect {...rimRect(.7)} stroke="var(--prism-lip-color)" strokeOpacity=".3" strokeWidth=".55" />
      <rect {...rimRect(inset - .5)} stroke={paint("shine")} strokeWidth="1.1" />
      <rect {...rimRect(inset + 1.65)} stroke="var(--hero-glass-refraction)" strokeOpacity=".34" strokeWidth=".7" />

      {/* Two offset glints follow just the arc. There is no rainbow gradient on
          the straight perimeter or along the entire bottom of the name tab. */}
      <g opacity="var(--hero-prism-spectrum-opacity)">
        <path d={corner(inset - .35)} stroke={paint("cool")} strokeWidth="var(--hero-prism-spectrum-width)" />
        <path d={corner(inset + 1.05)} stroke={paint("warm")} strokeWidth=".95" />
        <path d={shoulder} stroke={paint("return")} strokeWidth="var(--hero-prism-spectrum-width)" />
      </g>
    </g>
  );
}
