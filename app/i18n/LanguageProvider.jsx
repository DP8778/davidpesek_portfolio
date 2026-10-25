"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { isLanguage, LANGUAGE_KEY, preferredLanguage, translateText } from "./core.mjs";
import metadata from "./metadata.json";

const LanguageContext = createContext({ language: "cs", setLanguage: () => {} });
export const usePortfolioLanguage = () => useContext(LanguageContext);

export default function LanguageProvider({ children }) {
  const [language, updateLanguage] = useState("cs");
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  const setLanguage = useCallback((next) => {
    if (!isLanguage(next)) return;
    updateLanguage(next);
    try { window.localStorage.setItem(LANGUAGE_KEY, next); } catch { /* URL keeps the choice when storage is blocked. */ }
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  useEffect(() => {
    let saved;
    try { saved = window.localStorage.getItem(LANGUAGE_KEY); } catch { /* Storage is optional. */ }
    const initial = preferredLanguage(window.location.href, saved);
    updateLanguage(initial);
    setReady(true);
    const explicit = new URL(window.location.href).searchParams.get("lang");
    if (isLanguage(explicit)) {
      try { window.localStorage.setItem(LANGUAGE_KEY, explicit); } catch { /* Keep the URL preference. */ }
    }
    const onPopState = () => {
      updateLanguage((current) => preferredLanguage(window.location.href, current));
    };
    const onStorage = (event) => {
      if (event.key === LANGUAGE_KEY && isLanguage(event.newValue)) setLanguage(event.newValue);
    };
    window.addEventListener("popstate", onPopState);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("storage", onStorage);
    };
  }, [setLanguage]);

  useEffect(() => {
    if (!ready) return;
    const explicit = new URL(window.location.href).searchParams.get("lang");
    if (isLanguage(explicit) && explicit !== language) updateLanguage(explicit);
  }, [language, pathname, ready]); // A Next Link may carry an explicit language on navigation.

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = language;
    const page = metadata[(pathname || "/").replace(/\/$/u, "") || "/"] || metadata["/Portfolio"];
    if (page) {
      document.title = translateText(page.title, language);
      const description = document.querySelector('meta[name="description"]');
      if (description) description.content = translateText(page.description, language);
    }
  }, [language, pathname, ready]);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
