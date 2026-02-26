import { matchTickerData } from "@/data/mockData";

const MatchTicker = () => {
  return (
    <div className="bg-muted border-b border-border overflow-x-auto">
      <div className="container">
        <div className="flex items-center gap-0 min-w-max">
          {matchTickerData[0].matches.map((match) => (
            <div
              key={match.id}
              className="flex items-center gap-2 px-3 py-1.5 border-r border-border cursor-pointer hover:bg-border/50 transition-colors text-[11px]"
            >
              {/* Status */}
              <div className="flex flex-col items-center w-10">
                {match.live ? (
                  <span className="text-live font-bold flex items-center gap-1">
                    <span className="live-dot" />
                    {match.minute}
                  </span>
                ) : match.hScore !== null ? (
                  <span className="text-muted-foreground">тугади</span>
                ) : (
                  <span className="text-muted-foreground">{match.time}</span>
                )}
              </div>

              {/* Teams & score */}
              <div className="flex flex-col text-[11px] leading-tight gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span>{match.hFlag}</span>
                  <span className="font-medium w-8">{match.home}</span>
                  <span className={`font-bold w-3 text-center ${match.live ? "text-live" : ""}`}>
                    {match.hScore ?? "-"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>{match.aFlag}</span>
                  <span className="font-medium w-8">{match.away}</span>
                  <span className={`font-bold w-3 text-center ${match.live ? "text-live" : ""}`}>
                    {match.aScore ?? "-"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchTicker;
