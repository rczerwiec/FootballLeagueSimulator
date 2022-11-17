import React, {useState, useEffect} from "react";
import api from "../../../../api/api";
import styles from '../PlayerFullInfo.module.css';
import TextField from "../../../Buttons/TextField/TextField";
import SubmitButton from "../../../Buttons/SubmitButton/SubmitButton";
import Selector from "../../../Buttons/Selector/Selector";
import { createPlayer } from "../../../../api/players";
import { getAllClubs } from "../../../../api/clubs";

const NewPlayerCreator = (props) =>{

    const [name, setName] = useState("");
    const [nationality, setNationality] = useState("");
    const [club, setClub] = useState(undefined);
    const [overall, setOverall] = useState("");
    const [clubs, setClubs] = useState({
        clubs:[],
    })
        
    //Lista klubów do wyboru w select
    useEffect(async() => {
        if(clubs.clubs.length === 0){
            const res = await getAllClubs();
            const options = res.map(d =>({
                "value": d._id,
                "label": d.name
            }))
            setClubs({clubs:options})
        }
        //console.log(clubs);
    });

    let handleSubmit = async (e) =>{
        const playerToSave = {
            name: name,
            nationality: nationality,
            club: club,
            overall: overall,
        }
    
        await createPlayer(playerToSave);
    }

    return(
        <div className={styles.CreateNewPlayer}>
            <h3>Nowy Gracz</h3>
            <form className={styles.PlayerForm} onSubmit={handleSubmit}>
                
                <TextField text={"Nazwa"} value={name} placeholder="Nazwa Gracza" onChange={(e) => setName(e.target.value)}></TextField>
                <TextField text={"Narodowość"} value={nationality} placeholder="Narodowość Gracza" onChange={(e) => setNationality(e.target.value)}></TextField>
                <TextField text={"Overall"} value={overall} placeholder="Overall Gracza" onChange={(e) => setOverall(e.target.value)}></TextField>
                <Selector text={"Klub"} placeholder="Wybierz Klub" options={clubs.clubs} onChange={(e) => setClub(e.value)}/>
                <SubmitButton>Stwórz</SubmitButton>

            </form>
        </div>
    );
}

export default NewPlayerCreator