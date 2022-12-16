import LeagueList from "./LeagueList";
import Button from "../../components/ReusableComponents/Button";
import {IoMdAdd, IoMdArrowBack} from "react-icons/io";
import { useState } from "react";
import CreateLeague from "./CreateLeague";
import LeagueInfo from "./LeagueInfo";

function Leagues() {

  const [action, setAction] = useState("list");

    
  const handleOnClick = () => {
    action === "list" ? setAction("create") : setAction("list")
  }

  const handleOnCardClick = () =>{
    console.log(action)
    action === "list" ? setAction("info") : setAction("list")
  }

  let content = <LeagueList handleOnCardClick={handleOnCardClick}/>
  let buttonIcon = <IoMdAdd/>

  if (action === "create"){
    content = <CreateLeague/>
    buttonIcon=<IoMdArrowBack/>

  }
  else if(action === "info"){
    content = <LeagueInfo/>
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
