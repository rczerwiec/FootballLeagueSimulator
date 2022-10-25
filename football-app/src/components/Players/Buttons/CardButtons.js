import React from "react";
import styles from "./CardButtons.module.css";

const CardButtons = (props) =>{
  return(
    <div className={styles.Buttons}>
    <div
      className={styles.Button}
      onClick={() => {
        props.edit(props.id);
      }}
    >
      {props.firstButtonText}
    </div>
    <div
      className={styles.Button}
      onClick={() => {
        props.remove(props.id);
      }}
    >
      {props.secondButtonText}
    </div>
  </div>
  )
    

}

export default CardButtons;