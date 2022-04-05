import React, { useState, useEffect } from "react";
import axios from "axios";
import Player from "./Player/Player";
import NewPlayerCreator from "./PlayerData/PlayerCreator/NewPlayerCreator";
import PlayerData from "./PlayerData/PlayerData";
import PlayerEditor from "./PlayerData/PlayerEditor/PlayerEditor";
import styles from "./Players.module.css";

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
                club={response.data.club}
                overall={response.data.overall}
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
            club={response.data.club}
            overall={response.data.overall}
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
        overall={player.overall}
        nationality={player.nationality}
        showSelectedPlayer={selectPlayerHandler}
        remove={removePlayerHandler}
        edit={editPlayerHandler}
      ></Player>
    );
  });

  return (
    <div>
      {actionState.action !==null ?
        (<div className={styles.Action}>{actionState.action}</div>):(<div/>)
      }
      <div className={styles.Header}>Lista Graczy</div>
      <button className={styles.Button} onClick={newPlayerHandler}>
        Nowy Piłkarz
      </button>
      <div className={styles.Players}>{players}</div>
    </div>
  );
};

export default Players;
