import React, {useState} from "react";
import axios from "axios";

const PlayerEditor = (props) =>{

    const [name, setName] = useState(props.name);
    const [nationality, setNationality] = useState(props.nationality);

    let saveNewData = async (e) =>{
        const playerToSave = {
            name: name,
            nationality: nationality,
        }
    
        axios.patch('http://localhost:5000/players/'+props.id,playerToSave).then(response =>{
            console.log(response);
        });
    }

    return(
        <div>
            <h3>Informacje o graczu</h3>
            <form onSubmit={saveNewData}>
                Nazwa:<input value={name} onChange={(e) => setName(e.target.value)}></input>
                Pochodzenie:<input value={nationality} onChange={(e) => setNationality(e.target.value)}></input>
                Klub:w trakcie prac
                <button type="submit">Edytuj</button>
            </form>

        </div>
    );
}
//Klub:<input>{props.club}</input>

export default PlayerEditor;