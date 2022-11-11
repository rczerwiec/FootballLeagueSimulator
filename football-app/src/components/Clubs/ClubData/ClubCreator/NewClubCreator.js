import React, {useState} from "react";
import styles from "../ClubFullInfo.module.css"
import api from "../../../../api/api";

import TextField from "../../../Buttons/TextField/TextField";
import SubmitButton from "../../../Buttons/SubmitButton/SubmitButton";

const NewClubCreator = () =>{

const [name, setName] = useState("");
const [type, setType] = useState("");

let handleSubmit = async (e) =>{
    const clubToSave = {
        name: name,
        type: type,
      }
  
      api.post('/clubs',clubToSave);
}

    return(
        <div className={styles.CreateNewClub}>
            <h3>Utwórz Klub</h3>
            <form className={styles.ClubForm} onSubmit={handleSubmit}>
                <TextField placeholder="Wprowadź nazwe klubu" text={"Nazwa"} value={name} onChange={(e) => setName(e.target.value)}/>
                <TextField placeholder="Wprowadź typ klubu" text={"Typ"} value={type} onChange={(e) => setType(e.target.value)}/>
                <SubmitButton>Utwórz</SubmitButton>
            </form>
        </div>
    );
}

export default NewClubCreator