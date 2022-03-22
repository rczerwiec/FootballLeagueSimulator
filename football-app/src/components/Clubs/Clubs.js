import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Club from './Club/Club';
import styles from './Clubs.module.css'

const Clubs = props => {

    const [clubState, setClubState] = useState({
        clubs: [],
      })
    
      useEffect(() => {
        axios.get('http://localhost:5000/clubs',null).then(response => {
          //const firstTenEmployees = response.data.slice(0,10);
    
          const employees = response;
          setClubState({
            clubs: employees.data,
          })
        });
        //console.log(clubState.clubs);
      })

    const clubs = clubState.clubs.map((club, index) => {
        return (<div key={club._id} className={styles.club_object}><Club name={club.name}></Club></div>)
    })

    return(
        <div>
        {clubs}
        </div>
    );
}

export default Clubs;