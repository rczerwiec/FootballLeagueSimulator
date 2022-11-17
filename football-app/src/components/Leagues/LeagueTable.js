import React, { useEffect, useState } from "react";
import TeamsTable from "./TeamsTable";
import LeagueMatches from "./LeagueMatches";
import api from "../../api/api";

const LeagueTable= (props) => {
    const [matches, setMatches] = useState({
        list: [],
        loading: true,
    })
    const [tables, setTables] = useState({
        list: [],
        loading: true,
    })

    useEffect(() => {
        api.get("/leagues/"+props.data._id+"/matches").then((res) => {
            //console.log(res.data);
            setMatches({
                list: res.data,
                loading:false,
            })
        }).catch(
            (err)=>{
                console.log(err);
        })
        api.get("/leagues/"+props.data._id+"/tables").then((res) => {
            setTables({
                list: res.data,
                loading:false,
            })
        }).catch(
            (err)=>{
                console.log(err);
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