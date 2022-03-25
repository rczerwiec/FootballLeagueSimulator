import React, {useState, useEffect} from "react";
import axios from "axios";
import Player from "./Player/Player";
import NewPlayerCreator from "./PlayerCreator/NewPlayerCreator";

const Players = props => {
    
    const [playersState, setPlayersState] = useState({
        players: [],
    })

    const [actionState, setActionState] = useState({
        action: null,
    })

    useEffect(() => {
        axios.get("http://localhost:5000/players", null).then((response) => {
      //const firstTenEmployees = response.data.slice(0,10);

      const players = response;
      setPlayersState({
        players: players.data,
      });
    });
    })

    const newPlayerHandler = () =>{
        setActionState({
            action: <NewPlayerCreator/>
        })
    }

    const players = playersState.players.map((player, index) => {
        return(
            <Player key={player._id} name={player.name} nationality={player.nationality}></Player>
        );
        
    })

    return(
        <div>
            {actionState.action}
            <h2>Lista Graczy</h2>
            <button onClick={newPlayerHandler}>Nowy Piłkarz</button>
            {players}
        </div>

    );
}


export default Players;