import React from "react";
import styles from "../Navbar.module.css";

const NavbarOption = (props) => {

    return(
        <div className={styles.NavbarOption}>
            <a className={styles.NavbarText} href={props.destination}>
            <div>{props.icon}</div><div> {props.name}</div>
          </a>
        </div>
    )
}

export default NavbarOption;