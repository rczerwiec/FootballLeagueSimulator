import { eq, and } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { leagueClubStats } from "@/lib/db/schema";
import { newId, insertRow } from "@/lib/db/helpers";
import { mapStats } from "@/lib/db/mappers";
import updateClub from "./updateClubs";

export async function getLeagueClubsStats(leagueId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(leagueClubStats)
    .where(eq(leagueClubStats.leagueId, leagueId));
  return rows.map((r) => mapStats(r));
}

export async function getLeagueClubStats(clubId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(leagueClubStats)
    .where(eq(leagueClubStats.clubId, clubId));
  return rows.map((r) => mapStats(r));
}

export async function createNewLeagueClubStats(body: {
  leagueId: string;
  clubId: string;
  clubName: string;
}) {
  const db = getDb();
  const id = newId();
  await db.insert(leagueClubStats).values(
    insertRow({
      id,
      leagueId: body.leagueId,
      clubId: body.clubId,
      clubName: body.clubName,
    })
  );
  const [row] = await db
    .select()
    .from(leagueClubStats)
    .where(eq(leagueClubStats.id, id))
    .limit(1);
  return mapStats(row!);
}

export async function updateLeagueClubStats(
  leagueId: string,
  clubId: string,
  body: {
    match: {
      clubHome: string;
      clubAway: string;
      scoreHome: number | string;
      scoreAway: number | string;
    };
    club: string;
  }
) {
  const db = getDb();
  const [table] = await db
    .select()
    .from(leagueClubStats)
    .where(
      and(
        eq(leagueClubStats.leagueId, leagueId),
        eq(leagueClubStats.clubId, clubId)
      )
    )
    .limit(1);
  if (!table) return { message: "Table not found" };

  let type: string;
  let home: boolean;
  if (body.club == body.match.clubHome) {
    if (
      parseInt(String(body.match.scoreHome)) >
      parseInt(String(body.match.scoreAway))
    ) {
      type = "winner";
      home = true;
    } else if (
      parseInt(String(body.match.scoreAway)) >
      parseInt(String(body.match.scoreHome))
    ) {
      type = "loser";
      home = true;
    } else {
      type = "draw";
      home = true;
    }
  } else {
    if (
      parseInt(String(body.match.scoreHome)) >
      parseInt(String(body.match.scoreAway))
    ) {
      type = "loser";
      home = false;
    } else if (
      parseInt(String(body.match.scoreAway)) >
      parseInt(String(body.match.scoreHome))
    ) {
      type = "winner";
      home = false;
    } else {
      type = "draw";
      home = false;
    }
  }

  await updateClub(type, home, table, body.match);

  const [updated] = await db
    .select()
    .from(leagueClubStats)
    .where(eq(leagueClubStats.id, table.id))
    .limit(1);
  return mapStats(updated!);
}
