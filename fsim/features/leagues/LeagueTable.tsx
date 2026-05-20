"use client";

import TeamsTable from "./TeamsTable";
import LeagueMatches from "./LeagueMatches";
import { useGetLeagueMatchesQuery, useGetLeagueTablesQuery } from "@/store";
import Spinner from "../../components/Spinner/Spinner";

function LeagueTable({ league, disabled = false }) {
    const matches= useGetLeagueMatchesQuery(league._id);
    const tables= useGetLeagueTablesQuery(league._id);

    let matchesContent;
    let tableContent;

    if(matches.isLoading || tables.isLoading){
        matchesContent=<Spinner/>
    }
    else if(matches.error || tables.error){
        matchesContent=<div>Error while matches or table loading...</div>
    }
    else{
        matchesContent=<LeagueMatches league={league} matchList={matches.data} disabled={disabled}/>
        tableContent=<TeamsTable league={league} matchList={matches.data} tableList={tables.data}/>
    }



    return(
        <div className="flex flex-col justify-center">
            {tableContent}
            {matchesContent}
        </div>
    )
}

export default LeagueTable