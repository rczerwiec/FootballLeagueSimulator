import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import fs from "fs";
import path from "path";
import * as schema from "./schema";

const globalForDb = globalThis as typeof globalThis & {
  sqlite?: Database.Database;
  drizzleDb?: ReturnType<typeof drizzle<typeof schema>>;
};

function getSqlitePath(): string {
  const configured = process.env.SQLITE_PATH;
  if (configured) return configured;
  return path.join(process.cwd(), "data", "fsm.db");
}

function runMigrations(sqlite: Database.Database) {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      firebase_id TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL,
      email TEXT NOT NULL,
      season INTEGER DEFAULT 2023,
      registered_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS clubs (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      titles INTEGER DEFAULT 0,
      world_championships INTEGER DEFAULT 0,
      region_championships INTEGER DEFAULT 0,
      overall INTEGER DEFAULT 1,
      wins INTEGER DEFAULT 0,
      lost INTEGER DEFAULT 0,
      draws INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS players (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      nationality TEXT NOT NULL,
      club_id TEXT,
      age INTEGER DEFAULT 16,
      overall INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS matches (
      id TEXT PRIMARY KEY,
      match_type TEXT NOT NULL,
      club_home_id TEXT NOT NULL,
      club_home_name TEXT,
      club_home_players_json TEXT,
      club_home_overall INTEGER,
      club_away_id TEXT NOT NULL,
      club_away_name TEXT,
      club_away_players_json TEXT,
      club_away_overall INTEGER,
      score_home INTEGER,
      score_away INTEGER,
      complete INTEGER,
      winner_id TEXT
    );
    CREATE TABLE IF NOT EXISTS leagues (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      level TEXT NOT NULL,
      max_teams INTEGER DEFAULT 8,
      complete INTEGER DEFAULT 0,
      winner_id TEXT,
      second_id TEXT,
      third_id TEXT,
      fourth_id TEXT,
      fifth_id TEXT,
      third_last_id TEXT,
      second_last_id TEXT,
      last_id TEXT,
      advances INTEGER DEFAULT 0,
      relegation INTEGER DEFAULT 0,
      season_id TEXT,
      tier INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS league_club_stats (
      id TEXT PRIMARY KEY,
      league_id TEXT NOT NULL,
      club_id TEXT NOT NULL,
      club_name TEXT NOT NULL,
      played_games INTEGER DEFAULT 0,
      won_games INTEGER DEFAULT 0,
      draw_games INTEGER DEFAULT 0,
      lost_games INTEGER DEFAULT 0,
      goals_shot INTEGER DEFAULT 0,
      goals_lost INTEGER DEFAULT 0,
      goals_dif INTEGER DEFAULT 0,
      points INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS seasons (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      number INTEGER NOT NULL,
      complete INTEGER DEFAULT 0,
      champion_club_id TEXT,
      previous_season_id TEXT,
      created_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS user_players (user_id TEXT NOT NULL, player_id TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS user_clubs (user_id TEXT NOT NULL, club_id TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS user_leagues (user_id TEXT NOT NULL, league_id TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS user_friendly_matches (user_id TEXT NOT NULL, match_id TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS user_seasons (user_id TEXT NOT NULL, season_id TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS club_players (club_id TEXT NOT NULL, player_id TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS club_matches (club_id TEXT NOT NULL, match_id TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS league_clubs (league_id TEXT NOT NULL, club_id TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS league_matches (league_id TEXT NOT NULL, match_id TEXT NOT NULL);
  `);

  // Idempotent ALTER TABLE for upgrades from older DB files
  const safeAlter = (sql: string) => {
    try {
      sqlite.exec(sql);
    } catch {
      /* column already exists */
    }
  };
  safeAlter("ALTER TABLE leagues ADD COLUMN season_id TEXT");
  safeAlter("ALTER TABLE leagues ADD COLUMN tier INTEGER DEFAULT 0");

  // Old schema of `seasons` used a `season` (INTEGER NOT NULL) column and JSON
  // columns per league. Detect that and rebuild the table to the new layout.
  const seasonsCols = sqlite
    .prepare("PRAGMA table_info(seasons)")
    .all() as { name: string }[];
  const hasNumberCol = seasonsCols.some((c) => c.name === "number");
  if (seasonsCols.length > 0 && !hasNumberCol) {
    sqlite.exec(`
      DROP TABLE IF EXISTS seasons;
      DROP TABLE IF EXISTS user_seasons;
      CREATE TABLE seasons (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        number INTEGER NOT NULL,
        complete INTEGER DEFAULT 0,
        champion_club_id TEXT,
        previous_season_id TEXT,
        created_at INTEGER
      );
      CREATE TABLE user_seasons (user_id TEXT NOT NULL, season_id TEXT NOT NULL);
    `);
  }
}

export function getDb() {
  if (!globalForDb.drizzleDb) {
    const dbPath = getSqlitePath();
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    const sqlite = new Database(dbPath);
    sqlite.pragma("journal_mode = WAL");
    runMigrations(sqlite);
    globalForDb.sqlite = sqlite;
    globalForDb.drizzleDb = drizzle(sqlite, { schema });
  }
  return globalForDb.drizzleDb;
}

export async function connectDB() {
  getDb();
}

export function getSqlite() {
  getDb();
  return globalForDb.sqlite!;
}
