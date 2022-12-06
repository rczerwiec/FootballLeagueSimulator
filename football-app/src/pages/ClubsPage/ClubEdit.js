import { useContext, useState } from "react";
import ClubsContext from "../../context/clubs";
import Button from "../../components/ReusableComponents/Button";
import Input from "../../components/ReusableComponents/Input";

function ClubEdit({club}){
    const {handleEditClub} = useContext(ClubsContext);
    const [value, setValue] = useState(club.name);
    
    return(
        <div >
            <form className="edit-container" onSubmit={()=>{
                handleEditClub(club._id, {name:value});
            }}>
                <label>Nazwa</label>
                <Input value={value} onChange={(e) =>setValue(e.target.value)}/>
                <Button secondary rounded>Zmień</Button>
            </form>
            
        </div>
    )
}

export default ClubEdit;