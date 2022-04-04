import React from "react";
import styles from "./Player.module.css";
import navStyles from "../../Navbar/Navbar.module.css";

const Player = (props) => {
  return (
    <div className={styles.PlayerFlex}>
      <div
        className={styles.PlayerContent}
        onClick={() => {
          props.showSelectedPlayer(props.id);
        }}
      >
        {props.name}, {props.nationality}
      </div>
      <div className={styles.Buttons}>
        <div
          className={styles.Button}
          onClick={() => {
            props.edit(props.id);
          }}
        >
          Edytuj
        </div>
        <div
          className={styles.Button}
          onClick={() => {
            props.remove(props.id);
          }}
        >
          Usuń
        </div>
      </div>
    </div>
  );
};

export default Player;
