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
            {/* Banner */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary p-5 text-primary-foreground cursor-pointer hover:opacity-90 transition-opacity">
              <div className="text-[10px] uppercase font-heading font-bold tracking-wider opacity-80 mb-1">Реклама</div>
              <h3 className="font-heading font-extrabold text-base leading-tight mb-2">
                ⚽ FIFA 2026 чипталари сотувда!
              </h3>
              <p className="text-[12px] font-body opacity-80 mb-3">
                Ўзбекистон терма жамоаси ўйинларига чипта олинг
              </p>
              <div className="bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground text-[12px] font-bold font-heading text-center py-2 rounded-lg">
                Чипта олиш →
              </div>
            </div>
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
