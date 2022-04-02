import React, {useState, useEffect} from "react";
import axios from "axios";
import Select from 'react-select';

const NewPlayerCreator = (props) =>{

    const [name, setName] = useState("");
    const [nationality, setNationality] = useState("");
    const [club, setClub] = useState("");
    const [clubs, setClubs] = useState({
        clubs:[],
    })
        
    useEffect(() => {
        if(clubs.clubs.length === 0){
            axios.get("http://localhost:5000/clubs", null).then((response) => {
                //const firstTenEmployees = response.data.slice(0,10);
        
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

    let handleSubmit = async (e) =>{
        const playerToSave = {
            name: name,
            nationality: nationality,
            club: club,
        }
    
        axios.post('http://localhost:5000/players',playerToSave).then(response =>{
            console.log(response);
        });

        axios.patch('http://localhost:5000/clubs'+playerToSave.club, )
    }

    return(
        <div>
            <h3>Nowy Gracz</h3>
            <form onSubmit={handleSubmit}>
                <input value={name} placeholder="Nazwa Gracza" onChange={(e) => setName(e.target.value)}></input>
                <input value={nationality} placeholder="Narodowość Gracza" onChange={(e) => setNationality(e.target.value)}></input>
                <Select
                    options={clubs.clubs}
                    onChange={(e) => setClub(e.value)}
                />
                <button type="submit">Stwórz</button>

            </form>
        </div>
    );
}

export default NewPlayerCreator