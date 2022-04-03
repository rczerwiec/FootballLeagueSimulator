import React, {useState,useEffect} from "react";
import axios from "axios";
import Select from 'react-select';

const PlayerEditor = (props) =>{

    const [name, setName] = useState(props.name);
    const [nationality, setNationality] = useState(props.nationality);
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
        }
    
        axios.patch('http://localhost:5000/players/'+props.id,playerToSave).then(response =>{
            console.log(response);
        });
    }

    return(
        <div>
            <h3>Informacje o graczu</h3>
            <form onSubmit={saveNewData}>
                Nazwa:<input value={name} onChange={(e) => setName(e.target.value)}></input>
                Pochodzenie:<input value={nationality} onChange={(e) => setNationality(e.target.value)}></input>
                Klub:                <Select
                    options={clubs.clubs}
                    onChange={(e) => setClub(e.value)}
                />
                <button type="submit">Edytuj</button>
            </form>

        </div>
    );
}
//Klub:<input>{props.club}</input>

export default PlayerEditor;