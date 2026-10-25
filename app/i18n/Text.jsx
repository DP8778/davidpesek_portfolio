"use client";

import { Children, createElement, forwardRef } from "react";
import { usePortfolioLanguage } from "./LanguageProvider";
import { localizedHref, translateText } from "./core.mjs";

// No extra DOM node: typography, SVG text and existing layout selectors stay intact.
export function Text({ children }) {
  const { language } = usePortfolioLanguage();
  return Children.map(children, (child) => typeof child === "string" ? translateText(child, language) : child);
}

// Localize accessibility attributes and carry language through ordinary links.
// Forward the real DOM ref so galleries, focus restoration and animation still work.
export const Localized = forwardRef(function Localized({ as = "span", children, ...props }, ref) {
  const { language } = usePortfolioLanguage();
  for (const key of ["alt", "aria-label", "title", "placeholder"]) {
    if (typeof props[key] === "string") props[key] = translateText(props[key], language);
  }
  if (props.href) props.href = localizedHref(props.href, language);
  return createElement(as, { ...props, ref }, children);
});
