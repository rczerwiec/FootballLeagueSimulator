import React from 'react';
import styles from './Club.module.css';

const Club = props =>{


    return(
        <div className={styles.name}>Klub: {props.name}</div>
    )
}

export default Club;