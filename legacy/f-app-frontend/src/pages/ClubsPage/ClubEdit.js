import {useState } from "react";
import Button from "../../components/ReusableComponents/Button";
import Input from "../../components/ReusableComponents/Input";
import { useEditClubMutation } from "../../store";

function ClubEdit({club, handleSetEdit}){
    const [editClub, results] = useEditClubMutation();
    const [name, setName] = useState(club.name);
    //console.log(results);
    const handleEditClub = (e) => {
        e.preventDefault();
        //console.log(name);
        editClub({clubId:club._id,club:{name:name}}).then(() => {
            handleSetEdit();
        });

    }

    return(
        <div >
            <form className="edit-container" onSubmit={handleEditClub}>
                <label>Nazwa</label>
                <Input value={name} onChange={(e) =>setName(e.target.value)}/>
                <Button secondary rounded>Zmień</Button>
            </form>
            
        </div>
    )
}

export default ClubEdit;