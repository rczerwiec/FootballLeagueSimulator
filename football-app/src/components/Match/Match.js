import axios from "axios";
import api from "../../api/api";
import React, { useEffect, useState } from "react";
import Selector from "../Buttons/Selector/Selector";
import SubmitButton from "../Buttons/SubmitButton/SubmitButton";
import Spinner from "../Spinner/Spinner";
import ListOfMatches from "./ListOfMatches";
import { getFriendlyMatches } from "../../api/match";
import { getAllClubs } from "../../api/clubs";

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

  useEffect(async() => {
    const friendlyMatches = await getFriendlyMatches()
    setMatches({ list: friendlyMatches });
    const allClubs = await getAllClubs();
    
    const options = allClubs.map((club) => ({
      value: club._id,
      label: club.name,
      players: club.players,
    }));

    setClubs({
      list: options,
      loading: false,
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
        api
          .post("/matches", match)
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
          <Selector text="Drużyna 1" options={clubs.list} onChange={onFirstClubChange}/>
          {firstClub ? <div>Wybrany</div> : <div>Nie Wybrany</div>}
          
          <Selector text="Drużyna 2" options={clubs.list} onChange={onSecondClubChange}/>
          {secondClub ? <div>Wybrany</div> : <div>Nie Wybrany</div>}

          <SubmitButton>Zagraj</SubmitButton>
        </form>
      )}
      {matches.list.length > 0 ? <ListOfMatches matches={matches} /> : <span />}
    </div>
  );
};

export default Match;
