import LeagueList from "./LeagueList";
import Button from "../../components/ReusableComponents/Button";
import {IoMdAdd, IoMdArrowBack} from "react-icons/io";
import { useState } from "react";
import CreateLeague from "./CreateLeague";
import LeagueInfo from "./LeagueInfo";

function Leagues() {

  const [action, setAction] = useState("list");
  const [selectedLeague, setSelectedLeague] = useState();

    
  const handleOnClick = () => {
    action === "list" ? setAction("create") : setAction("list")
  }

  const handleOnCardClick = (league) =>{
    setSelectedLeague(league);
    action === "list" ? setAction("info") : setAction("list")
  }

  let content = <LeagueList handleOnCardClick={handleOnCardClick}/>
  let buttonIcon = <IoMdAdd/>

  if (action === "create"){
    content = <CreateLeague onLeagueCreate={handleOnClick}/>
    buttonIcon=<IoMdArrowBack/>

  }
  else if(action === "info"){
    content = <LeagueInfo league={selectedLeague}/>
    buttonIcon=<IoMdArrowBack/>
  }


  return (
    <div>
      <h2>Ligi</h2>
      {content}
      <div className="action-button-div">
            <Button primary rounded border fontxl onClick={handleOnClick}>{buttonIcon}</Button>
      </div>
    </div>
  );
}

export default Leagues;
