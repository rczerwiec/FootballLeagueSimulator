import React from 'react';
import SimpleButton from "../Buttons/SimpleButton/SimpleButton";

const Settings = (props) => {

    let generatePlayers = async (e) => {
        //Generowanie graczy
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