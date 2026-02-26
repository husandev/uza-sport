import { liveMatches } from "@/data/mockData";

const LiveMatches = () => {
  return (
    <div className="compact-card">
      <div className="section-header px-3 pt-3 mx-3">
        <h2 className="section-title">O'yinlar</h2>
        <a href="#" className="section-link">Barchasi →</a>
      </div>

      <div className="divide-y divide-border">
        {liveMatches.map((match) => (
          <div key={match.id} className="px-3 py-2 hover:bg-muted/50 cursor-pointer transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-muted-foreground">{match.group}</span>
              {match.status === "live" && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-live">
                  <span className="w-1.5 h-1.5 bg-live rounded-full live-pulse" />
                  {match.minute}
                </span>
              )}
              {match.status === "upcoming" && (
                <span className="text-[10px] font-medium text-muted-foreground">{match.minute}</span>
              )}
              {match.status === "finished" && (
                <span className="text-[10px] text-muted-foreground">Tugadi</span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                <span className="text-sm">{match.homeFlag}</span>
                <span className="font-semibold text-foreground truncate">{match.homeTeam}</span>
              </div>
              <div className="flex items-center gap-1 px-2">
                <span className={`font-heading font-bold text-sm ${match.status === "upcoming" ? "text-muted-foreground" : "text-foreground"}`}>
                  {match.status === "upcoming" ? "-" : match.homeScore}
                </span>
                <span className="text-muted-foreground text-xs">:</span>
                <span className={`font-heading font-bold text-sm ${match.status === "upcoming" ? "text-muted-foreground" : "text-foreground"}`}>
                  {match.status === "upcoming" ? "-" : match.awayScore}
                </span>
              </div>
              <div className="flex items-center gap-1.5 min-w-0 flex-1 justify-end">
                <span className="font-semibold text-foreground truncate">{match.awayTeam}</span>
                <span className="text-sm">{match.awayFlag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMatches;
