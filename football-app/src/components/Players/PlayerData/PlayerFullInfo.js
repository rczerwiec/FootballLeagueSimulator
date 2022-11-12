import axios from "axios";
import api from "../../../api/api";
import React, { useEffect, useState } from "react";
import styles from "../PlayerData/PlayerFullInfo.module.css"

const PlayerFullInfo = (props) =>{
    const [club, setClub] = useState();


    useEffect(() =>{
        api.get("/clubs/"+props.playerClub,null).then((response) =>{
            setClub(response.data.name);
            //console.log(response);
        })
        
    }) 

    return(
        <div className={styles.CreateNewPlayer}>
            <h3>Informacje o graczu</h3>
            <div>Nazwa:{props.playerName}</div>
            <div>Pochodzenie:{props.playerNationality}</div>
            <div>Overall:{props.playerOverall}</div>
            <div>Wiek:{props.playerAge}</div>
            <div>Klub:{club}</div>
        </div>
    );
}

export default PlayerFullInfo;