import {useState } from "react";
import Button from "../../components/ReusableComponents/Button";
import Input from "../../components/ReusableComponents/Input";
import { useCreateClubMutation } from "../../store";

function CreateClub({changeAction}){
    const [createClub, results] = useCreateClubMutation();
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [generatePlayers, setGeneratePlayers] = useState(true)
    console.log(generatePlayers);

    const handleSubmit = async (e) => {
        e.preventDefault();
        createClub({name,type, generatePlayers});
        changeAction();
    }

    return(
        <div className="create-container">
            <form className="create-form" onSubmit={handleSubmit}>
                <h1>Utwórz Drużynę</h1>
                <label>Nazwa</label>
                <div><Input placeholder="Wprowadź nazwę drużyny" value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
                <label>Rodzaj</label>
                <div><Input placeholder="Wprowadź nazwę drużyny" value={type} onChange={(e)=>{setType(e.target.value)}}/></div>
                <label>Generowanie zawodników</label>
                <input type="checkbox" defaultChecked={generatePlayers} onChange={() => setGeneratePlayers(!generatePlayers)}></input>
                <div><Button secondary rounded>Utwórz</Button></div>
            </form>
        </div>
    )
}

export default CreateClub;