import Header from "@/components/Header";
import MatchTicker from "@/components/MatchTicker";
import HeroSlider from "@/components/HeroSlider";
import NewsFeed from "@/components/NewsFeed";

import GroupStandings from "@/components/GroupStandings";

import VideoPosts from "@/components/VideoPosts";
import PhotoFeed from "@/components/PhotoFeed";
import HeroFootballers from "@/components/HeroFootballers";
import StadiumsSection from "@/components/StadiumsSection";
import TeamsSection from "@/components/TeamsSection";
import SidebarArticles from "@/components/SidebarArticles";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MatchTicker />

      <div className="container pt-0 pb-4 space-y-4">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Main grid: left news + center content + right sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: News feed */}
          <div className="lg:col-span-3 space-y-4">
            <NewsFeed />
            <HeroFootballers />
          </div>

          {/* Center: Articles carousel + Video + Stadiums */}
          <div className="lg:col-span-6 space-y-4">
            <SidebarArticles />
            
            <VideoPosts />
            <StadiumsSection />
          </div>

          {/* Right: Standings + Scorers + Players + Articles */}
          <div className="lg:col-span-3 space-y-4">
            <GroupStandings />
          </div>
        </div>

        {/* Full-width sections */}
        <TeamsSection />
        <PhotoFeed />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
