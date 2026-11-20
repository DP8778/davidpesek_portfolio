import { digitalCallProject } from "./digitalCallProject";
import { lensProject } from "./lensProject";
import { typefaceProject } from "./typefaceProject";
import { keraNaturProject } from "./keraNaturProject";

// Existing captures keep their original app data and language. A second frame
// shows a distinct step of the workflow; the previews are not live embeds.
export const selectedProjects = [
  {
    ...digitalCallProject,
    id: "digital-call",
    galleryTitle: "Digital Call case study",
    kind: "Produktová studie",
    preview: { next: "/digital-call/handoff-detail-desktop.png" },
  },
  {
    ...lensProject,
    id: "lens",
    galleryTitle: "Lens case study",
    kind: "Produktová studie",
    preview: {
      dark: "/lens/2026-10/overview-dark.webp",
      next: "/lens/2026-10/revenue-light.webp",
      nextDark: "/lens/2026-10/revenue-dark.webp",
    },
  },
  {
    ...typefaceProject,
    id: "typeface",
    galleryTitle: "Typeface website",
    kind: "Vizuální identita a web",
    image: "/typeface/2026-10/home-desktop.webp",
    preview: { typeface: true },
  },
  {
    ...keraNaturProject,
    id: "kera-natur",
    galleryTitle: "KeraNatur web / e-shop",
    kind: "Komerční web",
  },
];
