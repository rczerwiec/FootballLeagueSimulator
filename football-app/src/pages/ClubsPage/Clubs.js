import { useState } from "react";
import './Clubs.scss';
import ClubList from "./ClubList";
import CreateClub from "./CreateClub";
import {IoMdAdd, IoMdArrowBack} from "react-icons/io";
import Button from "../../components/ReusableComponents/Button";

function Clubs() {
    const [action, setAction] = useState(true);
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
