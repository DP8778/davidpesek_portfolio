import "./globals.css";


export const metadata = {
  title: "David Pešek - Portfolio",
  description: "Portfolio Davida Peška: UX/UI design, produktové case studies a funkční front-end prototypy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body
        className={` antialiased`}
      >
        
        {children}
      </body>
    </html>
  );
}
