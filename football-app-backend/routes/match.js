import express from "express";
const router = express.Router();
import Match from "../models/Match.js";

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

router.post("/", async(req,res)=>{
    console.log(req);
    try{
        const match =new Match({
            clubHome: req.body.firstClub.id,
            clubAway: req.body.secondClub.id,
            scoreHome: Math.floor(Math.random() * (5- 1 + 1) + 1),
            scoreAway: Math.floor(Math.random() * (5- 1 + 1) + 1)
        })
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