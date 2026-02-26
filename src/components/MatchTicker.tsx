import { matchTickerData } from "@/data/mockData";

const MatchTicker = () => {
  return (
    <div className="ticker-wrapper overflow-x-auto">
      <div className="container">
        <div className="flex items-stretch gap-0 min-w-max">
          <div className="flex items-center px-4 py-2.5 text-[11px] font-heading font-bold text-primary-foreground uppercase tracking-wider shrink-0 bg-primary/30 rounded-l-lg">
            ⚽ Жонли
          </div>
          {matchTickerData[0].matches.map((match) => (
            <div
              key={match.id}
              className="flex items-center gap-3 px-4 py-2.5 border-r border-primary-foreground/10 cursor-pointer hover:bg-primary-foreground/5 transition-colors"
            >
              <div className="flex flex-col items-center w-12">
                {match.live ? (
                  <span className="text-highlight font-bold text-[11px] flex items-center gap-1">
                    <span className="live-dot" />
                    {match.minute}
                  </span>
                ) : match.hScore !== null ? (
                  <span className="text-primary-foreground/50 text-[10px] font-body">тугади</span>
                ) : (
                  <span className="text-primary-foreground/70 text-[11px] font-medium font-body">{match.time}</span>
                )}
              </div>

              <div className="flex flex-col text-[12px] leading-snug gap-0.5 font-body">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{match.hFlag}</span>
                  <span className="text-primary-foreground/90 font-semibold min-w-[80px]">{match.home}</span>
                  <span className={`font-bold min-w-[12px] text-center ${match.live ? "text-highlight" : "text-primary-foreground"}`}>
                    {match.hScore ?? "–"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{match.aFlag}</span>
                  <span className="text-primary-foreground/90 font-semibold min-w-[80px]">{match.away}</span>
                  <span className={`font-bold min-w-[12px] text-center ${match.live ? "text-highlight" : "text-primary-foreground"}`}>
                    {match.aScore ?? "–"}
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
