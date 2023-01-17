import express from "express";
import { getLeagueClubStats, createNewLeagueClubStats, updateLeagueClubStats } from "../controllers/Leagues/LeagueClubStatsControllers.js";
const router = express.Router();

router.get("/:leagueId", getLeagueClubStats);

router.post("", createNewLeagueClubStats); 

router.patch("/:leagueId/:clubId",updateLeagueClubStats );

export default router;
