import React from "react";
import { Link } from "react-router-dom";
import styles from "../Navbar.module.css";

const NavbarOption = (props) => {

    return(
        <div className={styles.NavbarOption}>
            <Link className={styles.NavbarText} to={props.destination}><div>{props.icon}</div><div> {props.name}</div></Link>
        </div>
    )
}

export default NavbarOption;