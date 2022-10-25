import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();
import Club from '../models/Club.js';


//GET BACK ALL THE CLUBS
router.get('/', async (req,res) => {
    try{
        const clubs = await Club.find();
        res.json(clubs);
    }
    catch(err){
        res.json({message:err});
    }
});

//SUBMITS A CLUB
router.post('/', async (req,res) => {
    const club = new Club({
        name: req.body.name,
        type: req.body.type,
    })

    try{
        const savedClub = await club.save()
        res.json(savedClub);
    }
    catch(err){
        res.json({message: err});
    }


})

//ALL CLUB PLAYERS
router.get('/:clubId/players', async (req,res) =>{
    try{
        const club = await Club.findById(req.params.clubId).populate("players");
        console.log(club);
        res.json(club.players);
    }
    catch(err){
        res.json({message:err});
    }
})

//SPECIFIC CLUB
router.get('/:clubId', async (req,res) => {
    try{
        const club = await Club.findById(req.params.clubId);
        res.json(club);
    }
    catch(err){
        res.json({message:err});
    }

})

//DELETE CLUB
router.delete('/:clubId', async (req,res) => {
    try{
        const club = await Club.findById(req.params.clubId).populate("players");
        club.players.forEach((e) => {
            console.log(e.club);
            e.club = undefined;
            e.save();
        })



        const removedClub = await Club.remove({_id: req.params.clubId});
        res.json(removedClub);
    }
    catch(err){
        res.json({message:err});
    }
    
})

//UPDATE CLUB
router.patch('/:clubId',async (req, res) => {
    try{
        const updatedClub =  await Club.updateOne({_id: req.params.clubId},{$set : {name: req.body.name, type: req.body.type}});
        res.json(updatedClub);
    }
    catch(err){
        res.json({message:err});
    }
    
})

export default router;