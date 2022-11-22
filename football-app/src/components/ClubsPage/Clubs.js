import { useContext, useEffect, useState } from "react";
import ClubList from "./ClubList";
import CreateClub from "./CreateClub";

import {IoMdAdd, IoMdArrowBack} from "react-icons/io";
import ClubsContext from "../../context/clubs";

function Clubs() {
    const {fetchAllClubs} = useContext(ClubsContext)

    const [action, setAction] = useState(true);

    useEffect(async() => {
        fetchAllClubs();
    },[])

    const changeAction = () => {setAction(!action)}

    let content = <ClubList/>
    let actionIcon = <IoMdAdd/>

    if(action===false){
        content = <CreateClub changeAction={changeAction}/>
        actionIcon=<IoMdArrowBack/>
    }

  return (
    <div>
        {content}

        <div className="action-button-div">
            <button onClick={changeAction} className="action-button">{actionIcon}</button>
        </div>

    </div>
  );
}

export default Clubs;
