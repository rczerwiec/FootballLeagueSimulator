import { useContext, useState } from "react";
import ClubsContext from "../../context/clubs";
import Button from "../ReusableComponents/Button";
import Input from "../ReusableComponents/Input";

function ClubEdit({club}){
    const {handleEditClub} = useContext(ClubsContext);
    const [value, setValue] = useState(club.name);
    
    return(
        <div >
            <form className="flex flex-row flex-wrap justify-center m- " onSubmit={()=>{
                handleEditClub(club._id, {name:value});
            }}>
                <label className="m-4">Nazwa</label>
                <Input value={value} onChange={(e) =>setValue(e.target.value)}/>
            <Button secondary rounded>Zmień</Button>
            </form>
            
        </div>
    )
}

export default ClubEdit;