// Procedural optical cross-section for a transparent, nine-sliced wall.
// The centre stays transparent; cost is independent of the rendered panel size.
const RESOLUTION = 4;
const STRAIGHT = 40;
const IOR = 1.50;
const CACHE = new Map();
const clamp = (v, min, max) => Math.max(min, Math.min(v, max));
const bell = (v, center, spread) => Math.exp(-.5 * ((v - center) / spread) ** 2);

function section(x, y, size, r) {
  const px = x - size / 2, py = y - size / 2;
  const qx = Math.abs(px) - (size / 2 - r), qy = Math.abs(py) - (size / 2 - r);
  const dx = Math.max(0, qx), dy = Math.max(0, qy);
  const len = Math.hypot(dx, dy);
  return [
    r - len - Math.min(Math.max(qx, qy), 0),
    len ? Math.sign(px) * dx / len : qx > qy ? Math.sign(px) : 0,
    len ? Math.sign(py) * dy / len : qy >= qx ? Math.sign(py) : 0,
  ];
}

// Multiple unequal reflections describe a curved volume rather than an outline.
export function opticalSample(u, nx, ny, x, y) {
  const key = clamp(.54 - .37 * ny - .12 * nx, .12, 1);
  const along = ny * ny * x + nx * nx * y;
  const strip = clamp(.10 + .84 * bell(along, .34 + .055 * nx, .105)
    + .50 * bell(along, .68 - .035 * ny, .07), 0, 1);
  const rim = bell(u, .14 + .028 * nx, .050 + .042 * strip);
  const returnLight = bell(u, .70 + .075 * ny - .055 * strip, .075);
  const caustic = bell(u, .94 + .035 * nx, .059);
  const cosI = Math.sqrt(clamp(u, 0, 1));
  const fresnel = .04 + .96 * (1 - cosI) ** 5;
  const bounce = bell(u, 1.07, .28) * (.016 + .15 * key * strip ** 2);
  const white = clamp(bounce + rim * (.33 + .39 * key + .32 * strip)
    + returnLight * (.10 + .20 * (1 - key) + .15 * strip)
    + caustic * (.09 + .16 * key) + fresnel * .12 * key, 0, .985);
  const shade = clamp(bell(u, .025, .045) * (.14 + .25 * (1 - key))
    + bell(u, .345 + .055 * nx + .022 * strip, .075 + .022 * strip) * (.16 + .24 * strip)
    + bell(u, .785, .104) * (.09 + .10 * key)
    + bell(u, 1.14, .22) * (.06 + .07 * (1 - key)), 0, .8);
  return [white, shade];
}

// Snell-inspired RG sampling vector. It bends only the substrate inside the wall.
export function lensVector(u, nx, ny) {
  if (u < 0 || u >= 1) return [0, 0];
  const cosI = Math.sqrt(u), sinI = Math.sqrt(1 - u);
  const sinT = sinI / IOR, cosT = Math.sqrt(1 - sinT * sinT);
  const travel = (sinI * cosT - cosI * sinT) / cosT * (1 - u);
  return [(-.79 * nx + .13) * travel, (-.79 * ny + .16) * travel];
}

function makeCanvas(w, h) {
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  return canvas;
}

export const tiles = [
  ["nw", 0, 0], ["n", 1, 0], ["ne", 2, 0],
  ["w", 0, 1],                 ["e", 2, 1],
  ["sw", 0, 2], ["s", 1, 2], ["se", 2, 2],
];

export function prismMaterial(radius, width) {
  const r = clamp(Math.round(radius), 2, 96);
  const bevel = clamp(Math.round(width * 4) / 4, .75, Math.min(14, r * .62));
  const key = r + "/" + bevel;
  if (CACHE.has(key)) return CACHE.get(key);

  const size = 2 * r + STRAIGHT;
  const side = size * RESOLUTION;
  const atlas = makeCanvas(side, side), ctx = atlas.getContext("2d");
  if (!ctx) return null;
  const pixels = ctx.createImageData(side, side), out = pixels.data;
  for (let y = 0; y < side; y++) for (let x = 0; x < side; x++) {
    const sx = (x + .5) / RESOLUTION, sy = (y + .5) / RESOLUTION;
    if (sx > r && sx < size - r && sy > r && sy < size - r) continue;
    const [depth, nx, ny] = section(sx, sy, size, r);
    const u = depth / bevel;
    if (u < 0 || u > 1.8) continue;
    const [white, shade] = opticalSample(u, nx, ny, sx / size, sy / size);
    const a = white + (1 - white) * shade;
    if (a < .002) continue;
    const j = 4 * (y * side + x), k = (1 - white) * shade;
    out[j] = (255 * white + 12 * k) / a;
    out[j + 1] = (254 * white + 15 * k) / a;
    out[j + 2] = (253 * white + 21 * k) / a;
    out[j + 3] = 255 * a;
  }
  ctx.putImageData(pixels, 0, 0);

  const maps = {};
  const origin = [0, r, r + STRAIGHT], extent = [r, STRAIGHT, r];
  for (const [name, col, row] of tiles) {
    const w = col === 1 ? 1 : extent[col] * 2;
    const h = row === 1 ? 1 : extent[row] * 2;
    const tile = makeCanvas(w, h), tc = tile.getContext("2d");
    if (!tc) return null;
    const data = tc.createImageData(w, h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const sx = origin[col] + (x + .5) * extent[col] / w;
      const sy = origin[row] + (y + .5) * extent[row] / h;
      const [d, nx, ny] = section(sx, sy, size, r);
      const [vx, vy] = lensVector(d / bevel, nx, ny);
      const j = 4 * (y * w + x);
      data.data.set([Math.round(128 + 126 * vx), Math.round(128 + 126 * vy), 128, 255], j);
    }
    tc.putImageData(data, 0, 0);
    maps[name] = tile.toDataURL();
  }
  const asset = { url: atlas.toDataURL(), maps, radius: r, slice: r * RESOLUTION, bevel };
  if (CACHE.size >= 6) CACHE.delete(CACHE.keys().next().value);
  CACHE.set(key, asset);
  return asset;
}
