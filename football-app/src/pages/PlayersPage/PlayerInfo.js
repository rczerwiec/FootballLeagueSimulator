import { useEffect, useState } from "react";
import { getOneClub } from "../../api/clubs";
import Button from "../../components/ReusableComponents/Button";

function PlayerInfo({ onClick, player }){

    const [club, setClub] = useState();

    useEffect(async() =>{
        const playerClub = await getOneClub(player.club);

        setClub(playerClub.name);
    },[]) 

    return(
        <div>
            <h3>Informacje o graczu</h3>
            <div>Nazwa:{player.name}</div>
            <div>Pochodzenie:{player.nationality}</div>
            <div>Overall:{player.overall}</div>
            <div>Wiek:{player.age}</div>
            <div>Klub:{club}</div>
            <Button primary rounded onClick={onClick} >POWRÓT</Button>
        </div>
    );
}

export default PlayerInfo;