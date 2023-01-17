import express from 'express';
const router = express.Router();
import { getAllPlayers , createPlayer, createRandomPlayers, getPlayer , getPlayerClub, deletePlayer, updatePlayer} from '../controllers/PlayersControllers.js';

//GET ALL PLAYERS
router.get('/', getAllPlayers);

//SUBMIT PLAYER
router.post('/', createPlayer)

//GET SPECIFIC PLAYER
router.get('/:playerId', getPlayer)

//GET PLAYER's CLUB
router.get('/:playerId/club', getPlayerClub)

//DELET A PLAYER
router.delete('/:playerId', deletePlayer)

//UPDATE PLAYER
router.patch('/:playerId', updatePlayer)

//GENERATE X PLAYERS
router.post('/generateMultiple',createRandomPlayers)

export default router;