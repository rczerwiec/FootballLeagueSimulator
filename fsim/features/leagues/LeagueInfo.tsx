import LeagueTable from "./LeagueTable";

function LeagueInfo({ league }) {
  const inSeason = Boolean(league.seasonId);
  return (
    <div>
      {!inSeason && (
        <div className="bg-amber-700/40 border border-amber-500 text-amber-100 rounded p-3 mb-3 text-sm">
          Ta liga nie jest częścią żadnego sezonu. Aby rozegrać mecze, utwórz
          najpierw sezon i przypisz do niego ligę.
        </div>
      )}
      <LeagueTable league={league} disabled={!inSeason} />
    </div>
  );
}

export default LeagueInfo;