import { eq, and } from "drizzle-orm";
import { getDb, getSqlite } from "@/lib/db";
import {
  clubs,
  players,
  matches,
  userClubs,
  clubPlayers,
  clubMatches,
  userPlayers,
} from "@/lib/db/schema";
import { newId } from "@/lib/db/helpers";
import { requireUserByFirebaseId } from "@/lib/db/userDb";
import { mapClub, mapMatch, mapPlayer } from "@/lib/db/mappers";
import { namesPL, surnamesPL } from "@/lib/data/playerNames";
import { createPlayerUtil } from "./playerUtils";

export async function getAllUserClubs(firebaseUID: string) {
  const db = getDb();
  const user = await requireUserByFirebaseId(firebaseUID);
  const rows = await db
    .select({ club: clubs })
    .from(userClubs)
    .innerJoin(clubs, eq(userClubs.clubId, clubs.id))
    .where(eq(userClubs.userId, user.id));
  return rows.map((r) => mapClub(r.club));
}

export async function getAllClubMatches(clubId: string) {
  const db = getDb();
  const [clubRow] = await db
    .select()
    .from(clubs)
    .where(eq(clubs.id, clubId))
    .limit(1);
  if (!clubRow) return null;

  const matchRows = await db
    .select({ match: matches })
    .from(clubMatches)
    .innerJoin(matches, eq(clubMatches.matchId, matches.id))
    .where(eq(clubMatches.clubId, clubId));

  return {
    ...mapClub(clubRow),
    matches: matchRows.map((r) => mapMatch(r.match)),
  };
}

export async function getAllClubPlayers(clubId: string) {
  const db = getDb();
  const [clubRow] = await db
    .select()
    .from(clubs)
    .where(eq(clubs.id, clubId))
    .limit(1);
  if (!clubRow) return null;

  const playerRows = await db
    .select({ player: players })
    .from(clubPlayers)
    .innerJoin(players, eq(clubPlayers.playerId, players.id))
    .where(eq(clubPlayers.clubId, clubId));

  return {
    ...mapClub(clubRow),
    players: playerRows.map((r) => mapPlayer(r.player)),
  };
}

export async function createNewClub(
  firebaseUID: string,
  body: { name: string; type: string; generatePlayers?: boolean }
) {
  const db = getDb();
  const user = await requireUserByFirebaseId(firebaseUID);
  const clubId = newId();

  await db.insert(clubs).values({
    id: clubId,
    name: body.name,
    type: body.type,
  });
  await db.insert(userClubs).values({ userId: user.id, clubId });

  if (body.generatePlayers === true) {
    for (let x = 0; x < 4; x++) {
      const name = namesPL[Math.floor(Math.random() * namesPL.length)];
      const surname = surnamesPL[Math.floor(Math.random() * surnamesPL.length)];
      await createPlayerUtil(firebaseUID, {
        name: name + " " + surname,
        nationality: "Poland",
        overall: Math.floor(Math.random() * 99),
        club: clubId,
      });
    }
  }

  const [saved] = await db
    .select()
    .from(clubs)
    .where(eq(clubs.id, clubId))
    .limit(1);
  return mapClub(saved!);
}

export async function getClub(clubId: string) {
  const db = getDb();
  const [row] = await db
    .select()
    .from(clubs)
    .where(eq(clubs.id, clubId))
    .limit(1);
  return row ? mapClub(row) : null;
}

export async function deleteClub(firebaseUID: string, clubId: string) {
  const db = getDb();
  const user = await requireUserByFirebaseId(firebaseUID);
  const clubDoc = await getAllClubPlayers(clubId);
  if (!clubDoc) return { message: "Club not found" };

  const sqlite = getSqlite();
  for (const p of clubDoc.players as ReturnType<typeof mapPlayer>[]) {
    sqlite
      .prepare("UPDATE players SET club_id = NULL WHERE id = ?")
      .run(p._id);
    await db.delete(clubPlayers).where(eq(clubPlayers.playerId, p._id));
  }

  const matchLinks = await db
    .select()
    .from(clubMatches)
    .where(eq(clubMatches.clubId, clubId));
  for (const link of matchLinks) {
    await db.delete(matches).where(eq(matches.id, link.matchId));
    await db.delete(clubMatches).where(eq(clubMatches.matchId, link.matchId));
  }

  await db.delete(userClubs).where(
    and(eq(userClubs.userId, user.id), eq(userClubs.clubId, clubId))
  );
  await db.delete(clubs).where(eq(clubs.id, clubId));
  return clubDoc;
}

export async function updateClub(
  clubId: string,
  body: { name: string; type: string }
) {
  const db = getDb();
  await db
    .update(clubs)
    .set({ name: body.name, type: body.type })
    .where(eq(clubs.id, clubId));
  return { acknowledged: true };
}
