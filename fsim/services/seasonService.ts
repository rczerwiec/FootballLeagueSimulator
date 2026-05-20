import { and, eq, inArray } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  seasons,
  userSeasons,
  leagues,
  leagueClubs,
  leagueClubStats,
  userLeagues,
} from "@/lib/db/schema";
import { newId, insertRow } from "@/lib/db/helpers";
import { requireUserByFirebaseId } from "@/lib/db/userDb";
import { mapSeason } from "@/lib/db/mappers";
import generateMatches from "./generateMatches";

interface CreateSeasonBody {
  name: string;
  leagueIds: string[];
}

export async function createSeason(
  firebaseUID: string,
  body: CreateSeasonBody
) {
  const db = getDb();
  const user = await requireUserByFirebaseId(firebaseUID);

  if (!body.name?.trim()) {
    throw new Error("Nazwa sezonu jest wymagana");
  }
  if (!body.leagueIds || body.leagueIds.length === 0) {
    throw new Error("Sezon musi zawierać co najmniej jedną ligę");
  }

  const userLeagueRows = await db
    .select()
    .from(userLeagues)
    .where(eq(userLeagues.userId, user.id));
  const userLeagueIds = new Set(userLeagueRows.map((r) => r.leagueId));
  for (const id of body.leagueIds) {
    if (!userLeagueIds.has(id)) {
      throw new Error("Liga nie należy do użytkownika");
    }
  }

  const leagueRows = await db
    .select()
    .from(leagues)
    .where(inArray(leagues.id, body.leagueIds));
  for (const lg of leagueRows) {
    if (lg.seasonId) {
      throw new Error(
        `Liga "${lg.name}" jest już przypisana do innego sezonu`
      );
    }
  }

  const previousSeasonsCount = (
    await db
      .select()
      .from(userSeasons)
      .where(eq(userSeasons.userId, user.id))
  ).length;

  const seasonId = newId();
  await db.insert(seasons).values(
    insertRow({
      id: seasonId,
      name: body.name.trim(),
      number: previousSeasonsCount + 1,
      complete: false,
      createdAt: Date.now(),
    })
  );
  await db.insert(userSeasons).values({ userId: user.id, seasonId });

  for (let i = 0; i < body.leagueIds.length; i++) {
    await db
      .update(leagues)
      .set(insertRow({ seasonId, tier: i + 1 }))
      .where(eq(leagues.id, body.leagueIds[i]));
  }

  return getSeasonById(seasonId);
}

export async function getSeasonById(seasonId: string) {
  const db = getDb();
  const [row] = await db
    .select()
    .from(seasons)
    .where(eq(seasons.id, seasonId))
    .limit(1);
  if (!row) return null;

  const leagueRows = await db
    .select()
    .from(leagues)
    .where(eq(leagues.seasonId, seasonId));

  return mapSeason(row, leagueRows);
}

export async function getAllUserSeasons(firebaseUID: string) {
  const db = getDb();
  const user = await requireUserByFirebaseId(firebaseUID);
  const rows = await db
    .select({ season: seasons })
    .from(userSeasons)
    .innerJoin(seasons, eq(userSeasons.seasonId, seasons.id))
    .where(eq(userSeasons.userId, user.id));

  const result = [];
  for (const r of rows) {
    const leagueRows = await db
      .select()
      .from(leagues)
      .where(eq(leagues.seasonId, r.season.id));
    result.push(mapSeason(r.season, leagueRows));
  }
  result.sort((a, b) => a.number - b.number);
  return result;
}

interface RankedClub {
  clubId: string;
  points: number;
  goalsDif: number;
  wonGames: number;
  goalsShot: number;
}

function rankTable(rows: RankedClub[]): RankedClub[] {
  return [...rows].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalsDif !== a.goalsDif) return b.goalsDif - a.goalsDif;
    if (b.wonGames !== a.wonGames) return b.wonGames - a.wonGames;
    return b.goalsShot - a.goalsShot;
  });
}

