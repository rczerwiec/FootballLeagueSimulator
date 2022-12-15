import {useState } from "react";
import {FiEdit3, FiTrash} from "react-icons/fi"
import { useRemovePlayerMutation } from "../../store";
import PlayerEdit from "./PlayerEdit";

function PlayerCard({player, setInfo}){
    const [removeUser, results] = useRemovePlayerMutation(player);
    const [edit, setEdit] = useState(false);

    let content = <div >{player.name}</div>


    const handleSetEdit = () => {
        setEdit(!edit);
    }

    if(edit===true){
        content = <PlayerEdit handleSetEdit={handleSetEdit} player={player}/>
    }



    return <div className="card">
    <div onClick={() => {
        if(edit===false){
            setInfo(player)
        }
        }} className="card-name">
    {content}
    </div>
    <div onClick={handleSetEdit} className="card-ation-button"><FiEdit3/></div>
    <div onClick={() => {removeUser(player)}} className="card-ation-button"><FiTrash/></div>

    
</div>
}

export default PlayerCard;