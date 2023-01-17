import express from "express";
const router = express.Router();
import { getAllFriendlyMatches, updateLeagueMatch, createFriendlyMatch} from "../controllers/MatchControllers.js";

//GET ALL FRIENDLY MATCHES
router.get("/friendly", getAllFriendlyMatches)

//UPDATE LEAGUE MATCH
router.patch("/:matchId", updateLeagueMatch)

//CREATE FRIENDLY MATCH
router.post("/", createFriendlyMatch)

export default router;