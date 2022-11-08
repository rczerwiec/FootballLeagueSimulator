import React from "react";
import LeagueMatch from "./LeagueMatch";

const LeagueMatches = (props) => {
    
    const matches = props.matchList.map((e) => {
        return (
            <LeagueMatch data={props.data} matchData={e}/>
        )
    })
    
    return(
        <div>{matches}</div>
    )
}

export default LeagueMatches;