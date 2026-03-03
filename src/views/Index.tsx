import MatchCountdown from "@/components/MatchCountdown";
import HeroSlider from "@/components/HeroSlider";
import NewsFeed from "@/components/NewsFeed";

import GroupStandings from "@/components/GroupStandings";

import VideoPosts from "@/components/VideoPosts";
import PhotoFeed from "@/components/PhotoFeed";
import HeroFootballers from "@/components/HeroFootballers";
import StadiumsSection from "@/components/StadiumsSection";
import TeamsSection from "@/components/TeamsSection";
import SidebarArticles from "@/components/SidebarArticles";

import { StandingsResponse, ScorersResponse } from "@/hooks/queries/useStandings";
import { NextMatchData } from "@/components/MatchCountdown";
import TopScorers from "@/components/TopScorers";
import Link from "next/link";

const Index = ({
  standings,
  nextMatch,
  scorers,
}: {
  standings: StandingsResponse | null;
  nextMatch?: NextMatchData | null;
  scorers?: ScorersResponse | null;
}) => {
  return (
    <>
      <div className="container pt-0 pb-4 space-y-4">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Main grid: left news + center content + right sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: News feed */}
          <div className="lg:col-span-3 space-y-4">
            <NewsFeed />
            {/* Banner */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-accent to-primary p-6 py-8 text-primary-foreground cursor-pointer hover:opacity-90 transition-opacity">
              <div className="text-[10px] uppercase font-heading font-bold tracking-wider opacity-80 mb-1">
                Reklama
              </div>
              <h3 className="font-heading font-extrabold text-base leading-tight mb-2">
                🏆 Superliga 2026 — yangi mavsum!
              </h3>
              <p className="text-[12px] font-body opacity-80 mb-3">
                O'zbekiston Superligasi o'yinlarini jonli tomosha qiling
              </p>
              <div className="bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground text-[12px] font-bold font-heading text-center py-2 rounded-lg">
                Batafsil →
              </div>
            </div>
            <HeroFootballers />
          </div>

          {/* Center: Articles carousel + Video + Stadiums */}
          <div className="lg:col-span-6 space-y-4">
            <MatchCountdown nextMatch={nextMatch} />
            <SidebarArticles />

            <VideoPosts />
            <StadiumsSection />
          </div>

          {/* Right: Standings + Scorers + Players + Articles */}
          <div className="lg:col-span-3 space-y-4">
            <GroupStandings data={standings} />
            <TopScorers scorers={scorers ?? null} />
            {/* Banner */}
            <Link href="https://iticket.uz/" target="_blank" className="block">
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary p-6 py-8 text-primary-foreground cursor-pointer hover:opacity-90 transition-opacity">
                <div className="text-[10px] uppercase font-heading font-bold tracking-wider opacity-80 mb-1">
                  Reklama
                </div>
                <h3 className="font-heading font-extrabold text-base leading-tight mb-2">
                  ⚽ FIFA 2026 chiptalari sotuvda!
                </h3>
                <p className="text-[12px] font-body opacity-80 mb-3">
                  O'zbekiston terma jamoasi o'yinlariga chipta oling
                </p>
                <div className="bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground text-[12px] font-bold font-heading text-center py-2 rounded-lg">
                  Chipta olish →
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Full-width sections */}
        <TeamsSection standings={standings} />
        <PhotoFeed />
      </div>
    </>
  );
};

export default Index;
