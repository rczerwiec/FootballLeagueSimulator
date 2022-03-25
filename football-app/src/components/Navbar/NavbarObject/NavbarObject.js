import React from 'react';
import styles from './NavbarObject.module.css'

const NavbarObject = props => {


    return(
        <a className={styles.text} href={props.routeDestination}><div className={styles.option} >{props.name}</div></a>
    );
}



export default NavbarObject;