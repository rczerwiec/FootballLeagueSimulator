import League from "../../../models/League.js";
import LeagueClubStats from "../../../models/LeagueClubStats.js";
import Match from "../../../models/Match.js";
//If max clubs are assigment, generate matches and wait for them complete
const generateMatches = (clubs,level,id) => {
    //console.log(clubs);
    const matchList = [];
    const tablesList = [];
    clubs.map(async(home,x) => {
        const table = await new LeagueClubStats({
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
                matchList.push(match);
                await match.save();
                await League.updateOne({_id: id}, {$set : {matches:matchList, tables:tablesList}})
            }
            
        });
        
        //await home.save();
        
    })
    console.log(matchList);
    
}

export default generateMatches;