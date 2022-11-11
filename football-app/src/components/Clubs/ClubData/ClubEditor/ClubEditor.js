import React, {useState} from "react";
import styles from "../ClubFullInfo.module.css"
import api from "../../../../api/api";
import TextField from "../../../Buttons/TextField/TextField";
import SubmitButton from "../../../Buttons/SubmitButton/SubmitButton";


const ClubEditor = (props) =>{

    const [name, setName] = useState(props.name);
    const [type, setType] = useState(props.type);

    let saveNewData = async (e) =>{
        const toSave = {
            name: name,
            type: type,
        }
    
        api.patch('clubs/'+props.id,toSave);
    }

    return(
        <div className={styles.CreateNewClub}>
            <h3>Edytuj Klub</h3>
            <form className={styles.ClubForm} onSubmit={saveNewData}>
                <TextField text={"Nazwa"} value={name} onChange={(e) => setName(e.target.value)}/>
                <TextField text={"Typ"} value={type} onChange={(e) => setType(e.target.value)}/>
                <SubmitButton>Edytuj</SubmitButton>
            </form>

        </div>
    );
}

export default ClubEditor;