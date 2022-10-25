import React from "react";
import styles from "./PlayerInfo.module.css";

const PlayerInfo = (props) =>{
    return(
        <div
        className={styles.PlayerContent}
        onClick={() => {
          props.showSelectedPlayer(props.id);
        }}
        >
        {props.name}, {props.nationality}, {props.age}l OV:{props.overall}
      </div> 
    )
};

export default PlayerInfo;