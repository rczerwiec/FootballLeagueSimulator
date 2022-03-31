import React from 'react';
import styles from './Club.module.css';
import navStyles from '../../Navbar/Navbar.module.css'

const Club = props =>{
    
    return(
        <div className={styles.Club}>
        <div onClick={() => {props.showSelectedClub(props._id)}}>{props.name}</div>
        <button className={navStyles.button} onClick={()=> {props.edit(props._id)}}>Edytuj</button>
        <button className={navStyles.button} onClick={() => {props.remove(props._id)}}>Usuń</button>
      </div>
    )
}

export default Club;