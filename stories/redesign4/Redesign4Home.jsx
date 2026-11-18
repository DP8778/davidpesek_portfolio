import Redesign3Home from "../redesign3/Redesign3Home";

// Redesign_4 freezes the selected Redesign_3 composition with Prism Corners.
// Redesign_3 remains an independent comparison space.
export default function Redesign4Home(props) {
  return <Redesign3Home {...props} heroGlass="prism" />;
}
