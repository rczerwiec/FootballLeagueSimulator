import { parseJson, withMongoId } from "./helpers";
import type {
  clubs,
  players,
  matches,
  leagues,
  leagueClubStats,
  users,
  seasons,
} from "./schema";

type ClubRow = typeof clubs.$inferSelect;
type PlayerRow = typeof players.$inferSelect;
type MatchRow = typeof matches.$inferSelect;
type LeagueRow = typeof leagues.$inferSelect;
type StatsRow = typeof leagueClubStats.$inferSelect;
type UserRow = typeof users.$inferSelect;
type SeasonRow = typeof seasons.$inferSelect;

export function mapClub(row: ClubRow) {
  return withMongoId({
    ...row,
    id: row.id,
    world_championships: row.worldChampionships,
    region_championships: row.regionChampionships,
  });
}

export function mapPlayer(row: PlayerRow, club?: ClubRow | null) {
  const base = withMongoId({
    id: row.id,
    name: row.name,
    nationality: row.nationality,
    age: row.age,
    overall: row.overall,
    club: row.clubId ?? undefined,
  });
  if (club) {
    return { ...base, club: mapClub(club) };
  }
  return base;
}

export function mapMatch(row: MatchRow) {
  return withMongoId({
    id: row.id,
    matchType: row.matchType,
    clubHome: row.clubHomeId,
    clubHomeName: row.clubHomeName,
    clubHomePlayers: parseJson(row.clubHomePlayersJson, []),
    clubHomeOverall: row.clubHomeOverall,
    clubAway: row.clubAwayId,
    clubAwayName: row.clubAwayName,
    clubAwayPlayers: parseJson(row.clubAwayPlayersJson, []),
    clubAwayOverall: row.clubAwayOverall,
    scoreHome: row.scoreHome,
    scoreAway: row.scoreAway,
    complete: row.complete,
    winner: row.winnerId,
  });
}

export function mapLeague(row: LeagueRow) {
  return withMongoId({
    id: row.id,
    name: row.name,
    level: row.level,
    maxTeams: row.maxTeams,
    complete: row.complete,
    winner: row.winnerId,
    second: row.secondId,
    third: row.thirdId,
    fourth: row.fourthId,
    fifth: row.fifthId,
    thirdLast: row.thirdLastId,
    secondLast: row.secondLastId,
    last: row.lastId,
    advances: row.advances,
    relegation: row.relegation,
    seasonId: row.seasonId,
    tier: row.tier,
  });
}

export function mapSeason(
  row: SeasonRow,
  leagueRows?: LeagueRow[]
) {
  return withMongoId({
    id: row.id,
    name: row.name,
    number: row.number,
    complete: row.complete ?? false,
    championClubId: row.championClubId,
    previousSeasonId: row.previousSeasonId,
    createdAt: row.createdAt ? new Date(row.createdAt) : undefined,
    leagues: leagueRows
      ?.sort((a, b) => (a.tier ?? 0) - (b.tier ?? 0))
      .map((l) => mapLeague(l)) ?? [],
  });
}

export function mapStats(row: StatsRow) {
  return withMongoId({
    id: row.id,
    league: row.leagueId,
    club: row.clubId,
    clubName: row.clubName,
    playedGames: row.playedGames,
    wonGames: row.wonGames,
    drawGames: row.drawGames,
    lostGames: row.lostGames,
    goalsShot: row.goalsShot,
    goalsLost: row.goalsLost,
    goalsDif: row.goalsDif,
    points: row.points,
  });
}

export function mapUser(
  row: UserRow,
  relations?: {
    players?: PlayerRow[];
    clubs?: ClubRow[];
    leagues?: LeagueRow[];
    seasons?: SeasonRow[];
    friendlyMatches?: MatchRow[];
  }
) {
  return withMongoId({
    id: row.id,
    firebaseID: row.firebaseId,
    type: row.type,
    email: row.email,
    season: row.season,
    registeredAt: row.registeredAt
      ? new Date(row.registeredAt)
      : undefined,
    players: relations?.players?.map((p) => mapPlayer(p)) ?? [],
    clubs: relations?.clubs?.map((c) => mapClub(c)) ?? [],
    leagues: relations?.leagues?.map((l) => mapLeague(l)) ?? [],
    seasons: relations?.seasons?.map((s) => mapSeason(s)) ?? [],
    friendlyMatches:
      relations?.friendlyMatches?.map((m) => mapMatch(m)) ?? [],
  });
}
