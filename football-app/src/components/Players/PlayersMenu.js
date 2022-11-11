import React, { useState} from "react";
import api from "../../api/api";
import PlayerCard from "./PlayerCard/PlayerCard";
import NewPlayerCreator from "./PlayerData/PlayerCreator/NewPlayerCreator";
import PlayersFullInfo from "./PlayerData/PlayerFullInfo";
import PlayerEditor from "./PlayerData/PlayerEditor/PlayerEditor";
import styles from "./PlayersMenu.module.css";
import Spinner from "../Spinner/Spinner";

const PlayersMenu = (props) => {
  const [actionState, setActionState] = useState(<div></div>);

  //Otworzenie okna z tworzeniem nowego gracza
  const newPlayerHandler = (id) => {
    setActionState( <NewPlayerCreator />,
    );
  };

  const removePlayerHandler = async(id) => {
    if (id !== null) {
      const deletedPlayer = await api.delete("/players/" + id, null)

        setActionState(
            <div>
              <h2>Pomyślnie usunięto {deletedPlayer.name}</h2>
            </div>
          );
    }
  };

  const editPlayerHandler = async(id) => {
    if (id !== null) {
      const selectedPlayer = await api.get("/players/" + id, null)
      setActionState(

          <PlayerEditor
            id={selectedPlayer.data._id}
            name={selectedPlayer.data.name}
            nationality={selectedPlayer.data.nationality}
            club={selectedPlayer.data.club}
            age={selectedPlayer.data.age}
            overall={selectedPlayer.data.overall}
          />
        );
    }
  };

  //Wybieranie gracza po wciśnięciu na niego
  const selectPlayerHandler = async(id) => {
    
    if (id !== null) {
      const selectedPlayer = await api.get("/players/" + id, null)

      setActionState(
        <PlayersFullInfo
          playerName={selectedPlayer.data.name}
          playerNationality={selectedPlayer.data.nationality}
          playerClub={selectedPlayer.data.club}
          playerOverall={selectedPlayer.data.overall}
          playerAge={selectedPlayer.data.age}
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
