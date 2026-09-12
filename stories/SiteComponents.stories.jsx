import Header from "../app/components/Headertwo";
import HeaderButton from "../app/components/Headertwo/Butt";
import Navigation from "../app/components/Headertwo/Navigation";
import Footer from "../app/components/Footer";
import FooterContent from "../app/components/Footer/Content";
import Preloader from "../app/components/Preloader";
import EmailButton from "../app/components/Imgbuttons/Button1";
import PhoneButton from "../app/components/Imgbuttons/Button2";

const meta = {
  title: "Site/Components",
  parameters: { layout: "fullscreen" },
};

export default meta;

export const HeaderMenu = { render: () => <Header /> };

export const MenuButton = {
  render: () => (
    <div style={{ minHeight: 160, padding: 32, background: "#111" }}>
      <HeaderButton isActive={false} toggleMenu={() => {}} />
    </div>
  ),
};

export const MenuNavigation = {
  render: () => (
    <div style={{ minHeight: 500, padding: 32, background: "#111" }}>
      <Navigation />
    </div>
  ),
};

export const PageFooter = { render: () => <Footer /> };
export const FooterInnerContent = { render: () => <FooterContent /> };
export const LoadingScreen = { render: () => <Preloader /> };

export const EmailContact = {
  render: () => (
    <div style={{ minHeight: 260, padding: 48, background: "#111" }}>
      <EmailButton />
    </div>
  ),
};

export const PhoneContact = {
  render: () => (
    <div style={{ minHeight: 260, padding: 48, background: "#111" }}>
      <PhoneButton />
    </div>
  ),
};
