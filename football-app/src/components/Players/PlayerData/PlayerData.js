import React from "react";

const PlayerData = (props) =>{


    return(
        <div>
            <h3>Informacje o graczu</h3>
            <div>Nazwa:{props.name}</div>
            <div>Pochodzenie:{props.nationality}</div>
            <div>Klub:{props.club}</div>
        </div>
    );
}

export default PlayerData;