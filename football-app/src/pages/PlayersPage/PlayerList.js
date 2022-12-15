import {useState } from "react";
import PlayerInfo from "./PlayerInfo";
import PlayerCard from "./PlayerCard";
import Spinner from "../../components/Spinner/Spinner";
import {useFetchPlayersQuery} from '../../store/index';

function PlayerList(){

    const {data, error, isLoading} = useFetchPlayersQuery();
    
    const [action,setAction] = useState(true)
    const [selectedPlayer, setSelectedPlayer] = useState();

    const setInfo= (player) => {
        setAction(!action)
        setSelectedPlayer(player);
    }

    let content;

    if(isLoading){
        content = <Spinner/>
    }
    else if(error){
        content = <div>There is an error</div>
    }
    else{
        content = data.map((player) => {
            return <PlayerCard key={player._id} setInfo={setInfo} player={player}/>
        })
    }

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