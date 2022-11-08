import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton";
import Spinner from "../Spinner/Spinner";
import ListOfMatches from "./ListOfMatches";

const Match = () => {
  const [clubs, setClubs] = useState({
    list: [],
    loading: true,
  });

  const [matches, setMatches] = useState({
    list: [],
  });

  const [firstClub, setFirstClub] = useState(null);
  const [secondClub, setSecondClub] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/matches/friendly")
      .then((res) => {
        console.log(res.data);
        setMatches({ list: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
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

  const onFirstClubChange = (e) => {
    console.log(e);
    setFirstClub({
      id: e.value,
      name: e.label,
      players: e.players,
    });
  };

  const onSecondClubChange = (e) => {
    setSecondClub({
      id: e.value,
      name: e.label,
      players: e.players,
    });
  };

  const onGenerateResultHandler = (e) => {
    if (firstClub != null && secondClub != null) {
      if (firstClub.name !== secondClub.name) {
        const match = {
          firstClub: firstClub,
          secondClub: secondClub,
          matchType: "Towarzyski",
        };
        axios
          .post("http://localhost:5000/matches", match)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div>
      {clubs.loading ? (
        <Spinner />
      ) : (
        <form onSubmit={onGenerateResultHandler}>
          <label>Drużyna 1</label>
          <Select options={clubs.list} onChange={onFirstClubChange} />
          {firstClub ? <div>Wybrany</div> : <div>Nie Wybrany</div>}

          <label>Drużyna 2</label>
          <Select options={clubs.list} onChange={onSecondClubChange} />
          {secondClub ? <div>Wybrany</div> : <div>Nie Wybrany</div>}

          <button>Wynik Manualny</button>
          <button type="submit">Wynik Generowany</button>
        </form>
      )}
      {matches.list.length > 0 ? <ListOfMatches matches={matches} /> : <span />}
    </div>
  );
};

export default Match;
