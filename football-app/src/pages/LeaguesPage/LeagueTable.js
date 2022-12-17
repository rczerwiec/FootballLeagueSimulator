import TeamsTable from "./TeamsTable";
import LeagueMatches from "./LeagueMatches";
import { useGetLeagueMatchesQuery, useGetLeagueTablesQuery } from "../../store";
import Spinner from "../../components/Spinner/Spinner";

function LeagueTable({league}) {
    const matches= useGetLeagueMatchesQuery(league._id);
    const tables= useGetLeagueTablesQuery(league._id);
    //console.log(tables);
    //console.log(matches);


    let matchesContent;
    let tableContent;

    if(matches.isLoading || tables.isLoading){
        matchesContent=<Spinner/>
    }
    else if(matches.error || tables.error){
        matchesContent=<div>Error while matches or table loading...</div>
    }
    else{
        matchesContent=<LeagueMatches league={league} matchList={matches.data}/>
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