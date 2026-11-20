import redesign, { FullPage, FullPageDark, Tablet, Phone } from "../redesign4/Redesign4.stories";

// Reuse the same page, settings and components as Redesign_4; no copied design.
export default {
  ...redesign,
  title: "Portfolio finál/Domovská stránka",
};

export const PrismCorners = { ...FullPage, name: "01 · Celá stránka / Prism Corners" };
export const Dark = { ...FullPageDark, name: "02 · Celá stránka / dark" };
export const TabletView = { ...Tablet, name: "03 · Celá stránka / tablet" };
export const PhoneView = { ...Phone, name: "04 · Celá stránka / telefon" };
