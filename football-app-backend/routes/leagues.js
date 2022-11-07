import express from 'express';
import League from '../models/League.js';
import Match from '../models/Match.js';
import Player from '../models/Player.js';
const router = express.Router();

router.get('/', async(req,res) => {
    
    try{
        const leages = await League.find();
        console.log("getLeagues>>".cyan,"Pomyslnie pobrano ligi".green);
        res.json(leages);
    }
    catch(err){
        console.log("getLeagues>>".cyan,"Blad podczas pobierania lig".red);
        res.json(err);
    }
})

//CREATE League and wait for clubs assignment
router.post('/', async(req,res) => {
    console.log('Ktos utworzyl lige')
    try{
        const league = new League({
            name: req.body.name,
            level: req.body.level,
            maxTeams: req.body.maxTeams,
            complete: false
        })
        console.log("createLeague>>".cyan,"Pomyslnie wygenerowano lige".green);
        await league.save();
        res.json(league)
    }
    catch(err){
        onsole.log("createLeague>>".cyan,"Blad podczas generowania ligi".red);
        res.json(err);
    }
})

const generateMatches = (clubs,level) => {
    //console.log(clubs);
    clubs.map(async(home,x) => {
        clubs.map(async (away,i) => {
            if(x!=i){
                const match = new Match({
                    matchType: level,
                    clubHome: home._id,
                    clubHomeName: home.name,
                    clubHomePlayers: home.players,
                    clubAway: away._id,
                    clubAwayName: away.name,
                    clubAwayPlayers: away.players,
                    scoreHome: 0,
                    scoreAway: 0,
                    complete: false,
                    
                })
                await home.matches.push(match);
                await away.matches.push(match);
                
                //console.log(match);
                await match.save();
            }
            
        })
        await home.save();
    })
    

  
}

router.patch('/:leagueId', async(req,res)=>{
    
    try{
        console.log(req.body);
        await League.updateOne({_id: req.params.leagueId}, {$set : {matches:[], clubs: req.body.clubs}})
        const league = await League.findById(req.params.leagueId).populate("clubs");
        generateMatches(league.clubs, league.level);
        res.json();
    }
    catch(err){
        res.json({message:err})
    }
})

//If max clubs are assigment, generate matches and wait for them complete


export default router;