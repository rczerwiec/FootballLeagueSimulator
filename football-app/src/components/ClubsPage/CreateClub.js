import { useContext, useState } from "react";
import ClubsContext from "../../context/clubs";
import SubmitButton from "../Buttons/SubmitButton/SubmitButton";
import TextField from "../Buttons/TextField/TextField";

function CreateClub({changeAction}){
    const {handleClubCreate} = useContext(ClubsContext);
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleClubCreate(name,type);
        changeAction();
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Utwórz Drużynę</h2>
                <TextField text="Nazwa" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Wprowadź nazwę drużyny"></TextField>
                <TextField text="Rodzaj" value={type} onChange={(e)=>{setType(e.target.value)}} placeholder="Kontynent/Państwo"></TextField>
                <SubmitButton>Utwórz!</SubmitButton>
            </form>
        </div>
    )
}

export default CreateClub;