import express from 'express';
const router = express.Router();
import Player from '../models/Player.js';
import Club from '../models/Club.js';
import {faker} from '@faker-js/faker';

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
    console.log(player);
    try{
        if(req.body.club !==undefined){
            const club = await Club.findById(player.club.valueOf());
            if (club.players.length <= 4){
                const savedPlayer = await player.save();
                club.players.push(savedPlayer);
                await club.save();
                res.json(savedPlayer);
                console.log("Utworzono gracza i przypisano go do klubu")
            }
            else{
                res.json({message:"Klub jest pełen!"});
            }
        }
        else{
            player.club = undefined;
            const savedPlayer = await player.save();
            res.json(savedPlayer);
            console.log("Utworzono gracza bez klubu")
        }

    }
    catch(err){
        console.log("Błąd podczas tworzenia gracza")
        res.json({message: err});
    }
})

//GENERATE X PLAYERS
router.post('/generateMultiple', async(req,res) =>{
    //console.log(req.body);
    
    for(var i=0; i<req.body.howMuchToGenerate; i++){
        console.log(i);
        var randomNumber = Math.floor(Math.random() * (100 - 1 + 1) + 1)

        const player = new Player({
            name: faker.name.firstName() + " " + faker.name.lastName(),
            nationality: faker.address.country(),
            overall: randomNumber
        })

        try{
            player.club = undefined;
            const savedPlayer = await player.save();
            //console.log(savedPlayer);
            
        }
        catch(err){
            res.json({message: err});
        }
    }
    res.json("Pomyślnie wygenerowano graczy");
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
        if(player.club !== undefined && player.club !== null){
            const club = await Club.findById(player.club.valueOf());
            await Player.deleteOne({_id:req.params.playerId});
            club.players.splice(club.players.indexOf(req.params.playerId),1);
            await club.save();
            res.json(player);
            console.log("Pomyślnie usunięto gracza i jego dane z klubu");
        }
        else{
            await Player.deleteOne({_id:req.params.playerId});
            res.json(player);
            console.log("Pomyślnie usunięto gracza");
        }
    }
    catch(err){
        console.log("Błąd podczas usuwania gracza")
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

export default router;