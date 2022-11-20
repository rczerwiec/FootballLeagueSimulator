import { useEffect, useState } from "react";
import ClubList from "./ClubList";
import CreateClub from "./CreateClub";
import {createClub, deleteClub, getAllClubs} from "../../api/clubs";
import {IoMdAdd, IoMdArrowBack} from "react-icons/io";

function Clubs() {
    const [action, setAction] = useState(true);
    const [clubs, setClubs] = useState([]);

    useEffect(async() => {
        const res = await getAllClubs();

        setClubs(res);
    },[])

    const handleRemoveClub = async(id) => {
        await deleteClub(id)
        const updatedClubs =  clubs.filter((club) => {
            return club._id !== id;
        })

        setClubs(updatedClubs);
    }

    let content = <ClubList onRemove={handleRemoveClub} clubs={clubs}/>
    let actionIcon = <IoMdAdd/>



    const handleClubCreate = async (name,type) =>{
        const res = await createClub({name,type})

        if(res.data.message === undefined){
            setAction(true);
            setClubs([...clubs, res.data])
        }
        
    }



    if(action===false){
        content = <CreateClub onCreate={handleClubCreate}/>
        actionIcon=<IoMdArrowBack/>
    }

  return (
    <div>
        {content}

        <div className="action-button-div">
            <button onClick={() => {setAction(!action)}} className="action-button">{actionIcon}</button>
        </div>

    </div>
  );
}

export default Clubs;
