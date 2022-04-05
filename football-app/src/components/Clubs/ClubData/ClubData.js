import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./ClubData.module.css";

const ClubData = (props) => {
  const [players, setPlayers] = useState({
    list: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/clubs/" + props.id + "/players")
      .then((response) => {
        setPlayers({
          list: response.data,
        })
        console.log(players.list)
      })
  }, [props.id])

  const clubPlayers = players.list.map((player, index) => {
    return <div className={styles.Player} key={player._id}>- {player.name} (OV:{player.overall})</div>;
  });

  return (
    <div className={styles.ClubDetails}>
      <div className={styles.ClubInfo}>
        <h3>{props.name}</h3>
        <div className={styles.clubDetailsDiv}>Typ klubu:{props.type}</div>
        <div className={styles.clubDetailsDiv}>Mistrzostwa Regionu: 0</div>
        <div className={styles.clubDetailsDiv}>Mistrzostwa Świata: 0</div>
      </div>
      <div className={styles.Players}>
        <h4>Zawodnicy:</h4>
        {players.list !== null ? (clubPlayers) : (<div>Brak</div>)}
      </div>
    </div>
  );
};

export default ClubData;
