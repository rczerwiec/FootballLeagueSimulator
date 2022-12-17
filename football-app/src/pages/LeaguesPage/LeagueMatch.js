import { useState } from "react";
import Button from "../../components/ReusableComponents/Button";
import Input from "../../components/ReusableComponents/Input";
import { usePatchLeagueTablesMutation, usePatchMatchMutation } from "../../store";


function LeagueMatch({match,league}) {

    const [scoreHome,setScoreHome] = useState(match.scoreHome);
    const [scoreAway,setScoreAway] = useState(match.scoreAway);
    const [patchMatch] = usePatchMatchMutation();
    const [patchTable] = usePatchLeagueTablesMutation();
    //console.log(match);
    //console.log(league);


    const handleMatchUpdate = (e) => {
        e.preventDefault();
        if(!match.complete){
            const finishedMatch = {
                _id: match._id,
                clubHome: match.clubHome,
                clubHomeName:match.clubHomeName,
                clubHomePlayers:match.clubHomePlayers,
                clubAway: match.clubAway,
                clubAwayName:match.clubAwayName,
                clubAwayPlayers:match.clubAwayPlayers,
                scoreHome:scoreHome,
                scoreAway:scoreAway,
                complete:true,
            }   
            patchMatch(finishedMatch);
            patchTable({league,match:finishedMatch,clubId:match.clubHome});
            patchTable({league,match:finishedMatch,clubId:match.clubAway});
        }
    }

    return(
        <div>
        <form onSubmit={handleMatchUpdate}>
            <label>{match.clubHomeName}</label>
            <Input className="w-8 text-center m-2" value={scoreHome} onChange={
                (e) => {
                    setScoreHome(e.target.value)
                }}></Input>
            <Input className="w-8 text-center m-2" value={scoreAway} onChange={
                (e) => {
                    setScoreAway(e.target.value)
                }}
                ></Input>
            <label>{match.clubAwayName}</label>
            {match.complete ? (<Button unclickable rounded>Zakończony</Button>): (<Button primary rounded>Zakończ</Button>)}
            
        </form>
    </div>
    )
  
}

export default LeagueMatch;