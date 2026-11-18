import Redesign3Home from "../redesign3/Redesign3Home";

// Redesign_4 freezes the selected Redesign_3 composition with Prism Corners
// and uses Geist consistently for both display and body typography.
export default function Redesign4Home(props) {
  return (
    <div data-portfolio-type="geist" style={{ display: "contents" }}>
      <Redesign3Home {...props} heroGlass="prism" />
    </div>
  );
}
