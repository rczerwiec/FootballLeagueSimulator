import React from 'react';
import styles from './Player.module.css';
import navStyles from '../../Navbar/Navbar.module.css'

const Player = (props) => {

    
    return (
      <div>
        <div  className={styles.Player} onClick={() => {props.showSelectedPlayer(props.id)}}>
          <div className={styles.PlayerName}>{props.name}, {props.nationality}</div>
        </div>
        <button className={navStyles.button} onClick={()=> {props.edit(props.id)}}>Edytuj</button>
        <button className={navStyles.button} onClick={() => {props.remove(props.id)}}>Usuń</button>
      </div>
    );
}

export default Player;