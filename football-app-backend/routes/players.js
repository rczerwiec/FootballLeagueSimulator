const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

//GET ALL PLAYERS
router.get('/', async (req,res) => {
    try{
        const players = await Player.find();
        res.json(players);
    }
    catch(err){
        res.json({message:err});
    }
});

//SUBMIT PLAYER
router.post('/', async (req,res) => {
    const player = new Player({
        name: req.body.name,
        nationality: req.body.nationality,
        
    })

    try{
        const savedPlayer = await player.save()
        res.json(savedPlayer);
    }
    catch(err){
        res.json({message: err});
    }


})

//GET SPECIFIC PLAYER
router.get('/:playerId', async (req,res) => {
    try{
        const player = await Player.findById(req.params.playerId);
        res.json(player);
    }
    catch(err){
        res.json({message:err});
    }

})

module.exports = router;