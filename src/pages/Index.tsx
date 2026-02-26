import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import LiveMatches from "@/components/LiveMatches";
import GroupStandings from "@/components/GroupStandings";
import PhotoFeed from "@/components/PhotoFeed";
import LatestNews from "@/components/LatestNews";
import LatestArticles from "@/components/LatestArticles";
import StadiumsSection from "@/components/StadiumsSection";
import TeamsSection from "@/components/TeamsSection";
import VideoPosts from "@/components/VideoPosts";
import HeroFootballers from "@/components/HeroFootballers";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSlider />
      <LiveMatches />
      <GroupStandings />
      <PhotoFeed />
      <LatestNews />
      <LatestArticles />
      <StadiumsSection />
      <TeamsSection />
      <VideoPosts />
      <HeroFootballers />
      <Footer />
    </div>
  );
};

export default Index;
