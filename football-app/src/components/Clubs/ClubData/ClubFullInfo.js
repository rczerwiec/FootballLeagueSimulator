import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./ClubFullInfo.module.css";

const ClubFullInfo = (props) => {
  const [players, setPlayers] = useState({
    list: [],
  });

  const [matches, setMatches] = useState({
    list: [],
  })

  useEffect(() => {
    axios
      .get("http://localhost:5000/clubs/" + props.id + "/players")
      .then((res) => {
        setPlayers({
          list: res.data,
        })
        //console.log(players.list)
      });
    axios.get("http://localhost:5000/clubs/" + props.id + "/matches").then(
      (res) => {
        setMatches({
          list: res.data.matches,
        })
        console.log(res.data.matches);
      }
    ).catch(
      (err) => {
        console.log(err)
      }
    )
  }, [props.id])

  const clubPlayers = players.list.map((player, index) => {
    return <div className={styles.Player} key={player._id}>- {player.name} (OV:{player.overall})</div>;
  });

  const matchesList = matches.list.map((m) => {
    return <div className={styles.Player} key={m._id}>{m.clubHomeName} {m.scoreHome}:{m.scoreAway} {m.clubAwayName}</div>
  })

  return (
    <div className={styles.ClubDetails}>
      <div className={styles.ClubInfo}>
        <h3>{props.name}</h3>
        <div className={styles.clubDetailsDiv}>Typ klubu: {props.type}</div>
        <div className={styles.clubDetailsDiv}>Mistrzostwo Kraju: 0</div>
        <div className={styles.clubDetailsDiv}>Liga Mistrzów: 0</div>
      </div>
      <div className={styles.Players}>
        <h4>Zawodnicy:</h4>
        {players.list !== null ? (clubPlayers) : (<div>Brak</div>)}
      </div>
      <div className={styles.Matches}>
        <h4>Rozegrane Mecze</h4>
        {matchesList}
      </div>
    </div>
  );
};

export default ClubFullInfo;
