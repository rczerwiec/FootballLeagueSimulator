import { useContext, useState } from "react";
import {FiEdit3, FiTrash} from "react-icons/fi"
import ClubsContext from "../../context/clubs";
import ClubEdit from "./ClubEdit";

function ClubCard({club, setInfo}){
    const {handleRemoveClub} = useContext(ClubsContext);
    const [edit, setEdit] = useState(false);

    let content = <div >{club.name}</div>

    if(edit===true){
        content = <ClubEdit club={club}/>
    }

    return <div className="club-card">
        <div onClick={() => {
            if(edit===false){
                setInfo(club)
            }
            }} className="card-team-name">
        {content}
        </div>
        <div onClick={() => setEdit(!edit)} className="card-ation-button"><FiEdit3/></div>
        <div onClick={() => {handleRemoveClub(club._id)}} className="card-ation-button"><FiTrash/></div>

        
    </div>
}

export default ClubCard;