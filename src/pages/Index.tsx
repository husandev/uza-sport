import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import LiveMatches from "@/components/LiveMatches";
import GroupStandings from "@/components/GroupStandings";
import TopScorers from "@/components/TopScorers";
import PhotoFeed from "@/components/PhotoFeed";
import LatestNews from "@/components/LatestNews";
import LatestArticles from "@/components/LatestArticles";
import StadiumsSection from "@/components/StadiumsSection";
import TeamsCompact from "@/components/TeamsCompact";
import VideoPosts from "@/components/VideoPosts";
import HeroFootballers from "@/components/HeroFootballers";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-3">
        {/* Top Row: Hero + Live Matches */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
          <div className="lg:col-span-2">
            <HeroSlider />
          </div>
          <div className="lg:col-span-1">
            <LiveMatches />
          </div>
        </div>

        {/* Middle Row: News + Standings + Scorers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
          <div className="lg:col-span-1">
            <LatestNews />
          </div>
          <div className="lg:col-span-1">
            <GroupStandings />
          </div>
          <div className="lg:col-span-1 space-y-3">
            <TopScorers />
            <HeroFootballers />
          </div>
        </div>

        {/* Row: Photos + Articles + Videos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
          <div className="lg:col-span-1">
            <PhotoFeed />
          </div>
          <div className="lg:col-span-1">
            <LatestArticles />
          </div>
          <div className="lg:col-span-1">
            <VideoPosts />
          </div>
        </div>

        {/* Bottom Row: Stadiums + Teams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <StadiumsSection />
          <TeamsCompact />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
