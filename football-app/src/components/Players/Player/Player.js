import React from 'react';
import styles from './Player.module.css';
import navStyles from '../../Navbar/Navbar.module.css'

const Player = (props) => {


    return (
      <div className={styles.Player}>
        <div className={styles.PlayerName}>{props.name}, {props.nationality}</div>
        <button className={navStyles.button}>Edytuj</button>
        <button className={navStyles.button}>Usuń</button>
      </div>
    );
}

export default Player;