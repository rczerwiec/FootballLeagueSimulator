import LeagueClubStats from "../../../models/LeagueClubStats.js";

const updateClub = async (type,home, table, match) => {

    await LeagueClubStats.updateOne(
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

export default updateClub;