import React from 'react';
import { useState } from 'react';
import LeagueCreator from './LeagueCreator';
import LeagueList from './LeagueList';
import SimpleButton from '../Buttons/SimpleButton/SimpleButton';


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
            <SimpleButton onClick={newLeagueHandler} text="Nowa Liga"></SimpleButton>
            <LeagueList />
        </div>
    )
}

export default Leagues;