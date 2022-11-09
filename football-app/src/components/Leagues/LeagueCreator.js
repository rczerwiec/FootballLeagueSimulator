import axios from "axios";
import React, {useState} from "react";
import SubmitButton from "../Buttons/SubmitButton/SubmitButton";
import TextField from "../Buttons/TextField/TextField";

const LeagueCreator = () =>{

    const [league, setLeague] = useState({
        name: '',
        level: '',
        maxTeams: 0,
    })

    const onLeagueSubmit= () =>{
        axios.post('http://localhost:5000/leagues',league).catch(
            (err) => {
                console.log(err)
            }
        )
    }

    return(
        <div>Tworzenie ligi
             <form onSubmit={onLeagueSubmit}>
                <TextField text={"Nazwa"} value={league.name} onChange={
                    (e) => {
                        setLeague({
                            name: e.target.value,
                            level: league.level,
                            maxTeams: league.maxTeams,
                        })
                        console.log(league);
                }}/>
                <TextField text={"Waga ligi"} value={league.level} onChange={
                    (e) => {
                        setLeague({
                            name: league.name,
                            level: e.target.value,
                            maxTeams: league.maxTeams,
                        })
                        console.log(league);
                }}/>
                <TextField text="Ilość drużyn" value={league.maxTeams} onChange={
                    (e) => {
                        setLeague({
                            name: league.name,
                            level: league.level,
                            maxTeams: e.target.value,
                        })
                }}/>
                <SubmitButton>Utworz!</SubmitButton>
            </form> 
        </div>
       
    )
}

export default LeagueCreator;