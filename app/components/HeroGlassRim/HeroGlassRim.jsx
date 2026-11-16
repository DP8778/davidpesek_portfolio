"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./HeroGlassRim.module.scss";

// The rim follows the real label, including a longer English translation.
// SVG units are CSS pixels: the bevel keeps its thickness at every viewport.
function contour({ width, height, radius, label }, inset) {
  const r = Math.max(8, radius - inset);
  const right = width - inset;
  const bottom = height - inset;
  const start = Math.max(inset + r + 4, label.left - 10);
  const end = Math.min(right - r - 4, label.right + 10);
  const depth = Math.max(24, label.bottom + 2) + inset / 3;
  const shoulder = 12;
  const bend = 16;

  return [
    `M ${inset + r} ${inset}`,
    `H ${start}`,
    `Q ${start + shoulder} ${inset} ${start + shoulder} ${inset + shoulder}`,
    `V ${depth - bend}`,
    `Q ${start + shoulder} ${depth} ${start + shoulder + bend} ${depth}`,
    `H ${end - shoulder - bend}`,
    `Q ${end - shoulder} ${depth} ${end - shoulder} ${depth - bend}`,
    `V ${inset + shoulder}`,
    `Q ${end - shoulder} ${inset} ${end} ${inset}`,
    `H ${right - r}`,
    `A ${r} ${r} 0 0 1 ${right} ${inset + r}`,
    `V ${bottom - r}`,
    `A ${r} ${r} 0 0 1 ${right - r} ${bottom}`,
    `H ${inset + r}`,
    `A ${r} ${r} 0 0 1 ${inset} ${bottom - r}`,
    `V ${inset + r}`,
    `A ${r} ${r} 0 0 1 ${inset + r} ${inset} Z`,
  ].join(" ");
}

export default function HeroGlassRim({ variant = "prism" }) {
  const ref = useRef(null);
  const uid = useId().replace(/:/g, "");
  const [geometry, setGeometry] = useState(null);

  useEffect(() => {
    const panel = ref.current?.parentElement;
    const label = panel?.querySelector("[data-hero-glass-label]");
    if (!panel || !label) return undefined;
    let frame;
    let disposed = false;

    const measure = () => {
      if (disposed) return;
      const box = panel.getBoundingClientRect();
      const labelBox = label.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const scaleX = panel.clientWidth / box.width;
      const scaleY = panel.clientHeight / box.height;
      const next = {
        width: panel.clientWidth,
        height: panel.clientHeight,
        radius: parseFloat(getComputedStyle(panel).borderTopLeftRadius) || 38,
        label: {
          left: (labelBox.left - box.left) * scaleX,
          right: (labelBox.right - box.left) * scaleX,
          bottom: (labelBox.bottom - box.top) * scaleY,
        },
      };
      setGeometry((previous) => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    const schedule = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(panel);
    observer.observe(label);
    measure();
    document.fonts?.ready.then(schedule);
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [variant]);

  const id = (name) => `${uid}-${name}`;
  const url = (name) => `url(#${id(name)})`;
  const cut = variant === "cut";
  const inset = cut ? 4.5 : 3;
  const corner = geometry ? geometry.radius * 0.5 : 20;
  const tabX = geometry ? geometry.label.right - 1 : 300;

  return (
    <div ref={ref} className={styles.rim} data-glass-rim={variant} aria-hidden="true">
      {geometry && <svg
        viewBox={`0 0 ${geometry.width} ${geometry.height}`}
        style={{ width: "100%", height: "100%", fill: "none", stroke: "none", overflow: "visible" }}
        focusable="false"
      >
        <defs>
          <path id={id("edge")} d={contour(geometry, inset)} />
          <linearGradient id={id("body")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--hero-glass-facet-bright)" />
            <stop offset=".18" stopColor="var(--hero-glass-facet-shadow)" />
            <stop offset=".48" stopColor="var(--hero-glass-facet-mid)" />
            <stop offset=".72" stopColor="var(--hero-glass-facet-shadow)" />
            <stop offset="1" stopColor="var(--hero-glass-facet-bright)" />
          </linearGradient>
          <linearGradient id={id("glint")} x1="0" y1="0" x2=".3" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".98" />
            <stop offset=".24" stopColor="#fff" stopOpacity=".3" />
            <stop offset=".57" stopColor="#fff" stopOpacity=".12" />
            <stop offset=".88" stopColor="#fff" stopOpacity=".4" />
            <stop offset="1" stopColor="#fff" stopOpacity=".7" />
          </linearGradient>
          <linearGradient id={id("spectrum")} gradientUnits="userSpaceOnUse" x1="2" y1="65" x2="64" y2="0">
            <stop offset="0" stopColor="var(--hero-prism-blue)" />
            <stop offset=".3" stopColor="var(--hero-prism-cyan)" />
            <stop offset=".5" stopColor="#eaffff" />
            <stop offset=".64" stopColor="var(--hero-prism-blue)" />
            <stop offset=".76" stopColor="var(--hero-prism-red)" />
            <stop offset=".89" stopColor="var(--hero-prism-gold)" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <linearGradient id={id("tab-spectrum")} gradientUnits="userSpaceOnUse" x1={tabX - 43} y1="42" x2={tabX + 8} y2="3">
            <stop offset="0" stopColor="var(--hero-prism-blue)" />
            <stop offset=".25" stopColor="var(--hero-prism-cyan)" />
            <stop offset=".45" stopColor="var(--hero-prism-blue)" />
            <stop offset=".65" stopColor="var(--hero-prism-red)" />
            <stop offset=".8" stopColor="var(--hero-prism-gold)" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <radialGradient id={id("corner-falloff")} gradientUnits="userSpaceOnUse" cx={corner} cy={corner} r={cut ? 38 : 55}>
            <stop offset=".15" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <radialGradient id={id("tab-falloff")} gradientUnits="userSpaceOnUse" cx={tabX - 10} cy="24" r="38">
            <stop offset=".15" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id={id("corner-mask")}><rect width="100%" height="100%" fill={url("corner-falloff")} /></mask>
          <mask id={id("tab-mask")}><rect width="100%" height="100%" fill={url("tab-falloff")} /></mask>
        </defs>
        <use href={`#${id("edge")}`} className={styles.shadow} />
        <use href={`#${id("edge")}`} className={styles.facet} stroke={url("body")} />
        <use href={`#${id("edge")}`} className={styles.core} stroke={url("glint")} />
        <use href={`#${id("edge")}`} className={styles.refraction} />
        <use href={`#${id("edge")}`} className={styles.hairline} stroke={url("glint")} />
        {cut && <path d={contour(geometry, inset + 3.3)} className={styles.innerFacet} stroke={url("glint")} />}
        <use href={`#${id("edge")}`} className={styles.spectrum} stroke={url("spectrum")} mask={url("corner-mask")} />
        {!cut && <use href={`#${id("edge")}`} className={styles.spectrum} stroke={url("tab-spectrum")} mask={url("tab-mask")} />}
      </svg>}
    </div>
  );
}
