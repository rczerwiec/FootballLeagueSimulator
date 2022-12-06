import { useContext, useState } from "react";
import PlayerInfo from "./PlayerInfo";
import PlayerCard from "./PlayerCard";
import PlayersContext from "../../context/players";


function PlayerList(){
    const {players} = useContext(PlayersContext);

    const [action,setAction] = useState(true)
    const [selectedPlayer, setSelectedPlayer] = useState();

    const setInfo= (player) => {
        setAction(!action)
        setSelectedPlayer(player);
    }

    const renderPlayers = players.map((player) => {
        return <PlayerCard key={player._id} setInfo={setInfo} player={player}/>
    })

    let content  = renderPlayers;

    if(action===false){
        content = <PlayerInfo player={selectedPlayer} onClick={() => {setAction(!action)}}/>
    }


    return(
        <div className="list-container">
            <h1>Gracze</h1>
            {content}
        </div>
    )
}

export default PlayerList;