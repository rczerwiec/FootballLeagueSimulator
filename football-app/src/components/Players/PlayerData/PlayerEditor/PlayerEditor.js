import React, {useState,useEffect} from "react";
import api from "../../../../api/api";
import Selector from "../../../Buttons/Selector/Selector";
import styles from '../PlayerFullInfo.module.css';
import SubmitButton from "../../../Buttons/SubmitButton/SubmitButton";
import TextField from "../../../Buttons/TextField/TextField";
import { getAllClubs } from "../../../../api/clubs";
import { patchPlayer } from "../../../../api/players";

const PlayerEditor = (props) =>{

    const [name, setName] = useState(props.name);
    const [nationality, setNationality] = useState(props.nationality);
    const [overall, setOverall] = useState(props.overall);
    const [club, setClub] = useState();
    const [clubs, setClubs] = useState({
        clubs:[],
    })
        
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

    let saveNewData = async (e) =>{
        const playerToSave = {
            name: name,
            nationality: nationality,
            club: club,
            overall: overall,
        }
        await patchPlayer(props.id,playerToSave);
    }

    return(
        <div className={styles.CreateNewPlayer}>
            <h3>Edycja Gracza</h3>
            <form className={styles.PlayerForm} onSubmit={saveNewData}>
                <TextField text={"Nazwa"} value={name} placeholder="Zmień Nazwa Gracza" onChange={(e) => setName(e.target.value)}></TextField>
                <TextField text={"Narodowość"} value={nationality} placeholder=" ZmieńNarodowość Gracza" onChange={(e) => setNationality(e.target.value)}></TextField>
                <TextField text={"Overall"} value={overall} placeholder="Zmień Overall Gracza" onChange={(e) => setOverall(e.target.value)}></TextField>
                <Selector text={"Klub"} placeholder="Wybierz Klub Do Zmiany" options={clubs.clubs} onChange={(e) => setClub(e.value)}/>
                <SubmitButton className = {styles.Button} type="submit">Edytuj</SubmitButton>
            </form>

        </div>
    );
}
//Klub:<input>{props.club}</input>

export default PlayerEditor;