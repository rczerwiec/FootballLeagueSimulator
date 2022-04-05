import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../PlayerData/PlayerData.module.css"

const PlayerData = (props) =>{
    const [club, setClub] = useState();


    useEffect(() =>{
        axios.get("http://localhost:5000/clubs/"+props.club,null).then((response) =>{
            setClub(response.data.name);
            //console.log(response);
        })
        
    }) 

    return(
        <div className={styles.CreateNewPlayer}>
            <h3>Informacje o graczu</h3>
            <div>Nazwa:{props.name}</div>
            <div>Pochodzenie:{props.nationality}</div>
            <div>Overall:{props.overall}</div>
            <div>Klub:{club}</div>
        </div>
    );
}

export default PlayerData;