// Direct screenshots of the deployed Lens source, with optional services unavailable.
const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const sourceRepo = process.env.LENS_REPO || path.resolve(__dirname, '../../P-2_Lens-1');
const sharp = require(path.join(sourceRepo, 'node_modules/sharp'));
const base = process.env.LENS_CAPTURE_URL || 'http://localhost:4101';
const target = path.resolve(__dirname, '../public/lens/2026-10');
const selected = process.env.LENS_CAPTURE_KEYS?.split(',').filter(Boolean);
const live = process.env.LENS_CAPTURE_LIVE === '1';
const preserveFrame = process.env.LENS_CAPTURE_PRESERVE_FRAME === '1';
(async () => {
 const sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: sourceRepo, encoding: 'utf8' }).trim();
 const manifest = JSON.parse(await fs.readFile(path.join(target, 'captures.json'), 'utf8'));
 for (const theme of ['light', 'dark']) for (const record of Object.values(manifest.screens[theme])) record.sourceCommit ||= manifest.sourceCommit;
 const browser = await chromium.launch();
 try {
  const records = [];
  for (const theme of ['light', 'dark']) {
   const context = await browser.newContext({ viewport: { width: 1440, height: 1200 }, locale: 'cs-CZ', timezoneId: 'Europe/Prague', reducedMotion: 'reduce' });
   const page = await context.newPage(); page.setDefaultTimeout(15000);
   // These failures exercise the real fallback UI; statements are server-rendered from the snapshot.
   if (!live) {
    await page.route('**/api/market/**', route => route.fulfill({ status: 503, json: { error: { code: 'UNAVAILABLE', message: 'Optional price service unavailable', retryable: true } } }));
    await page.route('**/api/ai/**', route => route.fulfill({ status: 503, json: { error: { code: 'no_key', message: 'Optional AI unavailable' } } }));
   }
   const go = async symbol => {
    await page.goto(`${base}/cs-CZ/assets/twelvedata%3A${symbol==='TTD'?'XNGM':'XNGS'}%3A${symbol}`, { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: theme === 'light' ? 'Světlý motiv' : 'Tmavý motiv', exact: true }).click();
    await page.getByRole('heading', { level: 1 }).waitFor();
    await page.locator('.company-price-notice').waitFor();
    await page.evaluate(() => document.fonts.ready);
   };
   const capture = async (key, selector) => {
    if (selected && !selected.includes(key)) return;
    const locator = typeof selector === 'string' ? page.locator(selector) : selector;
    await locator.scrollIntoViewIfNeeded();
    let frame;
    if (preserveFrame) {
     const previous = manifest.screens[theme][key];
     const box = await locator.boundingBox();
     if (Math.round(box.width) !== previous.imageWidth || Math.ceil(box.height) > previous.imageHeight) throw new Error(`Changed component no longer fits the original ${key} frame`);
     const scroll = await page.evaluate(() => ({ x: scrollX, y: scrollY }));
     frame = { x: box.x + scroll.x, y: box.y + scroll.y, width: previous.imageWidth, height: previous.imageHeight };
    }
    // Native browser clipping preserves the original frame without resizing pixels.
    const bytes = frame ? await page.screenshot({ fullPage: true, clip: frame, animations: 'disabled' }) : await locator.screenshot({ animations: 'disabled' });
    const filename = `${key}-${theme}.webp`;
    await sharp(bytes).webp({ quality: 94 }).toFile(path.join(target, filename));
    const dimensions = await sharp(bytes).metadata();
    const record = { src: `/lens/2026-10/${filename}`, imageWidth: dimensions.width, imageHeight: dimensions.height, sourceCommit, capturedAt: new Date().toISOString(), url: page.url(), viewport: page.viewportSize(), theme, timezone: 'Europe/Prague', optionalServices: 'unavailable', selector: typeof selector === 'string' ? selector : 'first matching business model card', ...(live && { captureMode: 'public deployment; no request interception' }), ...(frame && { captureFrame: { ...frame, anchor: 'top-left of selector; original image dimensions' } }) };
    manifest.screens[theme][key] = record; records.push({ key, ...record });
   };
   await go('AMD');
   await capture('overview', '.company-history-chart');
   await capture('revenue', '.company-revenue-mix');
   await page.getByRole('button', { name: 'Samostatné grafické karty pro PC', exact: true }).click();
   await capture('market', '.market-position-card');
   await capture('business', '.market-business-models');
   await page.setViewportSize({ width: 390, height: 1000 });
   await capture('mobile', '.revenue-mix-figure');
   await capture('marketMobile', '.market-position-card');
   await capture('businessMobile', page.locator('.market-business-models article').first());
   await page.setViewportSize({ width: 1440, height: 1200 });
   await go('TTD');
   await capture('ttdOverview', '.company-history-chart');
   await capture('ttdEconomics', '.platform-economics');
   await capture('ttdAnatomy', '.financial-anatomy');
   await page.setViewportSize({ width: 390, height: 1000 });
   await capture('ttdMobile', '.company-history-chart');
   await capture('ttdEconomicsMobile', '.platform-economics');
   await context.close();
  }
  if (selected) manifest.lastRefresh = { sourceCommit, capturedAt: new Date().toISOString(), keys: selected };
  else { manifest.sourceCommit = sourceCommit; manifest.capturedAt = new Date().toISOString().slice(0, 10); }
  manifest.productionUrl = 'https://p-2-lens.vercel.app/';
  await fs.writeFile(path.join(target, 'captures.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(JSON.stringify({ status: 'passed', sourceCommit, base, captures: records.length, records }, null, 2));
 } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
