import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { leagueClubStats } from "@/lib/db/schema";
import { insertRow } from "@/lib/db/helpers";

interface MatchBody {
  scoreHome: number | string;
  scoreAway: number | string;
}

interface TableDoc {
  id: string;
  playedGames: number;
  wonGames: number;
  drawGames: number;
  lostGames: number;
  goalsShot: number;
  goalsLost: number;
  goalsDif: number;
  points: number;
}

const updateGoalsShot = (home: boolean, table: TableDoc, match: MatchBody) => {
  if (home) return table.goalsShot + parseInt(String(match.scoreHome));
  return table.goalsShot + parseInt(String(match.scoreAway));
};

const updateGoalsLost = (home: boolean, table: TableDoc, match: MatchBody) => {
  if (home) return table.goalsLost + parseInt(String(match.scoreAway));
  return table.goalsLost + parseInt(String(match.scoreHome));
};

const updateGoalsDif = (home: boolean, table: TableDoc, match: MatchBody) => {
  if (home) {
    return (
      table.goalsShot +
      parseInt(String(match.scoreHome)) -
      (table.goalsLost + parseInt(String(match.scoreAway)))
    );
  }
  return (
    table.goalsShot +
    parseInt(String(match.scoreAway)) -
    (table.goalsLost + parseInt(String(match.scoreHome)))
  );
};

const updatePoints = (type: string, table: TableDoc) => {
  if (type === "winner") return table.points + 3;
  if (type === "loser") return table.points;
  return table.points + 1;
};

const updateClub = async (
  type: string,
  home: boolean,
  table: TableDoc,
  match: MatchBody
) => {
  const db = getDb();
  await db
    .update(leagueClubStats)
    .set(
      insertRow({
        playedGames: table.playedGames + 1,
        wonGames: type === "winner" ? table.wonGames + 1 : table.wonGames,
        drawGames: type === "draw" ? table.drawGames + 1 : table.drawGames,
        lostGames: type === "loser" ? table.lostGames + 1 : table.lostGames,
        goalsShot: updateGoalsShot(home, table, match),
        goalsLost: updateGoalsLost(home, table, match),
        goalsDif: updateGoalsDif(home, table, match),
        points: updatePoints(type, table),
      })
    )
    .where(eq(leagueClubStats.id, table.id));
};

export default updateClub;
