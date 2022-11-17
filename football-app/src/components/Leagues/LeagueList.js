import api from "../../api/api";
import React, { useEffect, useState } from "react";
import LeagueTable from "./LeagueTable";
import LeagueCard from "./LeagueCard";
import LeagueGenerator from "./LeagueGenerator";
import { getAllLeagues } from "../../api/leagues";

const LeagueList = (props) => {
  const [leagues, setLeagues] = useState({
    list: [],
    loading: true,
  });

  const [actionState, setActionState] = useState({
    action: null,
  });

  useEffect(async () => {
    const allLeagues = await getAllLeagues();

    setLeagues({
      list: allLeagues,
      loading: false,
    });
  }, [leagues.loading]);

  const mapLeagues = leagues.list.map((e) => {
    return (
      <LeagueCard
        key={e._id}
        data={e}
        clickLeagueCard={() => {
          e.clubs.length === 0
            ? setActionState({
                action: <LeagueGenerator key={e._id} data={e} />,
              })
            : setActionState({
                action: <LeagueTable key={e._id} data={e} />,
              });
        }}
      />
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
  );
};

export default LeagueList;
