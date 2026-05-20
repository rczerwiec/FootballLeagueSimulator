import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  firebaseId: text("firebase_id").notNull().unique(),
  type: text("type").notNull(),
  email: text("email").notNull(),
  season: integer("season").default(2023),
  registeredAt: integer("registered_at"),
});

export const clubs = sqliteTable("clubs", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  titles: integer("titles").default(0),
  worldChampionships: integer("world_championships").default(0),
  regionChampionships: integer("region_championships").default(0),
  overall: integer("overall").default(1),
  wins: integer("wins").default(0),
  lost: integer("lost").default(0),
  draws: integer("draws").default(0),
});

export const players = sqliteTable("players", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  nationality: text("nationality").notNull(),
  clubId: text("club_id"),
  age: integer("age").default(16),
  overall: integer("overall").notNull(),
});

export const matches = sqliteTable("matches", {
  id: text("id").primaryKey(),
  matchType: text("match_type").notNull(),
  clubHomeId: text("club_home_id").notNull(),
  clubHomeName: text("club_home_name"),
  clubHomePlayersJson: text("club_home_players_json"),
  clubHomeOverall: integer("club_home_overall"),
  clubAwayId: text("club_away_id").notNull(),
  clubAwayName: text("club_away_name"),
  clubAwayPlayersJson: text("club_away_players_json"),
  clubAwayOverall: integer("club_away_overall"),
  scoreHome: integer("score_home"),
  scoreAway: integer("score_away"),
  complete: integer("complete", { mode: "boolean" }),
  winnerId: text("winner_id"),
});

export const leagues = sqliteTable("leagues", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  level: text("level").notNull(),
  maxTeams: integer("max_teams").default(8),
  complete: integer("complete", { mode: "boolean" }).default(false),
  winnerId: text("winner_id"),
  secondId: text("second_id"),
  thirdId: text("third_id"),
  fourthId: text("fourth_id"),
  fifthId: text("fifth_id"),
  thirdLastId: text("third_last_id"),
  secondLastId: text("second_last_id"),
  lastId: text("last_id"),
  advances: integer("advances").default(0),
  relegation: integer("relegation").default(0),
  seasonId: text("season_id"),
  tier: integer("tier").default(0),
});

export const leagueClubStats = sqliteTable("league_club_stats", {
  id: text("id").primaryKey(),
  leagueId: text("league_id").notNull(),
  clubId: text("club_id").notNull(),
  clubName: text("club_name").notNull(),
  playedGames: integer("played_games").default(0),
  wonGames: integer("won_games").default(0),
  drawGames: integer("draw_games").default(0),
  lostGames: integer("lost_games").default(0),
  goalsShot: integer("goals_shot").default(0),
  goalsLost: integer("goals_lost").default(0),
  goalsDif: integer("goals_dif").default(0),
  points: integer("points").default(0),
});

export const seasons = sqliteTable("seasons", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  number: integer("number").notNull(),
  complete: integer("complete", { mode: "boolean" }).default(false),
  championClubId: text("champion_club_id"),
  previousSeasonId: text("previous_season_id"),
  createdAt: integer("created_at"),
});

export const userPlayers = sqliteTable("user_players", {
  userId: text("user_id").notNull(),
  playerId: text("player_id").notNull(),
});

export const userClubs = sqliteTable("user_clubs", {
  userId: text("user_id").notNull(),
  clubId: text("club_id").notNull(),
});

export const userLeagues = sqliteTable("user_leagues", {
  userId: text("user_id").notNull(),
  leagueId: text("league_id").notNull(),
});

export const userFriendlyMatches = sqliteTable("user_friendly_matches", {
  userId: text("user_id").notNull(),
  matchId: text("match_id").notNull(),
});

export const userSeasons = sqliteTable("user_seasons", {
  userId: text("user_id").notNull(),
  seasonId: text("season_id").notNull(),
});

export const clubPlayers = sqliteTable("club_players", {
  clubId: text("club_id").notNull(),
  playerId: text("player_id").notNull(),
});

export const clubMatches = sqliteTable("club_matches", {
  clubId: text("club_id").notNull(),
  matchId: text("match_id").notNull(),
});

export const leagueClubs = sqliteTable("league_clubs", {
  leagueId: text("league_id").notNull(),
  clubId: text("club_id").notNull(),
});

export const leagueMatches = sqliteTable("league_matches", {
  leagueId: text("league_id").notNull(),
  matchId: text("match_id").notNull(),
});
