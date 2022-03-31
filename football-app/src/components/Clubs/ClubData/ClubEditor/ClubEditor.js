import React, {useState} from "react";
import axios from "axios";

const ClubEditor = (props) =>{

    const [name, setName] = useState(props.name);
    const [type, setType] = useState(props.type);

    let saveNewData = async (e) =>{
        const toSave = {
            name: name,
            type: type,
        }
    
        axios.patch('http://localhost:5000/clubs/'+props.id,toSave).then(response =>{
            console.log(response);
        });
    }

    return(
        <div>
            <h3>Informacje o klubie</h3>
            <form onSubmit={saveNewData}>
                Nazwa:<input value={name} onChange={(e) => setName(e.target.value)}></input>
                Typ:<input value={type} onChange={(e) => setType(e.target.value)}></input>
                <button type="submit">Edytuj</button>
            </form>

        </div>
    );
}

export default ClubEditor;