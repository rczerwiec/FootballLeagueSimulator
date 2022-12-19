import express from "express";
import LeagueTable from "../models/LeagueTable.js";
const router = express.Router();

router.get("/:leagueId", async (req, res) => {
  try {
    const table = await LeagueTable.find({ leagues: req.params.leagueId });

    res.json();
  } catch (err) {
    res.json(err);
  }
});

router.post("", async (req, res) => {
  try {
    const table = new LeagueTable({
      league: req.body.leagueId,
      club: req.body.clubId,
      clubName: req.body.clubName,
    });

    res.json(table);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:leagueId/:clubId", async (req, res) => {
  try {
    const table = await LeagueTable.findOne({
      league: req.params.leagueId,
      club: req.params.clubId,
    });
    //If club draw
    //console.log(req.body.match);
    //console.log(req.body.club);

    let type;
    let home;
    if (req.body.club == req.body.match.clubHome) {
      if (parseInt(req.body.match.scoreHome) > parseInt(req.body.match.scoreAway)) {
        type = "winner";
        home = true;
      } else if (parseInt(req.body.match.scoreAway) > parseInt(req.body.match.scoreHome)) {
        type = "loser";
        home = true;
      } else {
        type = "draw";
        home = true;
      }
    } else {
        if (parseInt(req.body.match.scoreHome) > parseInt(req.body.match.scoreAway)) {
            type = "loser";
            home = false;
          } else if (parseInt(req.body.match.scoreAway) > parseInt(req.body.match.scoreHome)) {
            type = "winner";
            home = false;
          } else {
            type = "draw";
            home = false;
          }
    }
    updateClub(type,home,table,req.body.match)

    res.json(table);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

const updateClub = async (type,home, table, match) => {

  await LeagueTable.updateOne(
    { _id: table._id },
    {
      $set: {
        playedGames: table.playedGames + 1,
        wonGames: type === "winner" ? table.wonGames+1 : table.wonGames,
        drawGames: type === "draw" ? table.drawGames+1 : table.drawGames,
        lostGames:type === "loser" ? table.lostGames+1 : table.lostGames,
        goalsShot: updateGoalsShot(home,table,match),
        goalsLost: updateGoalsLost(home,table,match),
        goalsDif: updateGoalsDif(home,table,match),
        points: updatePoints(type,home,table,match),
    }
  })
};


const updateGoalsShot = (home,table,match) => {
    if(home){
        return table.goalsShot + parseInt(match.scoreHome)
    }
    else{
        return table.goalsShot + parseInt(match.scoreAway)
    }
}

const updateGoalsLost = (home,table,match) => {
    if(home){
        return table.goalsLost + parseInt(match.scoreAway)
    }
    else{
        return table.goalsLost + parseInt(match.scoreHome)
    }
}

const updateGoalsDif = (home,table,match) => {
    if(home){
        return (table.goalsShot + parseInt(match.scoreHome))-(table.goalsLost + parseInt(match.scoreAway))
    }
    else{
        return (table.goalsShot + parseInt(match.scoreAway)) - (table.goalsLost + parseInt(match.scoreHome))
    }
}

const updatePoints = (type,home,table,match) =>{
    if(type === "winner"){
        return table.points+3;
    }
    else if(type === "loser"){
        return table.points;
    }
    else{
        return table.points+1;
    }
}

export default router;
