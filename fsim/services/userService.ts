import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { users, userLeagues } from "@/lib/db/schema";
import { createUserRecord, findUserByFirebaseId } from "@/lib/db/userDb";
import { mapUser } from "@/lib/db/mappers";
import { leagues } from "@/lib/db/schema";

export async function createUser(body: {
  user: { uid: string; email: string };
  type: string;
}) {
  return createUserRecord(body);
}

export async function getUser(userId: string) {
  const db = getDb();
  const [userRow] = await db
    .select()
    .from(users)
    .where(eq(users.firebaseId, userId))
    .limit(1);
  if (!userRow) return null;

  const leagueRows = await db
    .select({ league: leagues })
    .from(userLeagues)
    .innerJoin(leagues, eq(userLeagues.leagueId, leagues.id))
    .where(eq(userLeagues.userId, userRow.id));

  return mapUser(userRow, {
    leagues: leagueRows.map((r) => r.league),
    players: [],
    clubs: [],
    seasons: [],
    friendlyMatches: [],
  });
}
