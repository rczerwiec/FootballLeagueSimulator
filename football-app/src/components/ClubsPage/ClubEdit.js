import { useState } from "react";
import TextField from "../Buttons/TextField/TextField";

function ClubEdit({club}){
    const [value, setValue] = useState(club.name)

    return(
        <div>
            <TextField text="Nazwa" value={value} onChange={(e) =>setValue(e.target.value)} placeholder="IN PROGRESS"/>
        </div>
    )
}

export default ClubEdit;