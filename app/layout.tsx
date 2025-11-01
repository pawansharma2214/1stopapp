import Header from "../components/header";
import Footer from "../components/footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ padding: "1rem" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
