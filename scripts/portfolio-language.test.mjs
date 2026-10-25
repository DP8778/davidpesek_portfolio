import test from "node:test";
import assert from "node:assert/strict";
import { localizedHref, preferredLanguage, translateText } from "../app/i18n/core.mjs";

test("a shared URL overrides a previous visitor preference", () => {
  assert.equal(preferredLanguage("https://example.com/Portfolio/Lens?lang=en#ttd", "cs"), "en");
  assert.equal(preferredLanguage("https://example.com/?lang=cs", "en"), "cs");
  assert.equal(preferredLanguage("https://example.com/?lang=de", "en"), "en");
  assert.equal(preferredLanguage("https://example.com/", null), "cs");
});

test("cross-page links preserve language, other parameters and the chapter", () => {
  assert.equal(localizedHref("/Portfolio/Lens?from=home#ttd", "en"), "/Portfolio/Lens?from=home&lang=en#ttd");
  assert.equal(localizedHref("/Portfolio/Lens?lang=en#ttd", "cs"), "/Portfolio/Lens?lang=cs#ttd");
  assert.equal(localizedHref("#ttd", "en"), "#ttd");
});

test("downloads, contact links and other project websites are unchanged", () => {
  for (const href of ["/CV-DP.pdf", "/digital-call/story-queue-desktop.png", "mailto:example@example.com", "tel:+420000000000", "https://typeface-website-eta.vercel.app/"]) {
    assert.equal(localizedHref(href, "en"), href);
  }
});

test("Lens demos open the matching application language", () => {
  const source = "https://p-2-lens.vercel.app/cs-CZ/assets/twelvedata%3AXNGM%3ATTD";
  const english = source.replace("/cs-CZ/", "/en-US/");
  assert.equal(localizedHref(source, "en"), english);
  assert.equal(localizedHref(english, "cs"), source);
});

test("translation preserves spacing, Czech source copy and unknown names", () => {
  assert.equal(translateText(" Projekty ", "en"), " Projects ");
  assert.equal(translateText("Projekty", "cs"), "Projekty");
  assert.equal(translateText("AMD", "en"), "AMD");
  assert.equal(translateText("constructor", "en"), "constructor");
  assert.equal(translateText(2026, "en"), 2026);
});

test("generated accessibility labels translate both their action and caption", () => {
  assert.equal(translateText("Zvětšit: Mobil: stejná nabídka v přehledném sloupci.", "en"), "Enlarge: Mobile: the same offer in a single column.");
  assert.equal(translateText("Původní symbol Typeface 12", "en"), "Original Typeface symbol 12");
  assert.equal(translateText("Otevřít projekt Lens", "en"), "Open Lens project");
});

test("financial and workflow definitions retain the distinctions the studies explain", () => {
  const ratio = translateText("Gross spend a tržby se překrývají, proto je porovnávám ve stejném měřítku místo koláče. Odvozený poměr 21,62 % pro FY2025 není smluvní sazba ani tržní podíl.", "en");
  assert.match(ratio, /overlap/u);
  assert.match(ratio, /21\.62%/u);
  assert.match(ratio, /neither a contractual fee nor market share/u);
  assert.match(translateText("Makléř přečte poznámku a posune termín na 15:30. Pokus nepřibývá.", "en"), /No call attempt is added/u);
});
