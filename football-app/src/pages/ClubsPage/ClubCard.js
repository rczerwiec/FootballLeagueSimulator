import {useState } from "react";
import {FiEdit3, FiTrash} from "react-icons/fi"
import Card from "../../components/Layout/Card";
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


    const cardData=[
        {buttonIcon: <FiEdit3/>, 
        func:handleSetEdit,
        name:"Edit"
    },
    {
        buttonIcon: <FiTrash/>, 
        func:() => {removeClub(club._id)},
        name:"Remove"
    }
    ]

    const handleOnContentClick = () => {
        if(edit===false){
            setInfo(club)
        }
    }

    return <Card onContentClick={handleOnContentClick} cardData={cardData} content={content}/>
}

export default ClubCard;