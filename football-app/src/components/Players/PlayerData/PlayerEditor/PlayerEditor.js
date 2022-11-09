import React, {useState,useEffect} from "react";
import axios from "axios";
import Select from 'react-select';
import styles from '../PlayerFullInfo.module.css';
import SubmitButton from "../../../Buttons/SubmitButton/SubmitButton";
import TextField from "../../../Buttons/TextField/TextField";

const PlayerEditor = (props) =>{

    const [name, setName] = useState(props.name);
    const [nationality, setNationality] = useState(props.nationality);
    const [overall, setOverall] = useState(props.overall);
    const [club, setClub] = useState();
    const [clubs, setClubs] = useState({
        clubs:[],
    })
        
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

    let saveNewData = async (e) =>{

        const playerToSave = {
            name: name,
            nationality: nationality,
            club: club,
            overall: overall,
        }
    
        axios.patch('http://localhost:5000/players/'+props.id,playerToSave).then(response =>{
            console.log(response);
        });
    }

    return(
        <div className={styles.CreateNewPlayer}>
            <h3>Edycja Gracza</h3>
            <form className={styles.PlayerForm} onSubmit={saveNewData}>
                <TextField text={"Nazwa"} value={name} placeholder="Zmień Nazwa Gracza" onChange={(e) => setName(e.target.value)}></TextField>
                <TextField text={"Narodowość"} value={nationality} placeholder=" ZmieńNarodowość Gracza" onChange={(e) => setNationality(e.target.value)}></TextField>
                <TextField text={"Overall"} value={overall} placeholder="Zmień Overall Gracza" onChange={(e) => setOverall(e.target.value)}></TextField>
                Klub:<Select
                className = {styles.Button}
                    placeholder="Wybierz Klub Do Zmiany"
                    options={clubs.clubs}
                    onChange={(e) => setClub(e.value)}
                />
                <SubmitButton className = {styles.Button} type="submit">Edytuj</SubmitButton>
            </form>

        </div>
    );
}
//Klub:<input>{props.club}</input>

export default PlayerEditor;