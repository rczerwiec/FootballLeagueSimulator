import React from "react";
import LeagueMatch from "./LeagueMatch";

function LeagueMatches({league, matchList}){
    
    const matches = matchList.map((m) => {
        return (
            <LeagueMatch key={m._id} league={league} match={m}/>
        )
    })
    
    return(
        <div>{matches}</div>
    )
}

export default LeagueMatches;