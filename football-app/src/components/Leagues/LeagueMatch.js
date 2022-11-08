import axios from "axios";
import React, { useState } from "react";

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

    const updateMatch = () => {
        if(newScoreHome>newScoreAway){
            const match = {
                scoreAway: newScoreAway,
                scoreHome: newScoreHome,
                complete: true,
                winner:matchInfo.clubHome,
            }
            axios.patch("http://localhost:5000/matches/"+props.matchData._id, match).catch(
                (err) => {
                    console.log(err);
                }
            )
            axios.patch("http://localhost:5000/tables/"+props.data._id+"/"+props.matchData.clubHome, match).catch(
                (err) => {
                    console.log(err);
                }
            )
            axios.patch("http://localhost:5000/tables/"+props.data._id+"/"+props.matchData.clubAway, match).catch(
                (err) => {
                    console.log(err);
                }
            )
        }
        else if(newScoreHome === newScoreAway){
            const match = {
                scoreAway: newScoreAway,
                scoreHome: newScoreHome,
                complete: true,
                winner:null,
            }
            axios.patch("http://localhost:5000/matches/"+props.matchData._id, match).catch(
                (err) => {
                    console.log(err);
                }
            )
            axios.patch("http://localhost:5000/tables/"+props.data._id+"/"+props.matchData.clubHome, match).catch(
                (err) => {
                    console.log(err);
                }
            )
            axios.patch("http://localhost:5000/tables/"+props.data._id+"/"+props.matchData.clubAway, match).catch(
                (err) => {
                    console.log(err);
                }
            )
        }
        else{
            const match = {
                scoreAway: newScoreAway,
                scoreHome: newScoreHome,
                complete: true,
                winner:matchInfo.clubAway,
            }
            axios.patch("http://localhost:5000/matches/"+props.matchData._id, match).catch(
                (err) => {
                    console.log(err);
                }
            )
            axios.patch("http://localhost:5000/tables/"+props.data._id+"/"+props.matchData.clubHome, match).catch(
                (err) => {
                    console.log(err);
                }
            )
            axios.patch("http://localhost:5000/tables/"+props.data._id+"/"+props.matchData.clubAway, match).catch(
                (err) => {
                    console.log(err);
                }
            )
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