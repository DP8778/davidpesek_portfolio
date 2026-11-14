import Redesign2Home from "../redesign_2/Redesign2Home";

// Redesign_3 reuses the same hero, content, colors and tokens. Only the
// presentation of the four selected projects changes to the sticky layout.
export default function Redesign3Home(props) {
  return <Redesign2Home {...props} projectSectionVariant="sticky" />;
}
