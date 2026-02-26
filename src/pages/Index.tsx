import Header from "@/components/Header";
import MatchTicker from "@/components/MatchTicker";
import NewsFeed from "@/components/NewsFeed";
import PhotoArticles from "@/components/PhotoArticles";
import GroupStandings from "@/components/GroupStandings";
import TopScorers from "@/components/TopScorers";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MatchTicker />

      {/* Main 3-column layout like soccer.ru */}
      <div className="container py-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left column - news list */}
          <div className="lg:col-span-2 border-r border-border pr-3">
            <NewsFeed />
          </div>

          {/* Center column - photo articles grid */}
          <div className="lg:col-span-7">
            <PhotoArticles />
          </div>

          {/* Right column - standings */}
          <div className="lg:col-span-3 border-l border-border pl-3">
            <GroupStandings />
            <TopScorers />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
