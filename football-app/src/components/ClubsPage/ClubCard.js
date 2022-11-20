import { useState } from "react";
import {FiEdit3, FiTrash} from "react-icons/fi"
import ClubEdit from "./ClubEdit";

function ClubCard({club, setInfo, onRemove}){

    const [edit, setEdit] = useState(false);

    let content = <div>{club.name}</div>

    if(edit===true){
        content = <ClubEdit club={club}/>
    }

    return <div className="club-card">
        <div onClick={() => {setInfo(club)}} className="cardTeamName">
        {content}
        </div>
        <div className="card-action-buttons">
            <div onClick={() => setEdit(!edit)} className="card-ation-button"><FiEdit3/></div>
            <div onClick={() => {onRemove(club._id)}} className="card-ation-button"><FiTrash/></div>
        </div>
        
    </div>
}

export default ClubCard;