import React from "react";
import styles from "./SimpleButton.module.css";

const SimpleButton = (props) =>{
    return(
        <div className={styles.Button} onClick={props.onClick}>
            {props.text}
        </div>
    )
}

export default SimpleButton;