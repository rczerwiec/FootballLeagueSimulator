import {useState } from "react";
import {FiEdit3, FiTrash} from "react-icons/fi"
import { useRemoveClubMutation } from "../../store";
import ClubEdit from "./ClubEdit";

function ClubCard({club, setInfo}){
    const [removeClub, results] = useRemoveClubMutation();
    const [edit, setEdit] = useState(false);

    let content = <div >{club.name}</div>
    const handleSetEdit = () =>{
        setEdit(!edit);
    } 

    if(edit===true){
        content = <ClubEdit club={club} handleSetEdit={handleSetEdit}/>
    }



    return <div className="card">
        <div onClick={() => {
            if(edit===false){
                setInfo(club)
            }
            }} className="card-name">
        {content}
        </div>
        <div onClick={handleSetEdit} className="card-ation-button"><FiEdit3/></div>
        <div onClick={() => {removeClub(club._id)}} className="card-ation-button"><FiTrash/></div>

        
    </div>
}

export default ClubCard;