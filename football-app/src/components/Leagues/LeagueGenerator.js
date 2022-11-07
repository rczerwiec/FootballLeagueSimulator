import React, { useEffect, useState } from "react";
import Selector from "react-select";
import axios from "axios";

const LeagueGenerator = (props) => {
  
  const [clubs, setClubs] = useState({
    list: [],
    loading: true,
  });

  const [teams, setTeams] = useState({
    list: [],
  });
  console.log(teams);

  useEffect(() => {
    axios
      .get("http://localhost:5000/clubs")
      .then((res) => {
        //console.log(res.data);
        const options = res.data.map((club) => ({
          value: club._id,
          label: club.name,
          players: club.players,
        }));

        setClubs({
          list: options,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [clubs.loading]);

  const generateSelectors = [...Array(props.data.maxTeams)].map((_, i) => {

    return <Selector options={clubs.list} onChange={(e)=> {
        const newList = teams.list;
        newList[i] = e.value;

        setTeams({list: newList,})
    }}/>;
  });

  const generateLeague = () => {
    const newLeague = {
        clubs: teams.list,
    }
    axios.patch("http://localhost:5000/leagues/"+props.data._id, newLeague);
  }

  return (
    <div>
      Wybierz kluby do ligi
      <form onSubmit={generateLeague}>
      {generateSelectors}
      <button>generuj</button>
      </form>


    </div>
  );
};

export default LeagueGenerator;
