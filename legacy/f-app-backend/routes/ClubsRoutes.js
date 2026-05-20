import express from 'express';
const router = express.Router();
import {getAllClubMatches,createNewClub, getAllClubPlayers, getClub, deleteClub, updateClub, getAllUserClubs } from '../controllers/ClubControllers.js';


//GET BACK ALL THE CLUBS
router.get('/', getAllUserClubs);

//GET CLUB'S MATCHES
router.get('/:clubId/matches', getAllClubMatches)

//SUBMITS A CLUB
router.post('/', createNewClub)

//ALL CLUB PLAYERS
router.get('/:clubId/players', getAllClubPlayers)

//SPECIFIC CLUB
router.get('/:clubId', getClub)

//DELETE CLUB
router.delete('/:clubId', deleteClub)

//UPDATE CLUB
router.patch('/:clubId',updateClub)

export default router;