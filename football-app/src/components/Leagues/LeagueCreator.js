import React, {useState} from "react";

const LeagueCreator = () =>{

    const [name, setName] = useState("");

    return(
        <div>Tworzenie ligi
             <form>
                <input></input>
            </form> 
        </div>
       
    )
}

export default LeagueCreator;