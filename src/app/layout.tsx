import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import MatchTicker from "@/components/MatchTicker";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "UZA WC2026 — JCh-2026 maxsus loyihasi",
  description: "O'zbekiston terma jamoasi va Jahon chempionati 2026 haqida barcha yangiliklar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body>
        <Providers>
          <div className="min-h-screen bg-background">
            <Header />
            <MatchTicker />
            <ScrollToTop />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
