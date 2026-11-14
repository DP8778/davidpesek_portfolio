# Redesign_3 ve Storybooku

Tato varianta sdílí hero, typografické tokeny, motivy, obsah a podstránky s aktuálním portfoliem. Oproti `Redesign_2` používá ve výběru projektů sticky rail vlevo a čtyři aktuální projekty (Digital Call, Lens, Typeface, Kera Natur) ve scrollu vpravo. Menší archivní náhledy následují pod nimi. Veřejná homepage dál používá `Redesign_2`.

- `Redesign3Home.jsx` přepíná pouze variantu projektové sekce v `Redesign2Home`.
- `Redesign3.stories.jsx` nabízí celou stránku, tmavý motiv, hero, samostatnou projektovou sekci a responsivní náhledy.
- `Redesign3Projects.stories.jsx` zobrazuje přímo produkční komponenty Digital Call a Lens, včetně Controls pro češtinu/angličtinu a světlý/tmavý motiv.
- Barvy, spacing a dvě hierarchie písma se upravují v `app/portfolio-design.css`.

Spuštění v kořeni repozitáře: `npm run storybook`. V navigaci vyber `Redesign_3`.
