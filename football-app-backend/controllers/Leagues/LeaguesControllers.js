import League from "../../models/League.js";
import Match from "../../models/Match.js";
import LeagueTable from "../../models/LeagueClubStats.js";
import LeagueGenerator from "./utils/generateMatches.js";

//router.get('/', getAllLeagues)
export const getAllLeagues = async(req,res) => {
    try{
        const leages = await League.find();
        console.log("getAllLeagues>>".cyan,"Pomyslnie pobrano ligi".green);
        res.json(leages);
    }
    catch(err){
        console.log("getAllLeagues>>".cyan,"Blad podczas pobierania lig".red);
        res.json(err);
    }
}

//router.get('/:leagueId/matches',getLeagueMatches )
export const getLeagueMatches = async(req,res) => {
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
}

//router.get('/:leagueId/tables', getLeagueTables)
export const getLeagueTables = async(req,res) => {
    try{
        const league = await League.findById(req.params.leagueId).populate("tables");
        console.log("getLeagueTables>>".cyan,"Pomyslnie pobrano tabele dla danej ligi".green);
        res.json(league.tables);
    }
    catch(err){
        console.log("getLeagueTables>>".cyan,"Blad podczas pobierania tabeli".green);
        res.json({message:err})
    }
}

//router.post('/',generateLeague )
export const generateLeague = async(req,res) => {
    try{
        let league = new League({
            name: req.body.name,
            level: req.body.level,
            maxTeams: req.body.maxTeams,
            complete: false,
            matches: [],
            clubs: req.body.clubs,
        })
        
        
        await league.save();
        league=await league.populate('clubs')
        LeagueGenerator(league.clubs, league.level, league._id);

        console.log("generateLeague>>".cyan,"Pomyslnie wygenerowano lige i mecze dla niej".green);
        res.json(league)
    }
    catch(err){
        console.log("generateLeague>>".cyan,"Blad podczas generowania ligi".red);
        res.json(err);
    }
}