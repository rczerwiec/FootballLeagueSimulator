import Match from "../models/Match.js";
import Club from "../models/Club.js";

//router.get("/friendly", getAllFriendlyMatches)
export const getAllFriendlyMatches = async (req,res) => async (req,res) => {
    console.log("pobiera mecze towarzyskie")
    try{
        const matches = await Match.find({matchType: "Towarzyski"});
        
        console.log("getAllFriendlyMatches>>".magenta,"Pomyslnie pobrano mecze towarzyskie".green);
        res.json(matches);
    }
    catch(err){
        console.log("getAllFriendlyMatches>>".magenta,"Blad podczas pobierania meczy towarzyskich".red);
        res.json(err);
    }
}

export const updateLeagueMatch = async(req,res) => {
    console.log(req.body);
    try{
        const match = await Match.updateOne({_id: req.params.matchId}, {$set : {
            scoreHome: req.body.match.scoreHome,
            scoreAway: req.body.match.scoreAway,
            complete: req.body.match.complete,
            winner: req.body.winner,
        }})
        const clubHome = await Club.findById(req.body.match.clubHome);
        clubHome.matches.push(req.body.match);
        const clubAway = await Club.findById(req.body.match.clubAway);
        clubAway.matches.push(req.body.match);
        if(req.body.winner === req.body.match.clubHome){
            clubHome.wins +=1;
            clubAway.lost +=1;
        }
        else if(req.body.winner === req.body.match.clubAway){
            clubAway.wins +=1;
            clubHome.lost +=1;
        }
        else{
            clubAway.draws +=1;
            clubHome.draws +=1;
        }
        clubHome.save();
        clubAway.save();
        // console.log(clubHome)
        // console.log(clubAway)
        // console.log(match);
        // console.log(req.body)
        console.log("updateLeagueMatch>>".magenta,"Pomyslnie zaaktualizowano mecz ligowy".green);
        res.json(req.body)
    }
    catch(err){
        console.log("updateLeagueMatch>>".magenta,"Blad podczas aktualizacji meczu ligowego".red, err);
        res.json({message:err})
    }
}

export const createFriendlyMatch = async(req,res)=>{
    //console.log(req);
    try{
            const match =new Match({
            matchType: "Towarzyski",
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
        console.log("createFriendlyMatch>>".magenta,"Pomyslnie wygenerowano mecz towarzyski".green);
        res.json(match);
    }
    catch(err){
        console.log("createFriendlyMatch>>".magenta,"Blad podczas generowania meczu towarzyskiego".red);
        res.json({message:err});
    }
}