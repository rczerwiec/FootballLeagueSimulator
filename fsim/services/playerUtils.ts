import { eq, and } from "drizzle-orm";
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

export interface NewPlayerInput {
  name: string;
  nationality: string;
  club?: string;
  overall: number;
}

export async function createPlayerUtil(
  firebaseUID: string,
  newPlayer: NewPlayerInput
) {
  const db = getDb();
  const user = await requireUserByFirebaseId(firebaseUID);
  const playerId = newId();

  try {
    if (newPlayer.club !== undefined) {
      const [clubRow] = await db
        .select()
        .from(clubs)
        .where(eq(clubs.id, newPlayer.club))
        .limit(1);
      if (!clubRow) return { message: "Club not found" };

      const roster = await db
        .select()
        .from(clubPlayers)
        .where(eq(clubPlayers.clubId, newPlayer.club));

      if (roster.length <= 4) {
        await db.insert(players).values(
          insertRow({
            id: playerId,
            name: newPlayer.name,
            nationality: newPlayer.nationality,
            clubId: newPlayer.club,
            overall: newPlayer.overall,
          })
        );
        await db.insert(clubPlayers).values({
          clubId: newPlayer.club,
          playerId,
        });
        await db.insert(userPlayers).values({ userId: user.id, playerId });

        const allRoster = await db
          .select({ player: players })
          .from(clubPlayers)
          .innerJoin(players, eq(clubPlayers.playerId, players.id))
          .where(eq(clubPlayers.clubId, newPlayer.club));

        let value = 0;
        allRoster.forEach((r) => {
          value += Number(r.player.overall);
        });
        value = value / 4;
        await db
          .update(clubs)
          .set(insertRow({ overall: Math.round(value) }))
          .where(eq(clubs.id, newPlayer.club));

        const [saved] = await db
          .select()
          .from(players)
          .where(eq(players.id, playerId))
          .limit(1);
        return mapPlayer(saved!);
      }
      return { message: "Klub jest pełen" };
    }

    await db.insert(players).values(
      insertRow({
        id: playerId,
        name: newPlayer.name,
        nationality: newPlayer.nationality,
        clubId: null,
        overall: newPlayer.overall,
      })
    );
    await db.insert(userPlayers).values({ userId: user.id, playerId });

    const [saved] = await db
      .select()
      .from(players)
      .where(eq(players.id, playerId))
      .limit(1);
    return mapPlayer(saved!);
  } catch (err) {
    return err;
  }
}
