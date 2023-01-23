import Spinner from "../../components/Spinner/Spinner";
import Button from "../../components/ReusableComponents/Button";
import {
  useFetchClubMatchesQuery,
  useFetchClubPlayersQuery,
  useGetClubLeagueStatsQuery,
} from "../../store";
import { useState } from "react";
import { Table } from "./components/Table";

function ClubInfo({ onClick, club }) {
  const players = useFetchClubPlayersQuery(club._id);
  const matches = useFetchClubMatchesQuery(club._id);
  const [matchesAmount, setMatchesAmount] = useState(0);
  const leagueStats = useGetClubLeagueStatsQuery(club._id);
  const [leagueStatsAmount, setLeagueStatsAmount] = useState(0);

  const matchesHeaders = [
   { name: "U Siebie"},
   { name: "T1"},
   { name: ":"},
   { name: "T2"},
   { name: "Wyjazd"},
   { name: "Liga"}
  ]

  const playersHeaders = [
    {name: "Imię Nazwisko"},
    {name: "Narodowość"},
    {name: "Overall"},
  ]

  const leagueStatsHeadesr = [
    { name: "Liga"},
    { name: "Zagrane Mecze"},
    { name: "Wygrane"},
    { name: "Remisy"},
    { name: "Porażki"},
    { name: "Strzelone Gole"},
    { name: "Stracone Gole"},
    { name: "Różnica Goli"},
    { name: "Punkty"},
  ]


  let playersContent;
  let matchesContent;
  let leagueStatsContent;
  let clubStatsContent = <tr className=""><td>{club.wins}</td>
  <td>{club.draws}</td>
  <td>{club.lost}</td></tr>

  if (players.isFetching || matches.isFetching || leagueStats.isFetching) {
    playersContent = <Spinner />;
  } else if (players.error || matches.error) {
    playersContent = <div>Error while loading players and matches</div>;
  } else {
    playersContent = players.data.players.map(
      ({ _id, name, nationality, overall }) => {
        return (
          <tr key={_id} className="bg-gray-400 border-b-2 border-black">
            <td>{name}</td>
            <td>{nationality}</td>
            <td>{overall}</td>
          </tr>
        );
      }
    );
    leagueStatsContent = leagueStats.data.map((stat,index) => {
      const length = leagueStats.data.length;
        if (index < (length+leagueStatsAmount) && index>=(length-10+leagueStatsAmount) ){
      return (
        <tr key={stat._id} className="bg-gray-400 border-b-2 border-black">
          <td>{stat.league.name}</td>
          <td>{stat.playedGames}</td>
          <td>{stat.wonGames}</td>
          <td>{stat.drawGames}</td>
          <td>{stat.lostGames}</td>
          <td>{stat.goalsShot}</td>
          <td>{stat.goalsLost}</td>
          <td>{stat.goalsDif}</td>
          <td>{stat.points}</td>
        </tr>
      );  
    }});

    matchesContent = matches.data.matches.map(
      ({
        _id,
        clubAwayName,
        clubHomeName,
        scoreHome,
        scoreAway,
        matchType,
        winner,
      }, index) => {
        const length = matches.data.matches.length;
        if (index < (length+matchesAmount) && index>=(length-25+matchesAmount) ){

        let classes =
          winner === club._id
            ? "border-b-2 border-black bg-green-500"
            : "border-b-2 border-black bg-red-500";

        classes = winner ? classes : "border-b-2 border-black bg-yellow-500";
        classes =
          matchType === "Towarzyski"
            ? "border-b-2 border-black bg-blue-400"
            : classes;

        return (
          <tr key={_id} className={classes}>
            <td>{clubHomeName}</td>
            <td>{scoreHome}</td>
            <td>:</td>
            <td>{scoreAway}</td>
            <td>{clubAwayName}</td>
            <td>{matchType}</td>
          </tr>
        );
      }
    }
    );

    matchesContent = matchesContent.reverse();
  }

  return (
    <div>
      <div>
        <h1 className="font-bold p-2 m-2">{club.name}-{club.overall}</h1>
        <div className="flex flex-col justify-center text-center">
          <h4 className="font-bold text-xl">Zawodnicy</h4>
          <Table headers={playersHeaders} content={playersContent}/>
        </div>
        <div>
          <h4 className="font-bold text-xl">Wyniki w Ligach</h4>
          <button className="border-2" onClick={() => setLeagueStatsAmount(leagueStatsAmount+10)}>WSTECZ</button>
          <button className="border-2" onClick={() => setLeagueStatsAmount(leagueStatsAmount-10)}>DALEJ</button>
          <Table headers={leagueStatsHeadesr} content={leagueStatsContent}/>
        </div>
        <div className="flex flex-col justify-center text-center">
          <h4 className="font-bold text-xl">Rozegrane Mecze</h4>
          <div className="flex justify-center bg-gray-400 mx-auto border-2 border-black">
          <Table headers={[{name:"Wygrane"}, {name: "Remisy"}, {name: "Przegrane"}]} content={clubStatsContent}/>
          </div>
          <div>
            <button className="border-2" onClick={() => setMatchesAmount(matchesAmount+25)}>WSTECZ</button>
            <button className="border-2" onClick={() => setMatchesAmount(matchesAmount-25)}>DALEJ</button>
            <Table headers={matchesHeaders} content={matchesContent}/>
          </div>
        </div>

      </div>
      <Button primary rounded onClick={onClick}>
        POWRÓT
      </Button>
    </div>
  );
}

export default ClubInfo;
