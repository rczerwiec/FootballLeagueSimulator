import React from 'react';
import SimpleButton from "../Buttons/SimpleButton/SimpleButton";
import api from "../../api/api";

const Settings = (props) => {

    let generatePlayers = async (e) => {
        console.log("Generowanie graczy")    
        
        const stats = {
            howMuchToGenerate: 10,
        }
    
        api.post('/players/generateMultiple',stats).then(response =>{
            console.log("Odpowiedź",response);
        });
    }

    return(
        <div><h2>Ustawienia</h2>
        <SimpleButton text="Generuj 10 Graczy" onClick={generatePlayers}/>
        <SimpleButton text="Generuj 10 Graczy" onClick={generatePlayers}/>
        <SimpleButton text="Generuj 10 Graczy" onClick={generatePlayers}/>
        </div>
    );
}

export default Settings;