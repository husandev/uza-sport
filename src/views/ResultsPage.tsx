"use client";
import { useState } from "react";
import GroupStandings from "@/components/GroupStandings";
import { StandingsResponse } from "@/hooks/queries/useStandings";
import { FixturesResponse, AFFixture } from "@/hooks/queries/useFixtures";
import { teamNamesUzByName } from "@/data/teamNamesUzByName";
import { Circle } from "lucide-react";

const LIVE_STATUSES = ["1H", "2H", "HT", "ET", "BT", "P", "INT", "SUSP", "LIVE"];
const FINISHED_STATUSES = ["FT", "AET", "PEN", "AWD", "WO"];

const months = ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentabr","oktabr","noyabr","dekabr"];

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function formatRound(round: string) {
  if (round.startsWith("Group Stage - ")) return `${round.replace("Group Stage - ", "")}-tur`;
  const map: Record<string, string> = {
    "Round of 32": "1/32 final",
    "Round of 16": "1/8 final",
    "Quarter-finals": "Chorak final",
    "Semi-finals": "Yarim final",
    "3rd Place Final": "Bronza uchun",
    "Final": "Final",
  };
  return map[round] ?? round;
}

function getLiveLabel(fixture: AFFixture) {
  const { short, elapsed } = fixture.fixture.status;
  if (short === "HT") return "Tanaffus";
  if (elapsed !== null) return `${elapsed}'`;
  return "JONLI";
}

function getDateKey(iso: string) {
  return iso.slice(0, 10);
}

interface Props {
  standings: StandingsResponse | null;
  fixtures: FixturesResponse | null;
}

const ResultsPage = ({ standings, fixtures }: Props) => {
  const allFixtures = fixtures?.response ?? [];

  // Collect unique rounds in order
  const roundOrder = Array.from(new Set(allFixtures.map((f) => f.league.round)));

  const [selectedRound, setSelectedRound] = useState<string | null>(null);

  const activeRound = selectedRound ?? roundOrder[0] ?? null;

  const filtered = activeRound
    ? allFixtures.filter((f) => f.league.round === activeRound)
    : allFixtures;

  // Group by date
  const byDate: Record<string, AFFixture[]> = {};
  filtered.forEach((f) => {
    const key = getDateKey(f.fixture.date);
    if (!byDate[key]) byDate[key] = [];
    byDate[key].push(f);
  });
  const dateGroups = Object.entries(byDate).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="container pt-4 pb-8">
      <div className="mb-5">
        <div className="section-title">
          <span>Natijalar va taqvim</span>
        </div>
      </div>

      {/* Round filter tabs */}
      {roundOrder.length > 0 && (
        <div className="flex items-center gap-1.5 mb-5 overflow-x-auto pb-1">
          {roundOrder.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRound(r)}
              className={`px-4 py-2 rounded-lg text-[13px] font-bold whitespace-nowrap transition-colors ${
                r === activeRound
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              }`}
            >
              {formatRound(r)}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Match results */}
        <div className="lg:col-span-8 space-y-4">
          {!fixtures && (
            <div className="bg-card rounded-2xl shadow-sm p-12 text-center">
              <p className="text-muted-foreground text-[14px]">Ma'lumot yuklanmadi</p>
            </div>
          )}

          {dateGroups.map(([dateKey, dayFixtures]) => (
            <div key={dateKey} className="bg-card rounded-2xl shadow-sm overflow-hidden">
              {/* Day header */}
              <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                <span className="text-[13px] font-bold text-foreground">
                  {formatDate(dayFixtures[0].fixture.date)}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                  {formatRound(dayFixtures[0].league.round)}
                </span>
              </div>

              {/* Matches */}
              <div className="divide-y divide-border/50">
                {dayFixtures.map((f) => {
                  const status = f.fixture.status.short;
                  const isLive = LIVE_STATUSES.includes(status);
                  const isFinished = FINISHED_STATUSES.includes(status);
                  const isScheduled = !isLive && !isFinished;
                  const homeName = teamNamesUzByName[f.teams.home.name] ?? f.teams.home.name;
                  const awayName = teamNamesUzByName[f.teams.away.name] ?? f.teams.away.name;

                  return (
                    <div
                      key={f.fixture.id}
                      className={`px-5 py-4 hover:bg-muted/30 transition-colors cursor-pointer ${isLive ? "bg-destructive/5" : ""}`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Status */}
                        <div className="w-[60px] flex-shrink-0 text-center">
                          {isLive && (
                            <div className="flex flex-col items-center gap-0.5">
                              <span className="flex items-center gap-1 text-[10px] font-bold text-destructive uppercase">
                                <Circle size={6} className="fill-destructive animate-pulse" />
                                JONLI
                              </span>
                              <span className="text-[11px] font-semibold text-destructive">
                                {getLiveLabel(f)}
                              </span>
                            </div>
                          )}
                          {isFinished && (
                            <span className="text-[11px] font-medium text-muted-foreground">Tugadi</span>
                          )}
                          {isScheduled && (
                            <span className="text-[13px] font-bold text-foreground">{formatTime(f.fixture.date)}</span>
                          )}
                        </div>

                        {/* Teams & Score */}
                        <div className="flex-1 min-w-0">
                          {/* Home */}
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img src={f.teams.home.logo} alt={homeName} className="w-5 h-5 object-contain flex-shrink-0" />
                              <span className={`text-[14px] font-semibold truncate ${
                                isFinished && f.teams.home.winner ? "text-foreground" : "text-foreground/80"
                              }`}>
                                {homeName}
                              </span>
                            </div>
                            <span className={`text-[18px] font-extrabold tabular-nums min-w-[28px] text-right ${
                              isLive ? "text-destructive" : f.goals.home !== null ? "text-foreground" : "text-muted-foreground"
                            }`}>
                              {f.goals.home !== null ? f.goals.home : "-"}
                            </span>
                          </div>
                          {/* Away */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img src={f.teams.away.logo} alt={awayName} className="w-5 h-5 object-contain flex-shrink-0" />
                              <span className={`text-[14px] font-semibold truncate ${
                                isFinished && f.teams.away.winner ? "text-foreground" : "text-foreground/80"
                              }`}>
                                {awayName}
                              </span>
                            </div>
                            <span className={`text-[18px] font-extrabold tabular-nums min-w-[28px] text-right ${
                              isLive ? "text-destructive" : f.goals.away !== null ? "text-foreground" : "text-muted-foreground"
                            }`}>
                              {f.goals.away !== null ? f.goals.away : "-"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Venue */}
                      {f.fixture.venue.name && (
                        <div className="mt-2 ml-[60px] sm:ml-[76px] text-[11px] text-muted-foreground font-body">
                          🏟️ {f.fixture.venue.name}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {fixtures && dateGroups.length === 0 && (
            <div className="bg-card rounded-2xl shadow-sm p-12 text-center">
              <p className="text-muted-foreground text-[14px]">Bu turda hali o'yinlar yo'q</p>
            </div>
          )}
        </div>

        {/* Right: Standings */}
        <div className="lg:col-span-4 space-y-4">
          <GroupStandings data={standings} />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
