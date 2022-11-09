import React from "react";
import styles from "./SubmitButton.module.css"

const SubmitButton = (props) =>{
    return(
        <button className={styles.Button}>{props.children}</button>
    )
}

export default SubmitButton