export async function startNextSeason(
  firebaseUID: string,
  previousSeasonId: string,
  name?: string
) {
  const db = getDb();
  const user = await requireUserByFirebaseId(firebaseUID);

  const [prev] = await db
    .select()
    .from(seasons)
    .where(eq(seasons.id, previousSeasonId))
    .limit(1);
  if (!prev) throw new Error("Poprzedni sezon nie istnieje");

  const prevLeagues = await db
    .select()
    .from(leagues)
    .where(eq(leagues.seasonId, previousSeasonId));

  if (prevLeagues.length === 0) {
    throw new Error("Sezon nie ma żadnych lig");
  }

  for (const lg of prevLeagues) {
    if (!lg.complete) {
      throw new Error(
        `Liga "${lg.name}" nie jest jeszcze ukończona — rozegraj wszystkie mecze`
      );
    }
  }

  prevLeagues.sort((a, b) => (a.tier ?? 0) - (b.tier ?? 0));

  // Compute ranked clubs per tier
  const rankedByTier = new Map<number, RankedClub[]>();
  for (const lg of prevLeagues) {
    const stats = await db
      .select()
      .from(leagueClubStats)
      .where(eq(leagueClubStats.leagueId, lg.id));
    const ranked = rankTable(
      stats.map((s) => ({
        clubId: s.clubId,
        points: s.points ?? 0,
        goalsDif: s.goalsDif ?? 0,
        wonGames: s.wonGames ?? 0,
        goalsShot: s.goalsShot ?? 0,
      }))
    );
    rankedByTier.set(lg.tier ?? 0, ranked);
  }

  // Apply relegation/promotion: build new club rosters per tier
  const newClubsByTier = new Map<number, string[]>();
  for (const lg of prevLeagues) {
    newClubsByTier.set(
      lg.tier ?? 0,
      rankedByTier.get(lg.tier ?? 0)!.map((r) => r.clubId)
    );
  }

  for (let t = 1; t < prevLeagues.length; t++) {
    const upper = prevLeagues[t - 1];
    const lower = prevLeagues[t];
    const upperTier = upper.tier ?? 0;
    const lowerTier = lower.tier ?? 0;
    const swap = Math.min(
      upper.relegation ?? 0,
      lower.advances ?? 0
    );
    if (swap <= 0) continue;

    const upperRoster = newClubsByTier.get(upperTier)!;
    const lowerRoster = newClubsByTier.get(lowerTier)!;

    const relegated = upperRoster.splice(upperRoster.length - swap, swap);
    const promoted = lowerRoster.splice(0, swap);

    upperRoster.push(...promoted);
    lowerRoster.unshift(...relegated);
  }

  // Mark previous season complete + champion
  const topRanked = rankedByTier.get(prevLeagues[0].tier ?? 1);
  const championClubId = topRanked?.[0]?.clubId ?? null;
  await db
    .update(seasons)
    .set(
      insertRow({
        complete: true,
        championClubId,
      })
    )
    .where(eq(seasons.id, previousSeasonId));

  // Create the next season
  const nextSeasonId = newId();
  const nextName =
    name?.trim() && name.trim().length > 0
      ? name.trim()
      : `${prev.name} → ${prev.number + 1}`;
  await db.insert(seasons).values(
    insertRow({
      id: nextSeasonId,
      name: nextName,
      number: prev.number + 1,
      complete: false,
      previousSeasonId,
      createdAt: Date.now(),
    })
  );
  await db.insert(userSeasons).values({
    userId: user.id,
    seasonId: nextSeasonId,
  });

  // For each tier: create a new league mirroring the old one, with shuffled clubs
  for (const old of prevLeagues) {
    const tier = old.tier ?? 0;
    const clubIds = newClubsByTier.get(tier) ?? [];
    if (clubIds.length === 0) continue;

    const newLeagueId = newId();
    await db.insert(leagues).values(
      insertRow({
        id: newLeagueId,
        name: old.name,
        level: old.level,
        maxTeams: old.maxTeams,
        complete: false,
        advances: old.advances,
        relegation: old.relegation,
        seasonId: nextSeasonId,
        tier,
      })
    );
    await db
      .insert(userLeagues)
      .values({ userId: user.id, leagueId: newLeagueId });

    for (const clubId of clubIds) {
      await db
        .insert(leagueClubs)
        .values({ leagueId: newLeagueId, clubId });
    }

    const clubInputs = await Promise.all(
      clubIds.map(async (clubId) => {
        const { clubs } = await import("@/lib/db/schema");
        const [c] = await db
          .select()
          .from(clubs)
          .where(eq(clubs.id, clubId))
          .limit(1);
        return { _id: c!.id, name: c!.name };
      })
    );
    await generateMatches(clubInputs, old.level, newLeagueId);
  }

  return getSeasonById(nextSeasonId);
}
