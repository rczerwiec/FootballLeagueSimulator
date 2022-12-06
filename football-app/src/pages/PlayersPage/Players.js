import { useContext, useState, useEffect } from "react";
import '../ClubsPage/Clubs.scss';
import PlayersContext from "../../context/players";
import {IoMdAdd, IoMdArrowBack} from "react-icons/io";
import PlayerList from "./PlayerList";
import CreatePlayer from "./CreatePlayer";
import Button from "../../components/ReusableComponents/Button";

function Players(){
    const {fetchAllPlayers} = useContext(PlayersContext);

    const [action, setAction] = useState(true);

    useEffect(async() => {
        await fetchAllPlayers();
    },[fetchAllPlayers])

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