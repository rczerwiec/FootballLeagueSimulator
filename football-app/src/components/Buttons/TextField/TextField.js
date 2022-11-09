import React from "react";
import styles from "./TextField.module.css";

const TextField = (props) => {
    return(
        <div>
        <label className={styles.TextFieldLabel}>{props.text}</label>
        <input placeholder={props.placeholder} className={styles.TextField} value={props.value} onChange={props.onChange}></input>
        </div>

    )
}

TextField.defaultProps = {
    placeholder: "Wpisz coś..."
}

export default TextField;