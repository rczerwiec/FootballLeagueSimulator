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

router.patch("/:matchId", async(req,res) => {
    try{

        const match = await Match.findById(req.params.matchId);

        //console.log(match.clubHome);
        //console.log(req.body.winner);
        if(req.body.winner === match.clubHome.toString()){
            console.log("Wygral dom")
            await Match.updateOne({_id: req.params.matchId}, {$set : {
                scoreHome: req.body.scoreWinner,
                scoreAway: req.body.scoreLoser,
                complete: req.body.complete
            }})
            await Club.find()
        }
        else if(req.body.winner === null){
            console.log("remis")
            await Match.updateOne({_id: req.params.matchId}, {$set : {
                scoreHome: req.body.scoreWinner,
                scoreAway: req.body.scoreLoser,
                complete: req.body.complete
            }})
        }
        else{
            console.log("Wygral wyjazd")
            await Match.updateOne({_id: req.params.matchId}, {$set : {
                scoreHome: req.body.scoreLoser,
                scoreAway: req.body.scoreWinner,
                complete: req.body.complete
            }})

        }

        console.log("updateMatch>>".magenta,"Pomyslnie zaaktualizowano mecz ligowy".green);
        res.json(match)
    }
    catch(err){
        console.log("updateMatch>>".magenta,"Blad podczas aktualizacji meczu ligowego".red, err);
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