import { useContext, useEffect, useState } from "react";
import './Clubs.scss';
import ClubList from "./ClubList";
import CreateClub from "./CreateClub";
import {IoMdAdd, IoMdArrowBack} from "react-icons/io";
import ClubsContext from "../../context/clubs";
import Button from "../../components/ReusableComponents/Button";

function Clubs() {
    const {fetchAllClubs} = useContext(ClubsContext);

    const [action, setAction] = useState(true);

    useEffect(async() => {
        await fetchAllClubs();
    },[fetchAllClubs])

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
            <Button primary rounded border fontxl onClick={changeAction}>{actionIcon}</Button>
        </div>

    </div>
  );
}

export default Clubs;
