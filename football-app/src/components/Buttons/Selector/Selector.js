import React from "react";
import Select from "react-select";
import styles from "./Selector.module.css";

const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#14A76C",
      width:"200px",
      color: 'black',
      // Overwrittes the different states of border
      borderColor: "black",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        background: "#0b603e"
      }
    }),
    placeholder: (base,state) => ({
        ...base,
        color:'black',
    }),
    option: (base, state) => ({
        ...base,
        background: state.isSelected ? "#0b603e" : "#14A76C",
        color: 'black',
        "&:hover": {
            background: "#0b603e",
        }
    }),
    menu: (base, state) => ({
        ...base,
        width:"200px",
        background: "black",
    }),
    container: (base,state)=> ({
        ...base,
        width:"200px",
    })
  };

const Selector = (props) => {
    return(
        <div className={styles.Selector}>
            {props.text ? <label className={styles.Label}>{props.text}</label> : <></>}
            <Select styles={customStyles} placeholder={props.placeholder} options={props.options} onChange={props.onChange}></Select>
        </div>
    )
}

export default Selector;