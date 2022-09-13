import React from 'react';
import axios from 'axios';

const Settings = (props) => {
    const names = ["Marcin","Paweł","Tomasz","Robert","Radek","Piotr","Maciej","Adrian","Artur","Błażej","Kamil","Jan","Igor","Eryk"]
    const surnames = ["Tomaszewski", "Lewandowski", "Nowakowski", "Kowalski", "Polak", "Kot", "Koń","Igorczuk","Balik","Bartkiewicz","Michniewicz","Bednarek","Zieliński","Czerwiec"]

    let generatePlayers = async (e) => {
        console.log("Generowanie graczy")
        for(var i=0; i<10; i++){
            var randomName = Math.floor(Math.random()*names.length);
            var randomSurname = Math.floor(Math.random()*surnames.length);
            var name = names[randomName] + " " + surnames[randomSurname];
    
            var randomNumber = Math.floor(Math.random() * (100 - 1 + 1) + 1)
            const playerToSave = {
                name: name,
                nationality: "Poland",
                overall: randomNumber,
            }
            console.log(playerToSave);
        
            axios.post('http://localhost:5000/players',playerToSave).then(response =>{
                console.log("Odpowiedź",response);
            });
        }
    }

    return(
        <div><h2>Ustawienia</h2>
        
        <button onClick={generatePlayers}>Generuj 10 graczy [PL]</button>
        
        </div>
    );
}

export default Settings;