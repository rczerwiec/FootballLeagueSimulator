import React from "react";
import InformationCard from "../InformationCard/InformationCard";

const LeagueCard = (props) => {
    console.log(props);
    return(
        <div onClick={props.clickLeagueCard}>
            <InformationCard>{props.data.name}</InformationCard>
        </div>
    )
}

export default LeagueCard;