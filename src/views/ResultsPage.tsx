"use client";
import { useState } from "react";
import GroupStandings from "@/components/GroupStandings";
import { Circle, Timer, CheckCircle2 } from "lucide-react";

type Match = {
  id: number;
  home: string;
  away: string;
  hFlag: string;
  aFlag: string;
  hScore: number | null;
  aScore: number | null;
  time: string;
  live: boolean;
  minute?: string;
  stadium?: string;
};

type MatchDay = {
  round: string;
  date: string;
  group?: string;
  matches: Match[];
};

const matchDays: MatchDay[] = [
  {
    round: "1-tur",
    date: "11 iyun 2026",
    group: "A guruh",
    matches: [
      { id: 1, home: "Meksika", away: "JAR", hFlag: "🇲🇽", aFlag: "🇿🇦", hScore: 2, aScore: 1, time: "tugadi", live: false, stadium: "Azteca Stadium" },
      { id: 2, home: "Janubiy Koreya", away: "UEFA pleyoff D", hFlag: "🇰🇷", aFlag: "🏳️", hScore: 0, aScore: 0, time: "tugadi", live: false, stadium: "Rose Bowl" },
    ],
  },
  {
    round: "1-tur",
    date: "11 iyun 2026",
    group: "B guruh",
    matches: [
      { id: 3, home: "Kanada", away: "UEFA pleyoff A", hFlag: "🇨🇦", aFlag: "🏳️", hScore: 3, aScore: 0, time: "tugadi", live: false, stadium: "BMO Field" },
      { id: 4, home: "Shveytsariya", away: "Qatar", hFlag: "🇨🇭", aFlag: "🇶🇦", hScore: 1, aScore: 1, time: "tugadi", live: false, stadium: "MetLife Stadium" },
    ],
  },
  {
    round: "1-tur",
    date: "12 iyun 2026",
    group: "K guruh",
    matches: [
      { id: 5, home: "Portugaliya", away: "Kolumbiya", hFlag: "🇵🇹", aFlag: "🇨🇴", hScore: 2, aScore: 2, time: "tugadi", live: false, stadium: "Lincoln Financial Field" },
      { id: 6, home: "O'zbekiston", away: "FIFA pleyoff 1", hFlag: "🇺🇿", aFlag: "🏳️", hScore: 3, aScore: 1, time: "tugadi", live: false, stadium: "Hard Rock Stadium" },
    ],
  },
  {
    round: "2-tur",
    date: "15 iyun 2026",
    group: "K guruh",
    matches: [
      { id: 7, home: "O'zbekiston", away: "Argentina", hFlag: "🇺🇿", aFlag: "🇦🇷", hScore: 1, aScore: 2, time: "2-taym", live: true, minute: "67'", stadium: "MetLife Stadium" },
    ],
  },
  {
    round: "2-tur",
    date: "15 iyun 2026",
    group: "E guruh",
    matches: [
      { id: 8, home: "Belgiya", away: "Xorvatiya", hFlag: "🇧🇪", aFlag: "🇭🇷", hScore: 1, aScore: 0, time: "1-taym", live: true, minute: "34'", stadium: "SoFi Stadium" },
      { id: 9, home: "Portugaliya", away: "Urugvay", hFlag: "🇵🇹", aFlag: "🇺🇾", hScore: 0, aScore: 0, time: "1-taym", live: true, minute: "12'", stadium: "Lumen Field" },
    ],
  },
  {
    round: "2-tur",
    date: "15 iyun 2026",
    group: "C guruh",
    matches: [
      { id: 10, home: "Fransiya", away: "Ispaniya", hFlag: "🇫🇷", aFlag: "🇪🇸", hScore: 3, aScore: 1, time: "tugadi", live: false, stadium: "AT&T Stadium" },
      { id: 11, home: "Angliya", away: "Italiya", hFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", aFlag: "🇮🇹", hScore: 2, aScore: 2, time: "tugadi", live: false, stadium: "NRG Stadium" },
    ],
  },
  {
    round: "2-tur",
    date: "16 iyun 2026",
    group: "D guruh",
    matches: [
      { id: 12, home: "AQSh", away: "Paragvay", hFlag: "🇺🇸", aFlag: "🇵🇾", hScore: null, aScore: null, time: "23:00", live: false, stadium: "MetLife Stadium" },
      { id: 13, home: "Avstraliya", away: "UEFA pleyoff C", hFlag: "🇦🇺", aFlag: "🏳️", hScore: null, aScore: null, time: "20:00", live: false, stadium: "Levi's Stadium" },
    ],
  },
  {
    round: "2-tur",
    date: "16 iyun 2026",
    group: "F guruh",
    matches: [
      { id: 14, home: "Braziliya", away: "Germaniya", hFlag: "🇧🇷", aFlag: "🇩🇪", hScore: null, aScore: null, time: "02:00", live: false, stadium: "Rose Bowl" },
      { id: 15, home: "Meksika", away: "Kamerun", hFlag: "🇲🇽", aFlag: "🇨🇲", hScore: null, aScore: null, time: "20:00", live: false, stadium: "Azteca Stadium" },
    ],
  },
];

const rounds = ["Barcha turlar", "1-tur", "2-tur", "3-tur"];

const ResultsPage = () => {
  const [selectedRound, setSelectedRound] = useState("Barcha turlar");

  const filtered = selectedRound === "Barcha turlar"
    ? matchDays
    : matchDays.filter((md) => md.round === selectedRound);

  return (
    <>


      <div className="container pt-4 pb-8">
        <div className="mb-5">
          <div className="section-title">
            <span>Natijalar va taqvim</span>
          </div>
        </div>

        {/* Round filter tabs */}
        <div className="flex items-center gap-1.5 mb-5 overflow-x-auto pb-1">
          {rounds.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRound(r)}
              className={`px-4 py-2 rounded-lg text-[13px] font-bold whitespace-nowrap transition-colors ${
                r === selectedRound
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Match results */}
          <div className="lg:col-span-8 space-y-4">
            {filtered.map((day, dayIdx) => (
              <div key={dayIdx} className="bg-card rounded-2xl shadow-sm overflow-hidden">
                {/* Day/Group header */}
                <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-bold text-foreground">{day.date}</span>
                    {day.group && (
                      <>
                        <span className="text-muted-foreground/40">|</span>
                        <span className="text-[12px] font-semibold text-primary">{day.group}</span>
                      </>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                    {day.round}
                  </span>
                </div>

                {/* Matches */}
                <div className="divide-y divide-border/50">
                  {day.matches.map((match) => {
                    const isFinished = match.time === "tugadi";
                    const isLive = match.live;
                    const isScheduled = !isFinished && !isLive;

                    return (
                      <div
                        key={match.id}
                        className={`px-5 py-4 hover:bg-muted/30 transition-colors cursor-pointer ${
                          isLive ? "bg-destructive/5" : ""
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {/* Status indicator */}
                          <div className="w-[60px] flex-shrink-0 text-center">
                            {isLive && (
                              <div className="flex flex-col items-center gap-0.5">
                                <span className="flex items-center gap-1 text-[10px] font-bold text-destructive uppercase">
                                  <Circle size={6} className="fill-destructive animate-pulse" />
                                  LIVE
                                </span>
                                <span className="text-[11px] font-semibold text-destructive">{match.minute}</span>
                              </div>
                            )}
                            {isFinished && (
                              <span className="text-[11px] font-medium text-muted-foreground">Tugadi</span>
                            )}
                            {isScheduled && (
                              <span className="text-[13px] font-bold text-foreground">{match.time}</span>
                            )}
                          </div>

                          {/* Teams & Score */}
                          <div className="flex-1 min-w-0">
                            {/* Home team */}
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="text-base">{match.hFlag}</span>
                                <span className={`text-[14px] font-semibold truncate ${
                                  isFinished && match.hScore !== null && match.aScore !== null && match.hScore > match.aScore
                                    ? "text-foreground"
                                    : "text-foreground/80"
                                }`}>
                                  {match.home}
                                </span>
                              </div>
                              <span className={`text-[18px] font-extrabold tabular-nums min-w-[28px] text-right ${
                                isLive ? "text-destructive" : match.hScore !== null ? "text-foreground" : "text-muted-foreground"
                              }`}>
                                {match.hScore !== null ? match.hScore : "-"}
                              </span>
                            </div>
                            {/* Away team */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="text-base">{match.aFlag}</span>
                                <span className={`text-[14px] font-semibold truncate ${
                                  isFinished && match.hScore !== null && match.aScore !== null && match.aScore > match.hScore
                                    ? "text-foreground"
                                    : "text-foreground/80"
                                }`}>
                                  {match.away}
                                </span>
                              </div>
                              <span className={`text-[18px] font-extrabold tabular-nums min-w-[28px] text-right ${
                                isLive ? "text-destructive" : match.aScore !== null ? "text-foreground" : "text-muted-foreground"
                              }`}>
                                {match.aScore !== null ? match.aScore : "-"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Stadium */}
                        {match.stadium && (
                          <div className="mt-2 ml-[76px] text-[11px] text-muted-foreground font-body">
                            🏟️ {match.stadium}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="bg-card rounded-2xl shadow-sm p-12 text-center">
                <p className="text-muted-foreground text-[14px]">Bu turda hali o'yinlar yo'q</p>
              </div>
            )}
          </div>

          {/* Right: Standings */}
          <div className="lg:col-span-4 space-y-4">
            <GroupStandings />
          </div>
        </div>
      </div>

    </>
  );
};

export default ResultsPage;
