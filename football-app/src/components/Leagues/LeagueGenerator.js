import React, { useEffect, useState } from "react";
import api from "../../api/api";

import SubmitButton from "../Buttons/SubmitButton/SubmitButton";
import Selector from "../Buttons/Selector/Selector";
import { getAllClubs } from "../../api/clubs";
import { generateNewLeague } from "../../api/leagues";

const LeagueGenerator = (props) => {
  
  const [clubs, setClubs] = useState({
    list: [],
    loading: true,
  });

  const [teams, setTeams] = useState([]);
  //console.log(teams);

  useEffect(async() => {
    const allClubs = await getAllClubs();
    const options = allClubs.map((club) => ({
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

  const generateLeague = async() => {
    const newLeague = {
        clubs: teams,
    }
    
    await generateNewLeague(props.data._id,newLeague);
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
