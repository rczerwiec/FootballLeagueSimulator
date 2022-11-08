import express from 'express';
import League from '../models/League.js';
import Match from '../models/Match.js';
import LeagueTable from '../models/LeagueTable.js';
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

router.get('/:leagueId/matches', async(req,res) => {
    try{
        const league = await League.findById(req.params.leagueId).populate("matches");
        //console.log(league);
        console.log("getLeagueMatches>>".cyan,"Pomyslnie pobrano mecze dla danej ligi".green);
        res.json(league.matches);
    }
    catch(err){
        console.log("getLeagueMatches>>".cyan,"Blad podczas pobierania meczow".green);
        res.json({message:err})
    }
})

router.get('/:leagueId/tables', async(req,res) => {
    try{
        const league = await League.findById(req.params.leagueId).populate("tables");
        console.log("getLeagueTables>>".cyan,"Pomyslnie pobrano tabele dla danej ligi".green);
        res.json(league.tables);
    }
    catch(err){
        console.log("getLeagueTables>>".cyan,"Blad podczas pobierania tabeli".green);
        res.json({message:err})
    }
})

// router.get('/:leagueId/matches/:clubId', async(req,res) => {
    
// })

//CREATE League and wait for clubs assignment
router.post('/', async(req,res) => {
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
        console.log("createLeague>>".cyan,"Blad podczas generowania ligi".red);
        res.json(err);
    }
})

const generateMatches = (clubs,level,id) => {
    //console.log(clubs);
    const matchList = [];
    const tablesList = [];
    clubs.map(async(home,x) => {
        const table = await new LeagueTable({
            league: id,
            club: home._id,
            clubName: home.name
        });
        await table.save();
        tablesList.push(table);
        clubs.map(async (away,i) => {
            if(x!==i){
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
                await matchList.push(match);
                await match.save();
            }
            
        });
        await League.updateOne({_id: id}, {$set : {matches:matchList, tables:tablesList}})
    })
}

router.patch('/:leagueId', async(req,res)=>{
    
    try{
        
        await League.updateOne({_id: req.params.leagueId}, {$set : {matches:[], clubs: req.body.clubs}})
        const league = await League.findById(req.params.leagueId).populate("clubs");
        generateMatches(league.clubs, league.level, req.params.leagueId);

        
        console.log("generateMatches>>".cyan,"Pomyslnie wygenerowano mecze dla ligi!".green);
        res.json();
    }
    catch(err){
        console.log("generateMatches>>".cyan,"Blad podczas generowania meczow".red,err);
        res.json({message:err})
    }
})

//If max clubs are assigment, generate matches and wait for them complete


export default router;