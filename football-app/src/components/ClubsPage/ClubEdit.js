import { useContext, useState } from "react";
import ClubsContext from "../../context/clubs";
import SubmitButton from "../Buttons/SubmitButton/SubmitButton";
import TextField from "../Buttons/TextField/TextField";

function ClubEdit({club}){
    const {handleEditClub} = useContext(ClubsContext);
    const [value, setValue] = useState(club.name);
    
    return(
        <div>
            <form onSubmit={()=>{
                handleEditClub(club._id, {name:value});
            }}>
            <TextField text="Nazwa" value={value} onChange={(e) =>setValue(e.target.value)} placeholder="IN PROGRESS"/>
            <SubmitButton>Zmień</SubmitButton>
            </form>
            
        </div>
    )
}

export default ClubEdit;