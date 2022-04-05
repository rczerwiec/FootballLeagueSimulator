const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Club = require('../models/Club');

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
        club: req.body.club,
        overall: req.body.overall
    })
    try{
        const club = await Club.findById(player.club.valueOf());
        if (club.players.length <= 4){
            const savedPlayer = await player.save();
            club.players.push(savedPlayer);
            await club.save();
            res.json(savedPlayer);
        }
        else{
            res.json({message:"Klub jest pełen!"});
        }

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

//GET PLAYER's CLUB
router.get('/:playerId/club', async (req,res) => {
    try{
        const player = await Player.findById(req.params.playerId).populate("club");
        //const club = await Club.findById(player.club.valueOf());

        res.json(player.club);
    }
    catch(err){
        res.json({message:err});
    }

})

router.delete('/:playerId', async (req,res) =>{
    try{
        const player = await Player.findById(req.params.playerId);
        const club = await Club.findById(player.club.valueOf());

        await Player.deleteOne({_id:req.params.playerId});
        club.players.splice(club.players.indexOf(req.params.playerId),1);
        await club.save();
        res.json(player);
    }
    catch(err){
        res.json({message:err});
    }
})

router.patch('/:playerId', async(req,res)=>{
    try{
        const oldPlayer = await Player.findById(req.params.playerId).populate("club");
        if(oldPlayer.club!=null){
            oldPlayer.club.players.splice(oldPlayer.club.players.indexOf(req.params.playerId),1);
            await oldPlayer.club.save();
        }
        await Player.updateOne({_id: req.params.playerId},{$set : {name: req.body.name, nationality: req.body.nationality, club: req.body.club, overall: req.body.overall}});
        const player = await Player.findById(req.params.playerId).populate("club");
        player.club.players.push(player);
        await player.club.save();
        
        res.json(player);
    }
    catch(err){
        res.json({message:err});
    }
})

module.exports = router;