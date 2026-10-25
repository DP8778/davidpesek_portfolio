import "./globals.css";
import LanguageProvider from "./i18n/LanguageProvider";


export const metadata = {
  title: "David Pešek | UX/UI designér a front-end",
  description: "David Pešek — UX/UI designér s přesahem do front-endu. Weby pro klienty, vlastní aplikace v Reactu a Next.js a vizuální identita.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body
        className={` antialiased`}
      >
        
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
