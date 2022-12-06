import { useContext, useState } from "react";
import {FiEdit3, FiTrash} from "react-icons/fi"
import PlayersContext from "../../context/players";
import PlayerEdit from "./PlayerEdit";

function PlayerCard({player, setInfo}){
    const {handleRemovePlayer} = useContext(PlayersContext);
    const [edit, setEdit] = useState(false);

    let content = <div >{player.name}</div>

    if(edit===true){
        content = <PlayerEdit player={player}/>
    }


    return <div className="card">
    <div onClick={() => {
        if(edit===false){
            setInfo(player)
        }
        }} className="card-name">
    {content}
    </div>
    <div onClick={() => setEdit(!edit)} className="card-ation-button"><FiEdit3/></div>
    <div onClick={() => {handleRemovePlayer(player._id)}} className="card-ation-button"><FiTrash/></div>

    
</div>
}

export default PlayerCard;