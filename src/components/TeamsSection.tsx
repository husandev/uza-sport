"use client";
import Link from "next/link";
import { StandingsResponse } from "@/hooks/queries/useStandings";
import { translateTeamName } from "@/data/teamNamesUzByName";
import { translateRoundName } from "@/data/GroupNameUzTranslate";
import { teams as mockTeams } from "@/data/mockData";

interface Props {
  standings?: StandingsResponse | null;
}

const DISPLAY_COUNT = 12;

const TeamsSection = ({ standings }: Props) => {
  const apiTeams = standings
    ? standings.response[0]?.league.standings
        .flat()
        .slice(0, DISPLAY_COUNT)
        .map((t, i) => ({
          id: i,
          name: translateTeamName(t.team.name),
          logo: t.team.logo,
          group: translateRoundName(t.group),
          rank: t.rank,
          isUzb: t.team.name === "Uzbekistan",
        }))
    : null;

  return (
    <div className="bg-card rounded-2xl px-4 pt-2 pb-4 shadow-sm">
      <div className="section-title">
        <span>Terma jamoalar</span>
        <Link href="/teams" className="more-link">
          Barchasi →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {apiTeams
          ? apiTeams.map((team) => (
              <Link
                key={team.id}
                href={`/team/${team.id}`}
                className={`flex items-center gap-2.5 p-3 rounded-xl border border-border cursor-pointer hover:bg-muted transition-colors ${
                  team.isUzb ? "border-primary bg-primary/5" : ""
                }`}
              >
                {team.logo && (
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-8 h-8 object-contain flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <span className="text-sm font-bold font-heading block leading-tight truncate">
                    {team.name}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-body">
                    {team.group} · #{team.rank}
                  </span>
                </div>
              </Link>
            ))
          : mockTeams.map((team, i) => (
              <Link
                key={team.id}
                href={`/team/${i}`}
                className={`flex items-center p-3 rounded-xl border border-border cursor-pointer hover:bg-muted transition-colors ${
                  team.flag === "🇺🇿" ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="min-w-0">
                  <span className="text-sm font-bold font-heading block leading-tight truncate">
                    {team.name}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-body">
                    {team.group} guruh · #{team.rank}
                  </span>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default TeamsSection;
