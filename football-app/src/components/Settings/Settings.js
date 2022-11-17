import React from 'react';
import SimpleButton from "../Buttons/SimpleButton/SimpleButton";
import { generateMultiplePlayers } from '../../api/players';

const Settings = (props) => {

    let generatePlayers = async (e) => {
        console.log("Generowanie graczy")    
        
        const stats = {
            howMuchToGenerate: 10,
        }
    
        await generateMultiplePlayers(stats);
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