import "./globals.css";


export const metadata = {
  title: "David Pešek - Portfolio",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        
        {children}
      </body>
    </html>
  );
}
