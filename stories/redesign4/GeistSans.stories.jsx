import home, { FullPage } from "./Redesign4.stories";
import Redesign4Home from "./Redesign4Home";

export default {
  ...home,
  title: "Redesign_4/Hierarchie písma/01 · Geist Serif + Geist Sans",
  argTypes: { ...home.argTypes, typography: { table: { disable: true } } },
};

export const Hero = {
  name: "Hero",
  args: { ...FullPage.args, only: "hero" },
  render: args => (
    <div style={{ "--hero-intro-family": "var(--font-geist)" }}>
      <Redesign4Home {...args} />
    </div>
  ),
};
