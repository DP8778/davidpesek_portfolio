import redesign, { DigitalCall, Lens, DigitalCallPhone, LensPhone } from "../redesign4/Redesign4Projects.stories";

// These stories render the live case-study components used in Redesign_4.
export default {
  ...redesign,
  title: "Portfolio finál/Projektové podstránky",
};

export const DigitalCallCaseStudy = DigitalCall;
export const LensCaseStudy = Lens;
export const DigitalCallMobile = DigitalCallPhone;
export const LensMobile = LensPhone;
