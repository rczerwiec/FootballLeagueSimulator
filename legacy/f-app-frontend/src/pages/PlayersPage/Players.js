import {useState} from "react";
import '../ClubsPage/Clubs.scss';
import {IoMdAdd, IoMdArrowBack} from "react-icons/io";
import PlayerList from "./PlayerList";
import CreatePlayer from "./CreatePlayer";
import Button from "../../components/ReusableComponents/Button";

function Players(){

    const [action, setAction] = useState(true);

    const changeAction = () => {setAction(!action)}

    let content = <PlayerList/>
    let actionIcon = <IoMdAdd/>

    if(action===false){
        content = <CreatePlayer changeAction={changeAction}/>
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

export default Players;