import { eq, and } from "drizzle-orm";
import { faker } from "@faker-js/faker";
import { getDb } from "@/lib/db";
import {
  players,
  clubs,
  clubPlayers,
  userPlayers,
} from "@/lib/db/schema";
import { newId, insertRow } from "@/lib/db/helpers";
import { requireUserByFirebaseId } from "@/lib/db/userDb";
import { mapPlayer, mapClub } from "@/lib/db/mappers";
import { createPlayerUtil } from "./playerUtils";

export async function getAllUserPlayers(firebaseUID: string) {
  const db = getDb();
  const user = await requireUserByFirebaseId(firebaseUID);
  const rows = await db
    .select({ player: players })
    .from(userPlayers)
    .innerJoin(players, eq(userPlayers.playerId, players.id))
    .where(eq(userPlayers.userId, user.id));
  return rows.map((r) => mapPlayer(r.player));
}

export async function createPlayer(
  firebaseUID: string,
  body: { name: string; nationality: string; club?: string; overall: number }
) {
  return createPlayerUtil(firebaseUID, body);
}

export async function getPlayer(playerId: string) {
  const db = getDb();
  const [row] = await db
    .select()
    .from(players)
    .where(eq(players.id, playerId))
    .limit(1);
  return row ? mapPlayer(row) : null;
}

export async function getPlayerClub(playerId: string) {
  const db = getDb();
  const [playerRow] = await db
    .select()
    .from(players)
    .where(eq(players.id, playerId))
    .limit(1);
  if (!playerRow?.clubId) return null;
  const [clubRow] = await db
    .select()
    .from(clubs)
    .where(eq(clubs.id, playerRow.clubId))
    .limit(1);
  return clubRow ? mapClub(clubRow) : null;
}

export async function deletePlayer(firebaseUID: string, playerId: string) {
  const db = getDb();
  const user = await requireUserByFirebaseId(firebaseUID);
  const [playerRow] = await db
    .select()
    .from(players)
    .where(eq(players.id, playerId))
    .limit(1);
  if (!playerRow) return { message: "Player not found" };

  if (playerRow.clubId) {
    await db.delete(clubPlayers).where(
      and(
        eq(clubPlayers.clubId, playerRow.clubId),
        eq(clubPlayers.playerId, playerId)
      )
    );
  }
  await db.delete(userPlayers).where(
    and(eq(userPlayers.userId, user.id), eq(userPlayers.playerId, playerId))
  );
  await db.delete(players).where(eq(players.id, playerId));
  return mapPlayer(playerRow);
}

export async function updatePlayer(
  playerId: string,
  body: { name: string; nationality: string; club?: string; overall: number }
) {
  const db = getDb();
  const [oldPlayer] = await db
    .select()
    .from(players)
    .where(eq(players.id, playerId))
    .limit(1);

  if (oldPlayer?.clubId) {
    await db.delete(clubPlayers).where(
      and(
        eq(clubPlayers.clubId, oldPlayer.clubId),
        eq(clubPlayers.playerId, playerId)
      )
    );
  }

  const sqlite = (await import("@/lib/db")).getSqlite();
  sqlite
    .prepare(
      "UPDATE players SET name = ?, nationality = ?, club_id = ?, overall = ? WHERE id = ?"
    )
    .run(
      body.name,
      body.nationality,
      body.club ?? null,
      body.overall,
      playerId
    );

  if (body.club) {
    await db.insert(clubPlayers).values({ clubId: body.club, playerId });
  }

  const [updated] = await db
    .select()
    .from(players)
    .where(eq(players.id, playerId))
    .limit(1);
  let clubRow = null;
  if (updated?.clubId) {
    const [c] = await db
      .select()
      .from(clubs)
      .where(eq(clubs.id, updated.clubId))
      .limit(1);
    clubRow = c ?? null;
  }
  return mapPlayer(updated!, clubRow);
}

export async function createRandomPlayers(
  firebaseUID: string,
  howMuchToGenerate: number
) {
  const db = getDb();
  const user = await requireUserByFirebaseId(firebaseUID);

  for (let i = 0; i < howMuchToGenerate; i++) {
    const playerId = newId();
    await db.insert(players).values(
      insertRow({
        id: playerId,
        name:
          faker.person.firstName() + " " + faker.person.lastName(),
        nationality: faker.location.country(),
        overall: Math.floor(Math.random() * 100) + 1,
        clubId: null,
      })
    );
    await db.insert(userPlayers).values({ userId: user.id, playerId });
  }
  return { success: true };
}
