import React, { useState} from "react";
import api from "../../api/api";
import PlayerCard from "./PlayerCard/PlayerCard";
import NewPlayerCreator from "./PlayerData/PlayerCreator/NewPlayerCreator";
import PlayersFullInfo from "./PlayerData/PlayerFullInfo";
import PlayerEditor from "./PlayerData/PlayerEditor/PlayerEditor";
import styles from "./PlayersMenu.module.css";
import Spinner from "../Spinner/Spinner";
import { getPlayer, removePlayer } from "../../api/players";

function PlayersMenu (props){
  const [actionState, setActionState] = useState(<div></div>);

  //Otworzenie okna z tworzeniem nowego gracza
  const newPlayerHandler = (id) => {
    setActionState( <NewPlayerCreator />,
    );
  };

  const removePlayerHandler = async(id) => {
    if (id !== null) {
      const deletedPlayer = await removePlayer(id);

        setActionState(
            <div>
              <h2>Pomyślnie usunięto {deletedPlayer.name}</h2>
            </div>
          );
    }
  };

  const editPlayerHandler = async(id) => {
    if (id !== null) {
      const selectedPlayer = await getPlayer(id);
      setActionState(
          <PlayerEditor
            id={selectedPlayer._id}
            name={selectedPlayer.name}
            nationality={selectedPlayer.nationality}
            club={selectedPlayer.club}
            age={selectedPlayer.age}
            overall={selectedPlayer.overall}
          />
        );
    }
  };

  //Wybieranie gracza po wciśnięciu na niego
  const selectPlayerHandler = async(id) => {
    
    if (id !== null) {
      const selectedPlayer = await getPlayer(id);

      setActionState(
        <PlayersFullInfo
          playerName={selectedPlayer.name}
          playerNationality={selectedPlayer.nationality}
          playerClub={selectedPlayer.club}
          playerOverall={selectedPlayer.overall}
          playerAge={selectedPlayer.age}
          />
        );
    }
  };

  //Mapowanie graczy
  const players = props.players.map((player, index) => {
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
      {actionState !==null ?
        (<div className={styles.Action}>{actionState}</div>):(<div/>)
      }
      {props.players.loading ? (<Spinner/>) :
        (      <div>
      <div className={styles.Header}>Lista Graczy</div>
      <button className={styles.Button} onClick={newPlayerHandler}>
        Nowy Piłkarz
      </button>
      <div className={styles.Players}>{players}</div>
      </div>)
        
      }

    </div>
  );
};

export default PlayersMenu;
