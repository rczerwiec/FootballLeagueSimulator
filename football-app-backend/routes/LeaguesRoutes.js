import express from 'express';
import {getAllUserLeagues, getLeagueMatches, getLeagueTables, generateLeague} from "../controllers/Leagues/LeaguesControllers.js"
const router = express.Router();

//GET ALL LEAGUES
router.get('/', getAllUserLeagues)

//GET ALL LEAGUE MATCHES
router.get('/:leagueId/matches',getLeagueMatches )

//GET ALL LEAGUE TABLES
router.get('/:leagueId/tables', getLeagueTables)

//CREATE LEAGUE
router.post('/',generateLeague )





export default router;