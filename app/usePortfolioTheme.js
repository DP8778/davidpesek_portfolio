"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "dp-portfolio-theme";

export default function usePortfolioTheme(initialTheme = "light") {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {
      // The chosen theme still works for this visit when storage is unavailable.
    }

    const syncTheme = (event) => {
      if (event.key === STORAGE_KEY && (event.newValue === "light" || event.newValue === "dark")) {
        setTheme(event.newValue);
      }
    };
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage is optional; keep the in-memory preference.
      }
      return next;
    });
  }, []);

  return [theme, toggleTheme];
}
