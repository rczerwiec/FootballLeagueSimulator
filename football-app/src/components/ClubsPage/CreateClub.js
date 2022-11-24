import { useContext, useState } from "react";
import ClubsContext from "../../context/clubs";
import Button from "../ReusableComponents/Button";
import Input from "../ReusableComponents/Input";

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
        <div className="flex justify-center">
            <form className="justify-center bg-zinc-600 p-6 rounded-lg rounded-br-lg m-2.5 drop-shadow-lg" onSubmit={handleSubmit}>
                <h1 className="text-2xl">Utwórz Drużynę</h1>
                <label>Nazwa</label>
                <div><Input placeholder="Wprowadź nazwę drużyny" value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
                <label>Rodzaj</label>
                <div><Input placeholder="Wprowadź nazwę drużyny" value={type} onChange={(e)=>{setType(e.target.value)}}/></div>
                <Button secondary rounded>Utwórz</Button>
            </form>
        </div>
    )
}

export default CreateClub;