import React, { useEffect, useState } from "react";
import api from "../../api/api";

import SubmitButton from "../Buttons/SubmitButton/SubmitButton";
import Selector from "../Buttons/Selector/Selector";

const LeagueGenerator = (props) => {
  
  const [clubs, setClubs] = useState({
    list: [],
    loading: true,
  });

  const [teams, setTeams] = useState([]);
  //console.log(teams);

  useEffect(async() => {
    const allClubs = await api.get("/clubs").catch(err => console.log(err));
    const options = allClubs.data.map((club) => ({
        value: club._id,
        label: club.name,
        players: club.players,
      }));
    console.log(options)
    setClubs({
        list: options,
        loading: false,
      });


  }, [clubs.loading]);

  const generateSelectors = [...Array(props.data.maxTeams)].map((_, i) => {
    return <Selector key={i} options={clubs.list} onChange={(e)=> {
        const newList = teams;
        newList[i] = e.value;
        console.log(e);
        setTeams(newList)
    }}/>;
  });

  const generateLeague = () => {
    const newLeague = {
        clubs: teams,
    }
    api.patch("/leagues/"+props.data._id, newLeague);
  }

  return (
    <div>
      Wybierz kluby do ligi
      <form onSubmit={generateLeague}>
      {generateSelectors}
      <SubmitButton>generuj</SubmitButton>
      </form>


    </div>
  );
};

export default LeagueGenerator;
