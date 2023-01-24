import express from "express";
import { getUserSeasons } from "../controllers/SeasonsControllers.js";
const router = express.Router();

router.get('/:userId', getUserSeasons)

export default router;