import React from "react";
import Link from "next/link";
import styles from "../Navbar.module.css";

const NavbarOption = (props) => {

    return(
        <div className={styles.NavbarOption}>
            <Link className={styles.NavbarText} href={props.destination}><div>{props.icon}</div><div> {props.name}</div></Link>
        </div>
    )
}

export default NavbarOption;