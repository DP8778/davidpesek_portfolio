"use client";

import { useEffect, useState } from "react";
import { prismMaterial, tiles } from "./prismMaterial.mjs";
import styles from "./HeroGlassRim.module.scss";

// Eight narrow live backdrop tiles add real displacement. The baked optical
// profile remains a complete fallback when SVG backdrop filters are unavailable.
export default function PrismWall({ geometry: { width, height, radius, bevel }, uid }) {
  const [material, setMaterial] = useState(null);
  const r = Math.min(radius, width / 2, height / 2);
  useEffect(() => {
    try { setMaterial(prismMaterial(r, bevel)); }
    catch { setMaterial(null); }
  }, [r, bevel]);
  if (!material) return <div className={styles.prismFallback} />;

  const corner = Math.min(r, material.radius);
  const cols = [corner, width - 2 * corner, corner];
  const rows = [corner, height - 2 * corner, corner];
  const id = name => uid + "-lens-" + name;
  return <>
    <svg width="0" height="0" style={{ position: "absolute", width: 0, height: 0 }} focusable="false" aria-hidden="true">
      <defs>
        {tiles.map(([name, col, row]) => <filter key={name} id={id(name)}
          filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse"
          x="0" y="0" width={cols[col]} height={rows[row]} colorInterpolationFilters="sRGB">
          <feImage href={material.maps[name]} x="0" y="0" width={cols[col]} height={rows[row]}
            preserveAspectRatio="none" result="normals" />
          <feDisplacementMap in="SourceGraphic" in2="normals" scale={material.bevel * 3}
            xChannelSelector="R" yChannelSelector="G" />
        </filter>)}
      </defs>
    </svg>
    <div className={styles.prismLens} style={{ "--corner-size": corner + "px" }}>
      {tiles.map(([name, col, row]) => <i key={name} style={{
        gridColumn: col + 1, gridRow: row + 1,
        backdropFilter: "url(#" + id(name) + ")",
        WebkitBackdropFilter: "url(#" + id(name) + ")",
      }} />)}
    </div>
    <div className={styles.prismWall} style={{
      borderImageSource: 'url("' + material.url + '")',
      borderImageSlice: material.slice,
      borderImageWidth: corner + "px",
    }} />
  </>;
}
