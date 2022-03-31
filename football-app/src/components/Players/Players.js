import React, { useState, useEffect } from "react";
import axios from "axios";
import Player from "./Player/Player";
import NewPlayerCreator from "./PlayerData/PlayerCreator/NewPlayerCreator";
import PlayerData from "./PlayerData/PlayerData";
import PlayerEditor from "./PlayerData/PlayerEditor/PlayerEditor";
import styles from "../Navbar/Navbar.module.css";

const Players = (props) => {
  const [playersState, setPlayersState] = useState({
    players: [],
  });

  const [actionState, setActionState] = useState({
    action: null,
  });

  //Wczytywanie listy graczy
  useEffect(() => {
    axios.get("http://localhost:5000/players", null).then((response) => {
      //const firstTenEmployees = response.data.slice(0,10);

      const players = response;
      setPlayersState({
        players: players.data,
      });
    });
  });

  //Otworzenie okna z tworzeniem nowego gracza
  const newPlayerHandler = (id) => {
    setActionState({
      action: <NewPlayerCreator />,
    });
  };

  const removePlayerHandler = (id) => {
    if (id !== null) {
      axios
        .delete("http://localhost:5000/players/" + id, null)
        .then((response) => {
          setActionState({
            action: (
              <div>
                <h2>Pomyślnie usunięto</h2>
              </div>
            ),
          });
        });
    }
  };

  const editPlayerHandler = (id) => {
    if (id !== null) {
      axios
        .get("http://localhost:5000/players/" + id, null)
        .then((response) => {
          setActionState({
            action: (
              <PlayerEditor
                id={response.data._id}
                name={response.data.name}
                nationality={response.data.nationality}
              />
            ),
          });
        });
    }
  };

  //Wybieranie gracza po wciśnięciu na niego
  const selectPlayerHandler = (id) => {
    axios.get("http://localhost:5000/players/" + id, null).then((response) => {
      setActionState({
        action: (
          <PlayerData
            name={response.data.name}
            nationality={response.data.nationality}
            club={response.ClubID}
          />
        ),
      });
    });
  };

  //Mapowanie graczy
  const players = playersState.players.map((player, index) => {
    return (
      <Player
        key={player._id}
        id={player._id}
        name={player.name}
        nationality={player.nationality}
        showSelectedPlayer={selectPlayerHandler}
        remove={removePlayerHandler}
        edit={editPlayerHandler}
      ></Player>
    );
  });

  return (
    <div>
      {actionState.action}
      <h2>Lista Graczy</h2>
      <button className={styles.button} onClick={newPlayerHandler}>
        Nowy Piłkarz
      </button>
      {players}
    </div>
  );
};

export default Players;
