import { useState } from "react";
import Button from "../../components/ReusableComponents/Button";
import Input from "../../components/ReusableComponents/Input";
import { usePatchLeagueTablesMutation, usePatchMatchMutation, useGetOneClubQuery } from "../../store";


//Overal przy usuwaniu - nie aktualizuje sie
//Overal przy dodawaniu - nie odswieza sie

function LeagueMatch({match,league}) {

    const [scoreHome,setScoreHome] = useState(match.scoreHome);
    const [scoreAway,setScoreAway] = useState(match.scoreAway);
    const getAwayClub = useGetOneClubQuery(match.clubAway);
    const getHomeClub = useGetOneClubQuery(match.clubHome);
    const [patchMatch] = usePatchMatchMutation();
    const [patchTable] = usePatchLeagueTablesMutation();
    const [simulate, setSimulate] = useState(false);
    //console.log(match);
    //console.log(league);


    const handleMatchUpdate = (e) => {
        e.preventDefault();
        console.log(e);
        if(simulate){
            console.log("Symulowanie");
            console.log(getAwayClub.data);
            console.log(getHomeClub.data);
            const results = simulateMatch(getHomeClub.data.overall, getAwayClub.data.overall);
            console.log(results);
            if(!match.complete){
                const finishedMatch = {
                    _id: match._id,
                    clubHome: match.clubHome,
                    clubHomeName:match.clubHomeName,
                    clubHomePlayers:match.clubHomePlayers,
                    clubAway: match.clubAway,
                    clubAwayName:match.clubAwayName,
                    clubAwayPlayers:match.clubAwayPlayers,
                    scoreHome:results.A,
                    scoreAway:results.B,
                    complete:true,
                }
                patchMatch(finishedMatch);
                patchTable({league,match:finishedMatch,clubId:match.clubHome});
                patchTable({league,match:finishedMatch,clubId:match.clubAway});
                setScoreAway(results.B);
                setScoreHome(results.A);
            }
        }
        else{
            console.log("Ręcznie")
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
            {match.complete ? (<Button unclickable rounded>Zakończony</Button>): (<Button primary rounded onClick={() => setSimulate(false)}>Zakończ</Button>)}
            {match.complete ? (<></>): (<Button primary rounded onClick={() => setSimulate(true)}>Symuluj</Button>)}
            
        </form>
    </div>
    )
  
}


const simulateMatch = (overallTeamA, overallTeamB) => {
    let teamAChance = (overallTeamA / (overallTeamA + overallTeamB)) * 100;
    let teamBChance = (overallTeamA / (overallTeamA + overallTeamB)) * 100;
    console.log(overallTeamA);
    console.log(overallTeamB);
    let randomNum = Math.random() * 100;
    console.log(teamAChance);
    console.log(teamBChance);
    if (randomNum <= teamAChance) {
        let randA = Math.floor(Math.random() * 4) + 1;
        let randB = Math.floor(Math.random() * (randA));
        console.log("Team A wins");
        return {A: randA, B: randB};
    } else if (randomNum > teamAChance && randomNum <= (teamAChance + teamBChance)) {
        let randB = Math.floor(Math.random() * 4) + 1;
        let randA = Math.floor(Math.random() * (randB));
        console.log("Team B wins");
        return {A: randA, B: randB};
    } else {
        let rand = Math.floor(Math.random() * 5);
        console.log("draw");
        return {A: rand, B: rand};
    }
}

export default LeagueMatch;