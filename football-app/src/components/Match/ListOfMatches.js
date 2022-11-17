
import React from "react";
import InformationCard from "../InformationCard/InformationCard";



const ListOfMatches = (props) =>{

    const listOfMatches = props.matches.list.map((m) => {
        //console.log(m);
        return(
            <InformationCard>
                {m.clubHomeName} {m.scoreHome}:{m.scoreAway} {m.clubAwayName}
                </InformationCard>
        )
    })

    return(
        <div>
            {listOfMatches}
        </div>
            
    )
}

export default ListOfMatches;