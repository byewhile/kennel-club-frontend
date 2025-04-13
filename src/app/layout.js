import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "Клуб собаководства",
  description: "Клуб собаководства",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <ScrollToTop />
        <Header />
        <div className="min-h-[95vh]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
