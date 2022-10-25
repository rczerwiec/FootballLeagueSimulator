import React from "react";
import styles from "./ClubInfo.module.css";

const ClubInfo = (props) => {
    return (
        <div
            className={styles.ClubContent}
            onClick={() => {
                props.showSelectedClub(props._id);
            }}
        >
            {props.name}
        </div>
    )

}

export default ClubInfo