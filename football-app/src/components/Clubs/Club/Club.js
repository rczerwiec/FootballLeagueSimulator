import React from 'react';
import styles from './Club.module.css';

const Club = props =>{


    return(
        <div className={styles.Club} onClick={() => {props.showSelectedClub(props._id)}}>Klub: {props.name}</div>
    )
}

export default Club;