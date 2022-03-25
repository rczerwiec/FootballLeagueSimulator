import React, {useState, useEffect} from "react";
import axios from "axios";
import Player from "./Player/Player";

const Players = props => {
    
    const [playersState, setPlayersState] = useState({
        players: [],
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

    const players = playersState.players.map((player, index) => {
        return(
            <Player key={player._id} name={player.name} nationality={player.nationality}></Player>
        );
        
    })

    return(
        <div>
            <h2>Lista Graczy</h2>
            {players}
        </div>

    );
}


export default Players;