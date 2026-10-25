import english from "./en.mjs";

export const LANGUAGE_KEY = "dp-portfolio-language";
export const isLanguage = (value) => value === "cs" || value === "en";
export const normalizeText = (value) => value.normalize("NFC").replace(/\s+/gu, " ").trim();

export function preferredLanguage(href, saved) {
  const explicit = new URL(href, "https://portfolio.invalid").searchParams.get("lang");
  return isLanguage(explicit) ? explicit : isLanguage(saved) ? saved : "cs";
}

// Translate rendered copy only. Names, routes, metrics and source data stay intact.
export function translateText(value, language) {
  if (language !== "en" || typeof value !== "string") return value;
  const key = normalizeText(value);
  let translated = Object.hasOwn(english, key) ? english[key] : undefined;
  if (translated === undefined) {
    const patterns = [
      [/^Zvětšit: (.+)$/u, (text) => `Enlarge: ${translateText(text, language)}`],
      [/^Původní symbol Typeface (\d+)$/u, (number) => `Original Typeface symbol ${number}`],
      [/^(?:Ukázka|Náhled) projektu (.+)$/u, (name) => `Preview of ${translateText(name, language)}`],
      [/^Otevřít projekt (.+)$/u, (name) => `Open ${translateText(name, language)} project`],
      [/^Zobrazit projekt (.+)$/u, (name) => `Show ${translateText(name, language)} project`],
    ];
    for (const [pattern, format] of patterns) {
      const match = key.match(pattern);
      if (match) { translated = format(match[1]); break; }
    }
  }
  if (translated === undefined) return value;
  return `${value.match(/^\s*/u)[0]}${translated}${value.match(/\s*$/u)[0]}`;
}

export function localizedHref(href, language) {
  if (typeof href !== "string") return href;
  // Lens has its own English UI; other project demos retain their own language.
  if (href.startsWith("https://p-2-lens.vercel.app/")) {
    return href.replace(/\/(?:cs-CZ|en-US)(?=\/|$)/u, language === "en" ? "/en-US" : "/cs-CZ");
  }
  if (!href.startsWith("/") || href.startsWith("//") || /\.[a-z\d]+(?:[?#]|$)/iu.test(href)) return href;
  const url = new URL(href, "https://portfolio.invalid");
  url.searchParams.set("lang", language);
  return `${url.pathname}${url.search}${url.hash}`;
}
