import React from "react";
import styles from "./InformationCard.module.css";

const InformationCard = (props) =>{
    return(
        <div className={styles.CardFlex}>
                  {props.children}
        </div>
    )
}

export default InformationCard;