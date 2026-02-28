import Header from "@/components/Header";
import MatchTicker from "@/components/MatchTicker";
import Footer from "@/components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MatchTicker />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
