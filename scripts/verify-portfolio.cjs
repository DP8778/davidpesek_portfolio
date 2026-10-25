const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.PORTFOLIO_URL || 'http://localhost:4100';
const routes = ['/', '/Portfolio', '/Portfolio/Projekt-no8', '/Portfolio/Lens', '/Portfolio/Typeface', '/Portfolio/Kera-Natur'];
(async () => {
 const browser = await chromium.launch();
 const results = [], links = new Set(), issues = [];
 try {
  for (const width of [390, 768, 1440]) for (const theme of ['light', 'dark']) {
   const context = await browser.newContext({ viewport: { width, height: 1000 }, timezoneId: 'Europe/Prague', locale: 'cs-CZ', reducedMotion: 'reduce' });
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
    const anchors = await page.locator('a[href^="#"]').evaluateAll(as => as.map(a => a.getAttribute('href')));
    for (const href of anchors.filter(h => h.length > 1)) assert.equal(await page.locator(`[id="${decodeURIComponent(href.slice(1))}"]`).count() > 0, true, `${route}: missing ${href}`);
    for (const href of await page.locator('a[href]').evaluateAll(as => as.map(a => a.getAttribute('href')).filter(h => h.startsWith('/') && !h.startsWith('//')))) links.add(new URL(href, base).pathname);
    for (const img of await page.locator('img').all()) {
      if (!(await img.isVisible())) continue;
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(el => { el.loading = 'eager'; return Promise.race([el.decode().catch(() => {}), new Promise(resolve => setTimeout(resolve, 10000))]); });
      assert.ok(await img.evaluate(el => el.complete && el.naturalWidth > 0), `${route}: broken image ${await img.getAttribute('src')}`);
    }
    if (route === '/Portfolio/Typeface') {
      assert.ok((await page.locator('body').innerText()).includes('Navrhl jsem logo i vizuální identitu'));
      assert.ok((await page.locator('h1').evaluate(e => getComputedStyle(e).fontFamily)).includes('Clash Display'));
      const track = page.locator('[data-typeface-track]');
      assert.equal(await track.evaluate(e => getComputedStyle(e).animationName), 'none');
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
    const enlarge = page.getByRole('button', { name: /Zvětšit/ }).first();
    if (await enlarge.count()) {
      await enlarge.focus(); await page.keyboard.press('Enter');
      await page.locator('dialog[open]').waitFor();
      await page.keyboard.press('Tab');
      assert.ok(await page.evaluate(() => document.activeElement.closest('dialog') !== null));
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => !document.querySelector('dialog[open]'));
      assert.equal(await enlarge.evaluate(e => document.activeElement === e), true, `${route}: focus restoration`);
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
  console.log(JSON.stringify({ status: 'passed', base, timezone: 'Europe/Prague', checks: ['36 route/viewport/theme combinations', 'all visible and lazy images', 'internal URLs and CV', 'chapter anchors', 'one main heading', 'keyboard gallery, focus trap, Escape, restored focus', 'reduced motion', 'theme across homepage and four project pages'], internalLinks: links.size, results }, null, 2));
 } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
