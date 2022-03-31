import React, {useState} from "react";
import axios from "axios";

const NewPlayerCreator = (props) =>{

    
    const [name, setName] = useState("");
    const [nationality, setNationality] = useState("");

    let handleSubmit = async (e) =>{
        const playerToSave = {
            name: name,
            nationality: nationality,
        }
    
        axios.post('http://localhost:5000/players',playerToSave).then(response =>{
            console.log(response);
        });
    }

    return(
        <div>
            <h3>Nowy Gracz</h3>
            <form onSubmit={handleSubmit}>
                <input value={name} placeholder="Nazwa Gracza" onChange={(e) => setName(e.target.value)}></input>
                <input value={nationality} placeholder="Narodowość Gracza" onChange={(e) => setNationality(e.target.value)}></input>
                <button type="submit">Stwórz</button>

            </form>
        </div>
    );
}

export default NewPlayerCreator