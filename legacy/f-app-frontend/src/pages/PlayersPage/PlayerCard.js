import {useState } from "react";
import {FiEdit3, FiTrash} from "react-icons/fi"
import Card from "../../components/Layout/Card";
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

    //context
    const cardData = [
        {
            buttonIcon: <FiEdit3/>,
            func:handleSetEdit,
            name:"Edit",
        },
        {
            buttonIcon: <FiTrash/>,
            func:() => {removeUser(player)},
            name:"Remove",
        },
    ]

    const handleOnContentClick = () => {
        if(edit===false){
            setInfo(player)
        }
        }


    return <Card cardData={cardData} content={content} onContentClick={handleOnContentClick}/>
}

export default PlayerCard;