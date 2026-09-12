import Gallery from "../app/Portfolio/components/galery";
import FilterGallery from "../app/Portfolio/components/Fgalery";
import DoublePortfolio from "../app/Portfolio/components/Double-portfolio";
import DoublePortfolioStatic from "../app/Portfolio/components/Double-portfolio copy";
import Video02 from "../app/Portfolio/components/Videodiv2";
import Video03 from "../app/Portfolio/components/Videodiv3";
import Video04 from "../app/Portfolio/components/Videodiv4";
import SvgLines from "../app/Portfolio/components/Svglines";
import SvgLine02 from "../app/Portfolio/components/Svgline2";

export default {
  title: "Portfolio/Media",
  parameters: { layout: "fullscreen" },
};

export const PortfolioGallery = { render: () => <Gallery /> };
export const FilterableGallery = { render: () => <FilterGallery /> };
export const PortfolioIntro = {
  render: () => <DoublePortfolio onScrollToProjectNew={() => {}} onScrollToGallery={() => {}} />,
};
export const PortfolioIntroStatic = { render: () => <DoublePortfolioStatic /> };
export const VideoProject02 = { render: () => <Video02 /> };
export const VideoProject03 = { render: () => <Video03 /> };
export const VideoProject04 = { render: () => <Video04 /> };
export const AnimatedLines = { render: () => <SvgLines /> };
export const AnimatedLine02 = { render: () => <SvgLine02 /> };
