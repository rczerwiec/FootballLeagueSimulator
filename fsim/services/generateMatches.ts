import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  matches,
  leagueClubStats,
  leagueMatches,
  clubMatches,
  clubPlayers,
  players,
  clubs,
} from "@/lib/db/schema";
import { newId, insertRow } from "@/lib/db/helpers";

interface ClubInput {
  _id: string;
  name: string;
  players?: unknown[];
}

export default async function generateMatches(
  clubList: ClubInput[],
  level: string,
  leagueId: string
) {
  const db = getDb();

  for (let x = 0; x < clubList.length; x++) {
    const home = clubList[x];
    const statsId = newId();
    await db.insert(leagueClubStats).values(
      insertRow({
        id: statsId,
        leagueId,
        clubId: home._id,
        clubName: home.name,
      })
    );

    const homePlayerRows = await db
      .select({ player: players })
      .from(clubPlayers)
      .innerJoin(players, eq(clubPlayers.playerId, players.id))
      .where(eq(clubPlayers.clubId, home._id));

    for (let i = 0; i < clubList.length; i++) {
      if (x === i) continue;
      const away = clubList[i];
      const matchId = newId();

      const awayPlayerRows = await db
        .select({ player: players })
        .from(clubPlayers)
        .innerJoin(players, eq(clubPlayers.playerId, players.id))
        .where(eq(clubPlayers.clubId, away._id));

      await db.insert(matches).values(
        insertRow({
          id: matchId,
          matchType: level,
          clubHomeId: home._id,
          clubHomeName: home.name,
          clubHomePlayersJson: JSON.stringify(
            homePlayerRows.map((r) => r.player.id)
          ),
          clubAwayId: away._id,
          clubAwayName: away.name,
          clubAwayPlayersJson: JSON.stringify(
            awayPlayerRows.map((r) => r.player.id)
          ),
          scoreHome: 0,
          scoreAway: 0,
          complete: false,
        })
      );

      await db.insert(leagueMatches).values({ leagueId, matchId });
      await db.insert(clubMatches).values({ clubId: home._id, matchId });
      await db.insert(clubMatches).values({ clubId: away._id, matchId });
    }
  }
}
