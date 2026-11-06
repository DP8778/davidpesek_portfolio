# Portfolio Davida Peška

Next.js 14 App Router, React 18, SCSS. Homepage, archiv a čtyři hlavní projektové studie sdílejí motiv (`dp-portfolio-theme`), palety a hlavičku projektů. Typeface uvnitř ukázek zachovává vlastní vizuální identitu.

Ověřeno s Node.js 24.14.0. Závislosti instalujte přes lockfile:

```sh
npm ci
npm run dev -- --port 4100
```

Vývojový server: http://localhost:4100. Nasazené portfolio: https://davidpesek-portfolio.vercel.app/.

Produkční kontrola používá statický export:

```sh
npm run lint
npm run build
npm start -- --port 4100
```

`npm start` obsluhuje adresář `out` včetně čistých adres, například `/Portfolio/Lens`. `next start` se pro `output: 'export'` nepoužívá. Lint je neinteraktivní; sedm starších projektových stránek má existující upozornění `react-hooks/exhaustive-deps`.

Po spuštění produkčního serveru:

```sh
TZ=Europe/Prague node scripts/verify-portfolio.cjs
TZ=Europe/Prague node scripts/verify-digital-call.cjs
```

Druhý příkaz očekává Digital Call na portu 4102. Pro veřejné prostředí nastavte `PORTFOLIO_URL` nebo `DIGITAL_CALL_URL`. Scénář Digital Call pracuje pouze se syntetickými daty v izolovaném prohlížeči.

Zdroj, verze snímků, provedené kontroly a lokální adresáře jsou v [release review](docs/portfolio-release-review.md). Metadata a snímky aplikací se aktualizují až po ověření jejich skutečného obsahu; finanční hodnoty se nevytvářejí v portfoliu.

## Projekty a typografie

Úvodní výběr, homepage a archiv používají stejný katalog v
[app/Portfolio/projectCatalog.js](app/Portfolio/projectCatalog.js). Karty sdílejí
rozložení; náhledy Digital Call a Lens při najetí nebo při focusu přejedou mezi
existujícími snímky. Typeface používá původní symboly. Při omezeném pohybu
zůstávají náhledy statické.

Stupnice H1–H6 je v [app/globals.css](app/globals.css) a varianty Display a Compact
v [app/portfolio-type.scss](app/portfolio-type.scss). Srovnání je ve Storybooku
(\`npm run storybook\` → Portfolio → Typography).
