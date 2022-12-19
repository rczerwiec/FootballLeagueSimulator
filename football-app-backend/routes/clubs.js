import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();
import Club from '../models/Club.js';
import Match from "../models/Match.js";


//GET BACK ALL THE CLUBS
router.get('/', async (req,res) => {
    try{
        const clubs = await Club.find();
        console.log("getClubs>>".blue,"Pomyślnie pobrano wszystkie kluby".green);
        res.json(clubs);
    }
    catch(err){
        console.log("getClubs>>".blue,"Blad podczas pobierania klubu".red);
        res.json({message:err});
    }
});

//GET CLUB'S MATCHES
router.get('/:clubId/matches', async (req,res) => {
    try{
        const matches = await Club.findById(req.params.clubId).populate("matches");
        console.log("getClubsMatches>>".blue,"Pomyślnie pobrano wszystkie mecze klubu".green);
        res.json(matches);
    }
    catch(err){
        console.log("getClubsMatches>>".blue,"Blad podczas pobierania meczy klubu".red, err);
        res.json({message:err});
    }
})

//SUBMITS A CLUB
router.post('/', async (req,res) => {
    const club = new Club({
        name: req.body.name,
        type: req.body.type,
    })

    try{
        const savedClub = await club.save()
        console.log("createClub>>".blue,"Pomyślnie utworzono klub".green)
        res.json(savedClub);
    }
    catch(err){
        console.log("createClub>>".blue,"Blad podczas tworzenia klubu".red);
        res.json({message: err});
    }


})

//ALL CLUB PLAYERS
router.get('/:clubId/players', async (req,res) =>{
    try{
        console.log(req.params.clubId);
        const club = await Club.findById(req.params.clubId).populate("players");
        //console.log(club);
        console.log("getAllPlayersInClub>>".blue,"Pomyślnie pobrano wszystkich graczy z klubu".green)
        console.log(club);
        res.json(club);
    }
    catch(err){
        console.log("getAllPlayersInClub>>".blue,"Blad podczas pobierania graczy z danego klubu".red);
        res.json({message:err});
    }
})

//SPECIFIC CLUB
router.get('/:clubId', async (req,res) => {
    try{
        const club = await Club.findById(req.params.clubId);
        console.log("getSpecificClub>>".blue,"Pomyślnie pobrano jeden wybrany klub".green)
        res.json(club);
    }
    catch(err){
        console.log("getSpecificClub>>".blue,"Blad podczas pobierania jednego klubu".red);
        res.json({message:err});
    }

})

//DELETE CLUB
router.delete('/:clubId', async (req,res) => {
    try{
        const club = await Club.findById(req.params.clubId).populate("players").populate("matches");
        //console.log(club);
        club.players.forEach((e) => {
            console.log(e.club);
            e.club = undefined;
            e.save();
        })
        club.matches.forEach(async (e) => {
            await Match.deleteOne({_id: e._id});
        })

        const removedClub = await Club.remove({_id: req.params.clubId});
        console.log("deleteClub>>".blue,"Pomyslnie usunieto klub".green)
        res.json(club);
    }
    catch(err){
        console.log("deleteClub>>".blue,"Blad podczas usuwania klubu".red);
        res.json({message:err});
    }
    
})

//UPDATE CLUB
router.patch('/:clubId',async (req, res) => {
    try{
        const updatedClub =  await Club.updateOne({_id: req.params.clubId},{$set : {name: req.body.name, type: req.body.type}});
        console.log("updateClub>>".blue,"Pomyslnie zaaktualizowano klub".green)
        res.json(updatedClub);
    }
    catch(err){
        console.log("updateClub>>".blue,"Blad aktualizowania klubu".red);
        res.json({message:err});
    }
    
})

export default router;