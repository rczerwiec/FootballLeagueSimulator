
import React from "react";
import Card from "../../components/Layout/Card";



function FriendlyMatchList({matches}){

    const listOfMatches = matches.map((m) => {
        console.log(m);
        return(
            <Card content={<>{m.clubHomeName} {m.scoreHome}:{m.scoreAway} {m.clubAwayName}</>}/>
        )
    })

    return(
        <div>
            {listOfMatches}
        </div>
            
    )
}

export default FriendlyMatchList;