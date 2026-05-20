import express from "express";
import { getLeagueClubsStats, createNewLeagueClubStats, updateLeagueClubStats,getLeagueClubStats } from "../controllers/Leagues/LeagueClubStatsControllers.js";
const router = express.Router();
//      /tables

//GET LEAGUE STATS
router.get("/:leagueId", getLeagueClubsStats);

//GET CLUB LEAGUES STATS
router.get("/club/:clubId", getLeagueClubStats);

//CREATE NEW LEAGUE STATS
router.post("", createNewLeagueClubStats); 

//UPDATE LEAGUE STATS
router.patch("/:leagueId/:clubId",updateLeagueClubStats );

export default router;
