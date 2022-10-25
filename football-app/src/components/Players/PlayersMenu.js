import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerCard from "./PlayerCard/PlayerCard";
import NewPlayerCreator from "./PlayerData/PlayerCreator/NewPlayerCreator";
import PlayersFullInfo from "./PlayerData/PlayerFullInfo";
import PlayerEditor from "./PlayerData/PlayerEditor/PlayerEditor";
import styles from "./PlayersMenu.module.css";

const PlayersMenu = (props) => {
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
                age={response.data.age}
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
          <PlayersFullInfo
            playerName={response.data.name}
            playerNationality={response.data.nationality}
            playerClub={response.data.club}
            playerOverall={response.data.overall}
            playerAge={response.data.age}

          />
        ),
      });
    });
  };

  //Mapowanie graczy
  const players = playersState.players.map((player, index) => {
    return (
      <PlayerCard
        key={player._id}
        id={player._id}
        name={player.name}
        age={player.age}
        overall={player.overall}
        nationality={player.nationality}
        showSelectedPlayer={selectPlayerHandler}
        remove={removePlayerHandler}
        edit={editPlayerHandler}
      ></PlayerCard>
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

export default PlayersMenu;
