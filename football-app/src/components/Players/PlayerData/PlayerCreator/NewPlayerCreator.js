import React, {useState, useEffect} from "react";
import axios from "axios";
import Select from 'react-select';
import styles from '../PlayerData.module.css';

const NewPlayerCreator = (props) =>{

    const [name, setName] = useState("");
    const [nationality, setNationality] = useState("");
    const [club, setClub] = useState(undefined);
    const [overall, setOverall] = useState("");
    const [clubs, setClubs] = useState({
        clubs:[],
    })
        
    //Lista klubów do wyboru w select
    useEffect(() => {
        if(clubs.clubs.length === 0){
            axios.get("http://localhost:5000/clubs", null).then((response) => {
        
                const options = response.data.map(d =>({
                    "value": d._id,
                    "label": d.name
                }))
                setClubs({
                    clubs: options,
                });
                });
        }
        //console.log(clubs);
    });

    let handleSubmit = async (e) =>{
        console.log(club);
        const playerToSave = {
            name: name,
            nationality: nationality,
            club: club,
            overall: overall,
        }
    
        axios.post('http://localhost:5000/players',playerToSave).then(response =>{
            console.log("Odpowiedź",response);
        });
    }

    return(
        <div className={styles.CreateNewPlayer}>
            <h3>Nowy Gracz</h3>
            <form className={styles.PlayerForm} onSubmit={handleSubmit}>
                <input className={styles.PlayerInput} value={name} placeholder="Nazwa Gracza" onChange={(e) => setName(e.target.value)}></input>
                <input  className={styles.PlayerInput} value={nationality} placeholder="Narodowość Gracza" onChange={(e) => setNationality(e.target.value)}></input>
                <input  className={styles.PlayerInput} value={overall} placeholder="Overall Gracza" onChange={(e) => setOverall(e.target.value)}></input>
                <Select className = {styles.Button}
                    placeholder="Wybierz Klub"
                    options={clubs.clubs}
                    onChange={(e) => setClub(e.value)}
                />
                <button className = {styles.Button} type="submit">Stwórz</button>

            </form>
        </div>
    );
}

export default NewPlayerCreator