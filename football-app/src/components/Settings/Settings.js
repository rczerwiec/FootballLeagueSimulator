import React from 'react';
import axios from 'axios';

const Settings = (props) => {

    let generatePlayers = async (e) => {
        console.log("Generowanie graczy")    
        
        const stats = {
            howMuchToGenerate: 10,
        }
    
        axios.post('http://localhost:5000/players/generateMultiple',stats).then(response =>{
            console.log("Odpowiedź",response);
        });
    }

    return(
        <div><h2>Ustawienia</h2>
        
        <button onClick={generatePlayers}>Generuj 10 graczy [PL]</button>
        
        </div>
    );
}

export default Settings;