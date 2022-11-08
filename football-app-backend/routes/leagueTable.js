import express from "express";
import LeagueTable from "../models/LeagueTable.js";
const router = express.Router();

router.get('/:leagueId', async(req,res) => {
    try{
        const table = await LeagueTable.find({leagues:req.params.leagueId});
        
        res.json();
    }
    catch(err){
        res.json(err);
    }
})

router.post('', async(req,res) => {
    try{
        const table = new LeagueTable({
            league: req.body.leagueId,
            club: req.body.clubId,
            clubName: req.body.clubName
        })
        
        res.json(table);
    }
    catch(err){
        res.json({message:err});
    }
})


router.patch('/:leagueId/:clubId', async(req,res) => {
    try{
        const table = await LeagueTable.findOne({league:req.params.leagueId, club: req.params.clubId});
        if(req.body.winner === req.params.clubId){
            await LeagueTable.updateOne({_id:table._id},{$set:{
                playedGames:table.playedGames+1,
                wonGames:table.wonGames+1,
                goalsShot:table.goalsShot+req.body.scoreHome,
                goalsLost:table.goalsLost+req.body.scoreAway,
                goalsDif: (table.goalsShot+req.body.scoreHome)-(table.goalsLost+req.body.scoreAway),
                points: table.points+3,
            }})
        }
        if(req.body.winner === null){
            await LeagueTable.updateOne({_id:table._id},{$set:{
                playedGames:table.playedGames+1,
                drawGames:table.drawGames+1,
                goalsShot:table.goalsShot+req.body.scoreAway,
                goalsLost:table.goalsLost+req.body.scoreHome,
                goalsDif: (table.goalsShot+req.body.scoreAway)-(table.goalsLost+req.body.scoreHome),
                points: table.points+1,
            }})
        }
        else{
            await LeagueTable.updateOne({_id:table._id},{$set:{
                playedGames:table.playedGames+1,
                lostGames:table.lostGames+1,
                goalsShot:table.goalsShot+req.body.scoreAway,
                goalsLost:table.goalsLost+req.body.scoreHome,
                goalsDif: (table.goalsShot+req.body.scoreAway)-(table.goalsLost+req.body.scoreHome),
            }})
        }
        
        res.json(table);
    }
    catch(err){
        res.json({message:err});
    }
})
export default router;