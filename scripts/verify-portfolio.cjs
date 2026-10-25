const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const base = process.env.PORTFOLIO_URL || 'http://localhost:4100';
const evidenceDir = process.env.PORTFOLIO_QA_DIR || '/tmp/portfolio-iteration-20261025';
const routes = ['/', '/Portfolio', '/Portfolio/Projekt-no8', '/Portfolio/Lens', '/Portfolio/Typeface', '/Portfolio/Kera-Natur'];
(async () => {
 const browser = await chromium.launch();
 const results = [], links = new Set(), issues = [];
 try {
  await fs.mkdir(evidenceDir, { recursive: true });
  for (const width of [390, 768, 1440]) for (const theme of ['light', 'dark']) {
   const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 }, timezoneId: 'Europe/Prague', locale: 'cs-CZ', reducedMotion: 'reduce' });
   await context.addInitScript(value => localStorage.setItem('dp-portfolio-theme', value), theme);
   const page = await context.newPage(); page.setDefaultTimeout(12000);
   const runtime = []; page.on('pageerror', error => runtime.push(error.message));
   page.on('console', message => { if(message.type()==='error') runtime.push(message.text()); });
   for (const route of routes) {
    const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
    assert.equal(response.status(), 200, route);
    await page.waitForFunction(value => document.querySelector('[data-theme]')?.dataset.theme === value, theme);
    assert.equal(await page.getByRole('heading', { level: 1 }).count(), 1, `${route}: one h1`);
    const overflow = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
    assert.ok(overflow.scroll <= overflow.width, `${route} ${width} ${theme}: overflow ${overflow.scroll}`);
    if (route === '/Portfolio/Typeface') {
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('[data-typeface-preview]').count(), 1, 'one live preview in the study');
      const track = await page.locator('[data-typeface-track]').boundingBox();
      assert.ok(track.y + 64 <= (width === 390 ? 844 : 1000), `Typeface ${width}: symbols visible in the first viewport`);
      assert.ok(await page.locator('main p').first().evaluate(e => parseFloat(getComputedStyle(e).fontSize) >= 17), 'readable intro text');
      assert.ok((await page.locator('h1').evaluate(e => getComputedStyle(e).fontFamily)).includes('Clash Display'));
      assert.equal(await page.locator('[data-typeface-track]').evaluate(e => getComputedStyle(e).animationName), 'none');
      await page.screenshot({ path: `${evidenceDir}/typeface-${width}-${theme}-reduced.png` });
    }
    const anchors = await page.locator('a[href^="#"]').evaluateAll(as => as.map(a => a.getAttribute('href')));
    for (const href of anchors.filter(h => h.length > 1)) assert.equal(await page.locator(`[id="${decodeURIComponent(href.slice(1))}"]`).count() > 0, true, `${route}: missing ${href}`);
    for (const href of await page.locator('a[href]').evaluateAll(as => as.map(a => a.getAttribute('href')).filter(h => h.startsWith('/') && !h.startsWith('//')))) links.add(new URL(href, base).pathname);
    if (route.startsWith('/Portfolio/')) for (const summary of await page.locator('main details > summary').all()) {
      await summary.focus(); await page.keyboard.press('Enter');
      assert.equal(await summary.evaluate(element => element.parentElement.open), true, 'keyboard disclosure');
    }
    for (const img of await page.locator('img').all()) {
      if (!(await img.isVisible())) continue;
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(el => { el.loading = 'eager'; return Promise.race([el.decode().catch(() => {}), new Promise(resolve => setTimeout(resolve, 10000))]); });
      assert.ok(await img.evaluate(el => el.complete && el.naturalWidth > 0), `${route}: broken image ${await img.getAttribute('src')}`);
    }
    if (route === '/') {
      const order = await page.evaluate(() => {
        const work = document.querySelector('#work');
        const typeface = document.querySelector('#typeface');
        const kera = document.querySelector('a[href="/Portfolio/Kera-Natur"]');
        const digital = work?.querySelector('a[href="/Portfolio/Projekt-no8"]');
        const lens = work?.querySelector('a[href="/Portfolio/Lens"]');
        return !!(digital && lens && typeface && kera && (digital.compareDocumentPosition(lens) & Node.DOCUMENT_POSITION_FOLLOWING) && (work.compareDocumentPosition(typeface) & Node.DOCUMENT_POSITION_FOLLOWING) && (typeface.compareDocumentPosition(kera) & Node.DOCUMENT_POSITION_FOLLOWING));
      });
      assert.equal(order, true, 'homepage project order');
    }
    if (route === '/Portfolio') {
      assert.deepEqual(await page.locator('main a h2').allTextContents(), ['Digital Call', 'Lens', 'Typeface', 'Kera Natur']);
      assert.equal(await page.locator('#Web-development').count(), 1, 'legacy return anchor');
    }
    if (route === '/Portfolio/Lens') {
      assert.ok(await page.locator('a[href*="XNGM%3ATTD"]').count());
      assert.ok(await page.locator('a[href*="XNGS%3AAMD"]').count());
    }
    const chapterLinks = page.locator(route === '/Portfolio/Lens' || route === '/Portfolio/Projekt-no8' ? 'nav a[href^="#"]' : 'nav[data-no-chapters] a');
    for (let index = 0; index < await chapterLinks.count(); index++) {
      const link = chapterLinks.nth(index);
      const href = await link.getAttribute('href');
      await link.focus();
      assert.ok(await link.evaluate(element => { const b = element.getBoundingClientRect(); return element.contains(document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2)); }), `${route}: chapter link is uncovered`);
      await page.keyboard.press('Enter');
      await page.waitForFunction(hash => location.hash === hash, href);
      const heading = page.locator(href).locator('h2').first();
      console.log('Checking anchor', route, width, theme, href);
      await page.waitForFunction(element => { const b = element.getBoundingClientRect(); return b.top >= 0 && b.bottom <= innerHeight && element.contains(document.elementFromPoint(b.x + 8, b.y + 8)); }, await heading.elementHandle());
    }
    const enlargements = page.getByRole('button', { name: /Zvětšit/ });
    const imageCount = await enlargements.count();
    for (let index = 0; index < imageCount; index++) {
      const enlarge = enlargements.nth(index);
      await enlarge.focus(); await page.keyboard.press('Enter');
      await page.locator('dialog[open]').waitFor();
      await page.locator('dialog[open] img').evaluate(image => image.decode());
      if (route === '/Portfolio/Lens') assert.ok((await page.locator('dialog[open] img').getAttribute('src')).endsWith(`-${theme}.webp`));
      await page.keyboard.press('Tab');
      assert.ok(await page.evaluate(() => document.activeElement.closest('dialog') !== null));
      await page.keyboard.press('Shift+Tab');
      assert.ok(await page.evaluate(() => document.activeElement.closest('dialog') !== null));
      await page.keyboard.press('Escape');
      // Native close precedes React's close event and focus cleanup.
      await page.waitForFunction(() => !document.querySelector('dialog'));
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
      try { await page.waitForFunction(element => document.activeElement === element, await enlarge.elementHandle()); }
      catch (error) { console.error('Gallery focus', { route, width, theme, index, active: await page.evaluate(() => ({ tag: document.activeElement.tagName, className: document.activeElement.className })) }); throw error; }
    }
    results.push({ route, width, theme, status: 'passed' });
    console.log('Verified', route, width, theme);
   }
   assert.deepEqual(runtime, [], `runtime ${width} ${theme}`);
   await context.close();
  }
  const page = await browser.newPage({ timezoneId: 'Europe/Prague', reducedMotion: 'reduce' });
  for (const pathname of links) {
    const response = await page.request.get(base + pathname);
    if (!response.ok()) issues.push({ pathname, status: response.status() });
  }
  assert.deepEqual(issues, [], 'Internal links and CV');
  // Exercise actual changes through the full project chain, without reseeding storage.
  await page.goto(base + '/');
  await page.getByRole('button', { name: 'Přepnout na tmavý režim', exact: true }).click();
  for (const route of ['/Portfolio/Projekt-no8', '/Portfolio/Lens', '/Portfolio/Typeface', '/Portfolio/Kera-Natur', '/']) {
    await page.goto(base + route, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.querySelector('[data-theme]')?.dataset.theme === 'dark');
  }
  const motion = [];
  for (const width of [390, 768, 1440]) for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width, height: 844 }, timezoneId: 'Europe/Prague', reducedMotion: 'no-preference' });
    await context.addInitScript(value => localStorage.setItem('dp-portfolio-theme', value), theme);
    const page = await context.newPage();
    await page.goto(base + '/Portfolio/Typeface');
    const preview = page.locator('[data-typeface-preview]'), track = page.locator('[data-typeface-track]');
    await page.waitForFunction(() => document.querySelector('[data-typeface-preview]')?.dataset.running === 'true');
    assert.equal(await track.evaluate(e => getComputedStyle(e).animationDuration), '74s');
    assert.equal(await track.evaluate(e => getComputedStyle(e).animationTimingFunction), 'linear');
    const samples = await track.evaluate(element => new Promise(resolve => {
      const positions = [], start = performance.now();
      const sample = () => { positions.push(new DOMMatrixReadOnly(getComputedStyle(element).transform).m41); if (performance.now() - start < 400) requestAnimationFrame(sample); else resolve(positions); };
      requestAnimationFrame(sample);
    }));
    assert.ok(samples.at(-1) - samples[0] > 1, 'motion advances');
    assert.ok(samples.slice(1).every((x, i) => x >= samples[i] - .1 && x - samples[i] < 20), 'motion is continuous');
    await page.getByRole('button', { name: 'Pozastavit animaci', exact: true }).focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('[data-typeface-preview]')?.dataset.running === 'false');
    // Let the compositor commit the CSS pause before comparing positions.
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const paused = await track.evaluate(e => getComputedStyle(e).transform);
    await page.waitForTimeout(200); // Compare positions across real animation frames.
    assert.equal(await track.evaluate(e => getComputedStyle(e).transform), paused);
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('[data-typeface-preview]')?.dataset.running === 'true');
    await page.locator('footer').last().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('[data-typeface-preview]')?.dataset.running === 'false');
    assert.equal(await track.evaluate(e => getComputedStyle(e).animationPlayState), 'paused');
    await preview.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('[data-typeface-preview]')?.dataset.running === 'true');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await track.evaluate(e => getComputedStyle(e).animationName), 'none');
    assert.equal(await page.getByRole('button', { name: 'Pozastavit animaci', exact: true }).count(), 0);
    motion.push({ width, theme, duration: '74s', status: 'passed' });
    await context.close();
  }
  const report = { status: 'passed', base, timezone: 'Europe/Prague', checks: ['36 route/viewport/theme combinations', '390 × 844 first viewport contains Typeface symbols', 'all visible and lazy images', 'internal URLs and CV', 'keyboard chapter anchors', 'one main heading', 'all screenshot galleries: focus trap, Escape, restored focus', 'reduced motion', '74-second continuous motion, keyboard pause, viewport stop/resume in six combinations', 'theme across homepage and four project pages'], internalLinks: links.size, results, motion };
  await fs.writeFile(`${evidenceDir}/verification.json`, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
 } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
