import React from "react";
import styles from "./ClubData.module.css";

const ClubData = props => {

    return(
        <div className={styles.clubDetails}>
            <h3>Wybrany Klub</h3>
            <div className={styles.clubDetailsDiv}>Nazwa klubu:{props.name}</div>
            <div className={styles.clubDetailsDiv}>Typ klubu:{props.type}</div>
        </div>
    )

}

export default ClubData;