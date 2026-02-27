import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import MatchTicker from "@/components/MatchTicker";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MatchTicker />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
