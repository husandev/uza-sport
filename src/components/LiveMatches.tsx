import { liveMatches } from "@/data/mockData";

const LiveMatches = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Jonli natijalar</h2>
          <a href="#" className="text-sm font-medium text-secondary hover:underline">
            Barcha o'yinlar →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {liveMatches.map((match) => (
            <div
              key={match.id}
              className="bg-card rounded-lg border border-border p-4 card-hover cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground">
                  {match.group}
                </span>
                {match.status === "live" && (
                  <span className="flex items-center gap-1 text-xs font-bold text-live">
                    <span className="w-2 h-2 bg-live rounded-full live-pulse" />
                    LIVE {match.minute}
                  </span>
                )}
                {match.status === "upcoming" && (
                  <span className="text-xs font-medium text-muted-foreground">
                    {match.minute}
                  </span>
                )}
                {match.status === "finished" && (
                  <span className="text-xs font-medium text-muted-foreground">
                    Tugadi
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{match.homeFlag}</span>
                    <span className="text-sm font-semibold text-foreground">
                      {match.homeTeam}
                    </span>
                  </div>
                  <span className={`text-lg font-bold font-heading ${
                    match.status === "upcoming" ? "text-muted-foreground" : "text-foreground"
                  }`}>
                    {match.status === "upcoming" ? "-" : match.homeScore}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{match.awayFlag}</span>
                    <span className="text-sm font-semibold text-foreground">
                      {match.awayTeam}
                    </span>
                  </div>
                  <span className={`text-lg font-bold font-heading ${
                    match.status === "upcoming" ? "text-muted-foreground" : "text-foreground"
                  }`}>
                    {match.status === "upcoming" ? "-" : match.awayScore}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveMatches;
