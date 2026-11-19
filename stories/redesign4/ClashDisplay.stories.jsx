import home, { FullPage } from "./Redesign4.stories";
import Redesign4Home from "./Redesign4Home";

export default {
  ...home,
  title: "Redesign_4/Hierarchie písma/02 · Geist Serif + Clash Display",
  argTypes: { ...home.argTypes, typography: { table: { disable: true } } },
};

export const Hero = {
  name: "Hero",
  args: { ...FullPage.args, only: "hero" },
  render: args => <Redesign4Home {...args} />,
};
