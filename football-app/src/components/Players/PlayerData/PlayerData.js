import axios from "axios";
import React, { useEffect, useState } from "react";

const PlayerData = (props) =>{
    const [club, setClub] = useState();


    useEffect(() =>{
        axios.get("http://localhost:5000/clubs/"+props.club,null).then((response) =>{
            setClub(response.data.name);
            //console.log(response);
        })
        
    }) 

    return(
        <div>
            <h3>Informacje o graczu</h3>
            <div>Nazwa:{props.name}</div>
            <div>Pochodzenie:{props.nationality}</div>
            <div>Klub:{club}</div>
        </div>
    );
}

export default PlayerData;