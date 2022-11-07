import axios from "axios";
import React, {useState} from "react";

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
                <label>Nazwa</label>
                <input value={league.name} onChange={
                    (e) => {
                        setLeague({
                            name: e.target.value,
                            level: league.level,
                            maxTeams: league.maxTeams,
                        })
                        console.log(league);
                }}></input>
                <label>Waga ligi</label>
                <input value={league.level} onChange={
                    (e) => {
                        setLeague({
                            name: league.name,
                            level: e.target.value,
                            maxTeams: league.maxTeams,
                        })
                        console.log(league);
                }}></input>
                <label>Ilość drużyn</label>
                <input value={league.maxTeams} onChange={
                    (e) => {
                        setLeague({
                            name: league.name,
                            level: league.level,
                            maxTeams: e.target.value,
                        })
                        console.log(league);
                }}></input>
                <button>Utworz!</button>
            </form> 
        </div>
       
    )
}

export default LeagueCreator;