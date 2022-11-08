import express from "express";
const router = express.Router();
import Match from "../models/Match.js";
import Club from "../models/Club.js";

router.get("/", async (req,res) => {
    try{
        const matches = await Match.find();

        console.log("getAllMatches>>".magenta,"Pomyslnie pobrano wszystkie mecze towarzyskie".green);
        res.json(matches);
    }
    catch(err){
        res.json({message:err});
    }
})

router.get("/friendly",async (req,res) => {
    try{
        const matches = await Match.find({matchType: "Towarzyski"});
        
        console.log(matches);

        res.json(matches);
    }
    catch(err){
        res.json(err);
    }
})

router.patch("/:matchId", async(req,res) => {
    try{
        if(req.body.winner === req.params.clubId){
            await Match.updateOne({_id: req.params.matchId}, {$set : {
                scoreHome: req.body.scoreWinner,
                scoreAway: req.body.scoreLoser,
                complete: req.body.complete
            }})
        }
        else if(req.body.winner === null){
            await Match.updateOne({_id: req.params.matchId}, {$set : {
                scoreHome: req.body.scoreWinner,
                scoreAway: req.body.scoreLoser,
                complete: req.body.complete
            }})
        }
        else{
            await Match.updateOne({_id: req.params.matchId}, {$set : {
                scoreHome: req.body.scoreLoser,
                scoreAway: req.body.scoreWinner,
                complete: req.body.complete
            }})

        }



    }
    catch(err){
        res.json({message:err})
    }
})

router.post("/", async(req,res)=>{
    //console.log(req);
    try{
            const match =new Match({
            matchType: req.body.matchType,
            clubHome: req.body.firstClub.id,
            clubHomeName: req.body.firstClub.name,
            clubHomePlayers: req.body.firstClub.players,
            clubAway: req.body.secondClub.id,
            clubAwayName: req.body.secondClub.name,
            clubAwayPlayers: req.body.secondClub.players,
            scoreHome: Math.floor(Math.random() * (5- 1 + 1) + 1),
            scoreAway: Math.floor(Math.random() * (5- 1 + 1) + 1),
            complete: true,
        })

        const firstClub = await Club.findById(req.body.firstClub.id);
        await firstClub.matches.push(match)
        await firstClub.save();
        const secondClub = await Club.findById(req.body.secondClub.id);
        await secondClub.matches.push(match)
        await secondClub.save();
        //console.log(firstClub);
        2

        await match.save();
        console.log("generateMatch>>".magenta,"Pomyslnie wygenerowano mecz towarzyski".green);
        res.json(match);
    }
    catch(err){
        console.log("generateMatch>>".magenta,"Blad podczas generowania meczu towarzyskiego".red);
        res.json({message:err});
    }
})

export default router;