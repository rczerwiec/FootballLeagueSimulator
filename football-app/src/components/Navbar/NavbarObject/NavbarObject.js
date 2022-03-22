import React from 'react';
import styles from './NavbarObject.module.css'

const NavbarObject = props => {


    return(
        <div className={styles.option}><a className={styles.text} href={props.routeDestination}>{props.name}</a></div>
    );
}



export default NavbarObject;