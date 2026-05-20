import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  matches,
  clubs,
  userFriendlyMatches,
  leagueMatches,
  leagueClubStats,
  leagues,
  clubMatches,
} from "@/lib/db/schema";
import { newId, insertRow } from "@/lib/db/helpers";
import { requireUserByFirebaseId } from "@/lib/db/userDb";
import { mapMatch } from "@/lib/db/mappers";
import { calculateTeamsPosition } from "./calculateTeamsPosition";

export async function getAllFriendlyMatches(firebaseUID: string) {
  const db = getDb();
  const user = await requireUserByFirebaseId(firebaseUID);
  const rows = await db
    .select({ match: matches })
    .from(userFriendlyMatches)
    .innerJoin(matches, eq(userFriendlyMatches.matchId, matches.id))
    .where(eq(userFriendlyMatches.userId, user.id));
  return rows.map((r) => mapMatch(r.match));
}

export async function updateLeagueMatch(
  matchId: string,
  body: {
    match: {
      clubHome: string;
      clubAway: string;
      scoreHome: number;
      scoreAway: number;
      complete: boolean;
    };
    winner: string;
    league: { _id: string };
  }
) {
  const db = getDb();

  await db
    .update(matches)
    .set(
      insertRow({
        scoreHome: body.match.scoreHome,
        scoreAway: body.match.scoreAway,
        complete: body.match.complete,
        winnerId: body.winner,
      })
    )
    .where(eq(matches.id, matchId));

  const [clubHome] = await db
    .select()
    .from(clubs)
    .where(eq(clubs.id, body.match.clubHome))
    .limit(1);
  const [clubAway] = await db
    .select()
    .from(clubs)
    .where(eq(clubs.id, body.match.clubAway))
    .limit(1);

  if (clubHome && clubAway) {
    if (body.winner === body.match.clubHome) {
      await db
        .update(clubs)
        .set(insertRow({ wins: clubHome.wins + 1 }))
        .where(eq(clubs.id, clubHome.id));
      await db
        .update(clubs)
        .set(insertRow({ lost: clubAway.lost + 1 }))
        .where(eq(clubs.id, clubAway.id));
    } else if (body.winner === body.match.clubAway) {
      await db
        .update(clubs)
        .set(insertRow({ wins: clubAway.wins + 1 }))
        .where(eq(clubs.id, clubAway.id));
      await db
        .update(clubs)
        .set(insertRow({ lost: clubHome.lost + 1 }))
        .where(eq(clubs.id, clubHome.id));
    } else {
      await db
        .update(clubs)
        .set(insertRow({ draws: clubHome.draws + 1 }))
        .where(eq(clubs.id, clubHome.id));
      await db
        .update(clubs)
        .set(insertRow({ draws: clubAway.draws + 1 }))
        .where(eq(clubs.id, clubAway.id));
    }
  }

  const leagueMatchRows = await db
    .select({ match: matches })
    .from(leagueMatches)
    .innerJoin(matches, eq(leagueMatches.matchId, matches.id))
    .where(eq(leagueMatches.leagueId, body.league._id));

  const tableRows = await db
    .select()
    .from(leagueClubStats)
    .where(eq(leagueClubStats.leagueId, body.league._id));

  let results;
  const allComplete = leagueMatchRows.every((r) => r.match.complete === true);
  if (allComplete) {
    results = calculateTeamsPosition({
      tables: tableRows.map((t) => ({
        points: t.points,
        goalsDif: t.goalsDif,
        wonGames: t.wonGames,
        goalsShot: t.goalsShot,
      })),
    });
    await db
      .update(leagues)
      .set(insertRow({ complete: true }))
      .where(eq(leagues.id, body.league._id));
  }
  return results;
}

export async function createFriendlyMatch(
  firebaseUID: string,
  body: {
    firstClub: { id: string; name: string; players: unknown[] };
    secondClub: { id: string; name: string; players: unknown[] };
  }
) {
  const db = getDb();
  const user = await requireUserByFirebaseId(firebaseUID);
  const matchId = newId();

  await db.insert(matches).values(
    insertRow({
      id: matchId,
      matchType: "Towarzyski",
      clubHomeId: body.firstClub.id,
      clubHomeName: body.firstClub.name,
      clubHomePlayersJson: JSON.stringify(body.firstClub.players),
      clubAwayId: body.secondClub.id,
      clubAwayName: body.secondClub.name,
      clubAwayPlayersJson: JSON.stringify(body.secondClub.players),
      scoreHome: Math.floor(Math.random() * 5) + 1,
      scoreAway: Math.floor(Math.random() * 5) + 1,
      complete: true,
    })
  );

  await db.insert(userFriendlyMatches).values({
    userId: user.id,
    matchId,
  });

  await db.insert(clubMatches).values({ clubId: body.firstClub.id, matchId });
  await db.insert(clubMatches).values({ clubId: body.secondClub.id, matchId });

  const [saved] = await db
    .select()
    .from(matches)
    .where(eq(matches.id, matchId))
    .limit(1);
  return mapMatch(saved!);
}
