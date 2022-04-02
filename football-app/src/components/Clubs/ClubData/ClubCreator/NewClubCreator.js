import React, {useState, useEffect} from "react";
import axios from "axios";

const NewClubCreator = () =>{

const [name, setName] = useState("");
const [type, setType] = useState("");

let handleSubmit = async (e) =>{
    const clubToSave = {
        name: name,
        type: type,
      }
  
      axios.post('http://localhost:5000/clubs',clubToSave).then(response =>{
        console.log(response);
      });
}

    return(
        <div>
            <h3>Utwórz Klub</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Wprowadź nazwe klubu" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Wprowadź typ klubu" value={type} onChange={(e) => setType(e.target.value)}/>
                <button type="submit">Utwórz</button>
            </form>
        </div>
    );
}

export default NewClubCreator