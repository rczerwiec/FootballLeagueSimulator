import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import Spinner from "../Spinner/Spinner";

const Match = () => {
  const [clubs, setClubs] = useState({
    list: [],
    loading: true,
  });

  const [firstClub, setFirstClub] = useState(null);
  const [secondClub, setSecondClub] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/clubs")
      .then((res) => {
        console.log(res.data);
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
  },[clubs.loading]);

  const onFirstClubChange = (e) => {
    console.log(e);
    setFirstClub({
        id: e.value,
        name: e.label,
    });
  }

  const onSecondClubChange = (e) => {
    setSecondClub({
        id: e.value,
        name: e.label,
    })
  }

  return (
    <div>
      {clubs.loading ? (
        <Spinner /> ) : 
        (
        <form>
          <label>Drużyna 1</label>
          <Select options={clubs.list} onChange={onFirstClubChange}/>
          {firstClub ? <div>Wybrany</div> : <div>Nie Wybrany</div>}

          <label>Drużyna 2</label>
          <Select options={clubs.list} onChange={onSecondClubChange}/>
          {secondClub ? <div>Wybrany</div> : <div>Nie Wybrany</div>}

          <button>Wynik Manualny</button>
          <button>Wynik Generowany</button>
        </form>
      )}
    </div>
  );
};

export default Match;
