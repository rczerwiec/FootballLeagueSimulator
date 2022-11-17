import React, { useEffect, useState } from "react";
import TeamsTable from "./TeamsTable";
import LeagueMatches from "./LeagueMatches";
import api from "../../api/api";
import { getLeagueMatches, getLeagueTable } from "../../api/leagues";

const LeagueTable= (props) => {
    const [matches, setMatches] = useState({
        list: [],
        loading: true,
    })
    const [tables, setTables] = useState({
        list: [],
        loading: true,
    })

    useEffect(async() => {
        const matches = await getLeagueMatches(props.data._id);
        setMatches({
            list: matches,
            loading:false,
        })
        const tables = await getLeagueTable(props.data._id);
        setTables({
            list: tables,
            loading:false,
        })
    },[matches.loading])

    return(
        <div>
            <TeamsTable data={props.data} matchList={matches.list} tableList={tables.list}/>
            <LeagueMatches data={props.data} matchList={matches.list}/>
        </div>
    )
}

export default LeagueTable