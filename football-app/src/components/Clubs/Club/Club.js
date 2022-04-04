import React from "react";
import styles from "./Club.module.css";

const Club = (props) => {
  return (
    <div className={styles.ClubFlex}>
      <div
        className={styles.ClubContent}
        onClick={() => {
          props.showSelectedClub(props._id);
        }}
      >
        {props.name}
      </div>
      
      <div className={styles.Buttons}>
        <div
          className={styles.Button}
          onClick={() => {
            props.edit(props._id);
          }}
        >
          Edytuj
        </div>
        <div
          className={styles.Button}
          onClick={() => {
            props.remove(props._id);
          }}
        >
          Usuń
        </div>
      </div>
    </div>
  );
};

export default Club;
