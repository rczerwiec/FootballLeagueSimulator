import React from "react";
import InformationCard from "../../InformationCard/InformationCard";
import styles from "./Club.module.css";

const Club = (props) => {
  return (
    <InformationCard>
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
    </InformationCard>

  );
};

export default Club;
