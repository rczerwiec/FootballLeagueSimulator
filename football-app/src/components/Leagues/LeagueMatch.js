import api from "../../api/api";
import React, { useState } from "react";
import { updateTable } from "../../api/leagues";

const LeagueMatch = (props) => {
    const [matchInfo, setMatchInfo] = useState({
        clubAway: props.matchData.clubAway,
        clubAwayName: props.matchData.clubAwayName,
        clubAwayPlayers:props.matchData.clubAwayPlayers,
        scoreAway: props.matchData.scoreAway,
        clubHome: props.matchData.clubHome,
        clubHomeName: props.matchData.clubHomeName,
        clubHomePlayers:props.matchData.clubHomePlayers,
        scoreHome: props.matchData.scoreHome,
        matchType: props.matchData.matchType,
        complete: props.matchData.complete,
    })

    const [newScoreHome, setScoreHome] = useState(0);
    const [newScoreAway, setScoreAway] = useState(0);

    const updateMatch = async() => {
        if(newScoreHome>newScoreAway){
            const match = {
                scoreWinner: newScoreHome,
                scoreLoser: newScoreAway,
                complete: true,
                winner:matchInfo.clubHome,
                loser:matchInfo.clubAway,
            }
            api.patch("/matches/"+props.matchData._id, match).catch(
                (err) => {
                    console.log(err);
                }
            )
            await updateTable(props.data._id,props.matchData.clubHome, match)
            await updateTable(props.data._id,props.matchData.clubAway, match)
        }
        else if(newScoreHome === newScoreAway){
            const match = {
                scoreWinner: newScoreHome,
                scoreLoser: newScoreAway,
                complete: true,
                winner:null,
                team1:matchInfo.clubHome,
                team2:matchInfo.clubAway,
            }
            api.patch("/matches/"+props.matchData._id, match).catch(
                (err) => {
                    console.log(err);
                }
            )
            await updateTable(props.data._id,props.matchData.clubHome, match)
            await updateTable(props.data._id,props.matchData.clubAway, match)
        }
        else{
            const match = {
                scoreWinner: newScoreAway,
                scoreLoser: newScoreHome,
                complete: true,
                winner:matchInfo.clubAway,
                loser:matchInfo.clubHome,
            }
            api.patch("/matches/"+props.matchData._id, match).catch(
                (err) => {
                    console.log(err);
                }
            )
            await updateTable(props.data._id,props.matchData.clubHome, match)
            await updateTable(props.data._id,props.matchData.clubAway, match)
        }
        

     
        
    }

    return(
        <div>
            <form onSubmit={updateMatch}>
                <label>{matchInfo.clubHomeName}</label>
                <input value={newScoreHome ? newScoreHome : matchInfo.scoreHome} onChange={
                    (e) => {
                        setScoreHome(e.target.value)
                    }
                }></input>
                <input value={newScoreAway ? newScoreAway : matchInfo.scoreAway} onChange={
                    (e) => {
                        setScoreAway(e.target.value)
                    }}
                    ></input>
                <label>{matchInfo.clubAwayName}</label>
                {matchInfo.complete ? (<div></div>): (<button>Zakończ</button>)}
                
            </form>
        </div>
    )
}

export default LeagueMatch;