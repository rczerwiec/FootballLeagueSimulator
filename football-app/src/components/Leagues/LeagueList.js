import axios from "axios";
import React, { useEffect, useState } from "react";
import LeagueTable from "./LeagueTable";
import LeagueCard from "./LeagueCard";
import LeagueGenerator from "./LeagueGenerator";

const LeagueList = (props) => {
  const [leagues, setLeagues] = useState({
    list: [],
    loading: true,
  });

  const [actionState, setActionState] = useState({
    action: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/leagues")
      .then((res) => {
        setLeagues({
          list: res.data,
          loading: false,
        });
        console.log(leagues);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [leagues.loading]);

  const onLeagueCardClick = (e) => {
    console.log("klick");
    console.log(e);

  };

  const mapLeagues = leagues.list.map((e) => {
    return (
        <LeagueCard key={e._id} data={e} clickLeagueCard={
            () => {
            if(e.clubs.length===0){
                setActionState({
                    action: <LeagueGenerator key={e._id} data={e}/>
                })
            }
            else{
                setActionState({
                    action: <LeagueTable key={e._id} data={e}/>,
                  });
            }
        }}/>
    );
  });
  return (
    <div>
    {actionState.action ? (
      <div>{actionState.action}</div>
    ) : (
      <div>{mapLeagues}</div>
    )}
  </div>
  )
};

export default LeagueList;
