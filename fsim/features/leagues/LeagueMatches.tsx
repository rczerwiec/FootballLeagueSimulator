import React from "react";
import LeagueMatch from "./LeagueMatch";

function LeagueMatches({ league, matchList, disabled = false }) {
    const matches = matchList.map((m) => {
        return (
            <LeagueMatch
                key={m._id}
                league={league}
                match={m}
                disabled={disabled}
            />
        );
    });

    return <div>{matches}</div>;
}

export default LeagueMatches;