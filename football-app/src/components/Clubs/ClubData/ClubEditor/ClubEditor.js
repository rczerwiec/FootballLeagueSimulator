import React, {useState} from "react";
import styles from "../ClubData.module.css"
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
        <div className={styles.CreateNewClub}>
            <h3>Edytuj Klub</h3>
            <form className={styles.ClubForm} onSubmit={saveNewData}>
                Nazwa:<input className={styles.ClubInput} value={name} onChange={(e) => setName(e.target.value)}></input>
                Typ:<input className={styles.ClubInput} value={type} onChange={(e) => setType(e.target.value)}></input>
                <button className = {styles.Button} type="submit">Edytuj</button>
            </form>

        </div>
    );
}

export default ClubEditor;