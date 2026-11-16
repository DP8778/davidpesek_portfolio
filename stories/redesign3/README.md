# Redesign_3 ve Storybooku

Tato varianta sdílí typografické tokeny, obsah a podstránky s aktuálním portfoliem. Oproti `Redesign_2` používá ve výběru projektů sticky rail vlevo a čtyři aktuální projekty (Digital Call, Lens, Typeface, Kera Natur) ve scrollu vpravo. Menší archivní náhledy následují pod nimi. Hero má klikací indikátor s plynulým přechodem; tmavý režim je výchozí. Veřejná homepage dál používá `Redesign_2`.

- `Redesign3Home.jsx` přepíná pouze variantu projektové sekce v `Redesign2Home`.
- `Redesign3.stories.jsx` nabízí celou stránku, tmavý motiv, hero, samostatnou projektovou sekci a responsivní náhledy.
- `Redesign3Projects.stories.jsx` zobrazuje přímo produkční komponenty Digital Call a Lens, včetně Controls pro češtinu/angličtinu a světlý/tmavý motiv.
- Barvy, spacing a dvě hierarchie písma se upravují v `app/portfolio-design.css`.

Spuštění v kořeni repozitáře: `npm run storybook`. V navigaci vyber `Redesign_3`.

## Glass — 02 Prism Corners a 03 Cut Glass

Ve složce `Redesign_3 / Glass` jsou oba materiály ve světlém a tmavém režimu, v celé stránce, na tabletu / telefonu a ve zvětšeném detailu 2×. V Controls lze přepnout materiál, podklad a jazyk.

- **Prism Corners**: tenká čirá hrana, spektrální odlesk jen v levém horním rohu a pravém ohybu jmenného labelu.
- **Cut Glass**: dvě broušené kontury s vnitřní tmavou refrakcí, výraznější tloušťka a jemný studený záblesk.
- Materiál je živá SVG vrstva komponenty `app/components/HeroGlassRim`, nikoli screenshot návrhu. Rozměr rámu a skutečný rozměr labelu sleduje `ResizeObserver`, takže rám navazuje po načtení fontu, přepnutí jazyka i změně viewportu. Dekorace neblokuje ovládání.
- Šířky, barvy a intenzitu odlesků upravuj v `app/portfolio-design.css` v části **SKLENĚNÁ HRANA**. Konstrukční světla a úzké refrakční kontury simulují vzhled skla; obsah se globálně nerozmazává.
- Varianty zapíná prop `heroGlass="prism"` nebo `heroGlass="cut"`. Výchozí hodnota `default` zachovává stávající homepage a starší stories.

Ověření: produkční build Next.js i Storybooku, všechny čtyři kombinace materiálu a motivu v prohlížeči, desktop 1363 px, tablet 768 px a telefon 390 px. Na úzkých náhledech nebylo horizontální přetečení. Přepnutí projektu myší a Enterem, změna motivu a český / delší anglický label fungují; SVG dekorace má `pointer-events: none`.
