import { matchTickerData } from "@/data/mockData";

const MatchTicker = () => {
  return (
    <div className="w-full">
      {matchTickerData.map((league, li) => (
        <div key={li}>
          {/* League header */}
          <div className="ticker-league-header flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold">
            <span className="flex items-center gap-1.5">
              <span>⚽</span>
              {league.league}
            </span>
            <div className="flex items-center gap-3 text-primary-foreground/70 text-[10px]">
              <a href="#" className="hover:text-primary-foreground">жадвал</a>
              <a href="#" className="hover:text-primary-foreground">тақвим</a>
              <a href="#" className="hover:text-primary-foreground">статистика</a>
            </div>
          </div>

          {/* Matches grid - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {league.matches.map((match) => (
              <div
                key={match.id}
                className="ticker-row flex items-center px-3 py-1.5 cursor-pointer text-[12px] gap-1"
              >
                {/* Time/status */}
                <div className="w-16 shrink-0 text-primary-foreground/50 text-[11px] flex items-center gap-1">
                  {match.live && <span className="live-dot" />}
                  <span className={match.live ? "text-highlight font-semibold text-[11px]" : ""}>
                    {match.live ? match.minute : match.time}
                  </span>
                </div>

                {/* Home team */}
                <div className="flex items-center gap-1 flex-1 min-w-0 justify-end">
                  <span className="text-primary-foreground/90 text-[12px] truncate font-medium">
                    {match.home}
                  </span>
                  <span className="text-sm">{match.hFlag}</span>
                </div>

                {/* Score */}
                <div className="w-12 text-center shrink-0">
                  {match.hScore !== null ? (
                    <span className={`match-score text-[13px] ${match.live ? "match-score-live" : ""}`}>
                      {match.hScore} : {match.aScore}
                    </span>
                  ) : (
                    <span className="text-primary-foreground/30 text-[12px]">– : –</span>
                  )}
                </div>

                {/* Away team */}
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  <span className="text-sm">{match.aFlag}</span>
                  <span className="text-primary-foreground/90 text-[12px] truncate font-medium">
                    {match.away}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchTicker;
