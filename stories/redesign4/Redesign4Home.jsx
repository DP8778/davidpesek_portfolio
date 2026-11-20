import Redesign2Home from "../redesign_2/Redesign2Home";

// Keep Prism Corners and Geist while returning to the original project grid.
export default function Redesign4Home(props) {
  return (
    <div data-portfolio-type="geist" style={{ display: "contents" }}>
      <Redesign2Home
        {...props}
        heroGlass="prism"
        heroCopyVariant="structured"
        projectSectionVariant="cards"
        galleryVariant="interactive"
      />
    </div>
  );
}
