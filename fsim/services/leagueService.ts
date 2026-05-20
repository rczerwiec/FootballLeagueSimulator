import { eq, and } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  leagues,
  userLeagues,
  leagueClubs,
  leagueMatches,
  matches,
  leagueClubStats,
  clubs,
} from "@/lib/db/schema";
import { newId, insertRow } from "@/lib/db/helpers";
import { requireUserByFirebaseId } from "@/lib/db/userDb";
import { mapLeague, mapMatch, mapStats, mapClub } from "@/lib/db/mappers";
import generateMatches from "./generateMatches";

export async function getAllUserLeagues(firebaseUID: string) {
  const db = getDb();
  const user = await requireUserByFirebaseId(firebaseUID);
  const rows = await db
    .select({ league: leagues })
    .from(userLeagues)
    .innerJoin(leagues, eq(userLeagues.leagueId, leagues.id))
    .where(eq(userLeagues.userId, user.id));
  return rows.map((r) => mapLeague(r.league));
}

export async function getLeagueMatches(leagueId: string) {
  const db = getDb();
  const rows = await db
    .select({ match: matches })
    .from(leagueMatches)
    .innerJoin(matches, eq(leagueMatches.matchId, matches.id))
    .where(eq(leagueMatches.leagueId, leagueId));
  return rows.map((r) => mapMatch(r.match));
}

export async function getLeagueTables(leagueId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(leagueClubStats)
    .where(eq(leagueClubStats.leagueId, leagueId));
  return rows.map((r) => mapStats(r));
}

export async function generateLeague(
  firebaseUID: string,
  body: {
    name: string;
    level: string;
    maxTeams: number;
    clubs: string[];
    advances?: number;
    relegation?: number;
  }
) {
  const db = getDb();
  const user = await requireUserByFirebaseId(firebaseUID);
  const leagueId = newId();

  await db.insert(leagues).values(
    insertRow({
      id: leagueId,
      name: body.name,
      level: body.level,
      maxTeams: body.maxTeams,
      complete: false,
      advances: Number(body.advances) || 0,
      relegation: Number(body.relegation) || 0,
    })
  );

  for (const clubId of body.clubs) {
    await db.insert(leagueClubs).values({ leagueId, clubId });
  }
  await db.insert(userLeagues).values({ userId: user.id, leagueId });

  const allClubs = [];
  for (const clubId of body.clubs) {
    const [c] = await db
      .select()
      .from(clubs)
      .where(eq(clubs.id, clubId))
      .limit(1);
    if (c) allClubs.push(mapClub(c));
  }

  await generateMatches(
    allClubs.map((c) => ({ _id: c._id, name: c.name })),
    body.level,
    leagueId
  );

  const [leagueRow] = await db
    .select()
    .from(leagues)
    .where(eq(leagues.id, leagueId))
    .limit(1);

  const populated = mapLeague(leagueRow!);
  return { ...populated, clubs: allClubs };
}

export async function updateLeagueProgression(
  firebaseUID: string,
  leagueId: string,
  body: { advances?: number; relegation?: number }
) {
  const db = getDb();
  const user = await requireUserByFirebaseId(firebaseUID);

  const link = await db
    .select()
    .from(userLeagues)
    .where(
      and(eq(userLeagues.userId, user.id), eq(userLeagues.leagueId, leagueId))
    )
    .limit(1);
  if (link.length === 0) throw new Error("Liga nie należy do użytkownika");

  await db
    .update(leagues)
    .set(
      insertRow({
        advances:
          body.advances === undefined ? undefined : Number(body.advances) || 0,
        relegation:
          body.relegation === undefined
            ? undefined
            : Number(body.relegation) || 0,
      })
    )
    .where(eq(leagues.id, leagueId));

  const [row] = await db
    .select()
    .from(leagues)
    .where(eq(leagues.id, leagueId))
    .limit(1);
  return mapLeague(row!);
}
