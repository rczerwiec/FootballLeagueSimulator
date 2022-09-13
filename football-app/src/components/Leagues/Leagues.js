import React from 'react';
import LeagueCreator from './LeagueCreator';
import { useState } from 'react';

const Leagues = (props) =>{

    const [actionState, setActionState] = useState({
        action: null,
    });

    const newLeagueHandler = () => {
        actionState.action !== null ? setActionState({
            action:null
        }):
        setActionState({
            action: <LeagueCreator></LeagueCreator>
        })
    }

    return(
        <div>
            {actionState.action !== null ? (actionState.action):(<div/>)}
            <h2>Ligi</h2>
            <button onClick={newLeagueHandler}>Utwórz Ligę</button>
            
        </div>
    )
}

export default Leagues;