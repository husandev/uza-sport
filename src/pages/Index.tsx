import Header from "@/components/Header";
import MatchTicker from "@/components/MatchTicker";
import HeroSection from "@/components/HeroSection";
import NewsFeed from "@/components/NewsFeed";
import GroupStandings from "@/components/GroupStandings";
import TopScorers from "@/components/TopScorers";
import SidebarArticles from "@/components/SidebarArticles";
import VideoPosts from "@/components/VideoPosts";
import PhotoFeed from "@/components/PhotoFeed";
import HeroFootballers from "@/components/HeroFootballers";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Match Ticker - full width dark bar */}
      <MatchTicker />

      {/* Main content */}
      <div className="container py-3">
        {/* Hero articles */}
        <HeroSection />

        {/* Main grid: content + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-4">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-5">
            <NewsFeed />
            <VideoPosts />
            <PhotoFeed />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            <GroupStandings />
            <TopScorers />
            <HeroFootballers />
            <SidebarArticles />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
