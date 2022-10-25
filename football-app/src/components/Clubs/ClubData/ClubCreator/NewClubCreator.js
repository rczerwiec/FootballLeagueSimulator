import React, {useState} from "react";
import styles from "../ClubFullInfo.module.css"
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
        <div className={styles.CreateNewClub}>
            <h3>Utwórz Klub</h3>
            <form className={styles.ClubForm} onSubmit={handleSubmit}>
                <input className={styles.ClubInput} type="text" placeholder="Wprowadź nazwe klubu" value={name} onChange={(e) => setName(e.target.value)}/>
                <input className={styles.ClubInput} type="text" placeholder="Wprowadź typ klubu" value={type} onChange={(e) => setType(e.target.value)}/>
                <button className = {styles.Button} type="submit">Utwórz</button>
            </form>
        </div>
    );
}

export default NewClubCreator