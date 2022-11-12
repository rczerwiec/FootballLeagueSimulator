import api from "../../../api/api";
import React, { useEffect, useState } from "react";
import styles from "./ClubFullInfo.module.css";
import Spinner from "../../Spinner/Spinner";

const ClubFullInfo =  (props) => {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(async() => {
    const p = await api.get("/clubs/" + props.id + "/players").catch(err => console.log(err));
    const m = await api.get("/clubs/" + props.id + "/matches").catch(err => console.log(err));
    setPlayers(p.data);
    setMatches(m.data.matches);
      
  }, [props.id])

  const clubPlayers = players.map(({_id, name, overall}) => {
    return <div className={styles.Player} key={_id}>- {name} (OV:{overall} )</div>;
  });

  const matchesList = matches.map(({_id,clubAwayName,clubHomeName,scoreHome,scoreAway,matchType}) => {
    return <div className={styles.Player} key={_id}>{clubHomeName} {scoreHome}:{scoreAway} {clubAwayName} ({matchType})</div>
  })

  return (
    <div className={styles.ClubDetails}>
      <div><div className={styles.ClubInfo}>
        <h3>{props.name}</h3>
        <div className={styles.clubDetailsDiv}>Typ klubu: {props.type}</div>
        <div className={styles.clubDetailsDiv}>Mistrzostwo Kraju: 0</div>
        <div className={styles.clubDetailsDiv}>Liga Mistrzów: 0</div>
      </div>
      <div className={styles.Players}>
        <h4>Zawodnicy:</h4>
        {players !== null ? (clubPlayers) : (<div>Brak</div>)}
      </div>
      <div className={styles.Matches}>
        <h4>Rozegrane Mecze</h4>
        {matchesList}
      </div> </div>
      
    </div>
  );
};

export default ClubFullInfo;
