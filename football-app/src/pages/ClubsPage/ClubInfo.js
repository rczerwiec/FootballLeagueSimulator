import Spinner from "../../components/Spinner/Spinner";
import Button from "../../components/ReusableComponents/Button";
import { useFetchClubMatchesQuery, useFetchClubPlayersQuery } from "../../store";

function ClubInfo({ onClick, club }) {
  console.log(club);
  const players = useFetchClubPlayersQuery(club._id);
  const matches = useFetchClubMatchesQuery(club._id);
  console.log(players);
  console.log(matches);


  let playersContent;
  let matchesContent;

  if(players.isFetching || matches.isFetching){
    playersContent = <Spinner/>
  }
  else if(players.error || matches.error){
    playersContent = <div>Error while loading players and matches</div>
  }
  else{
    console.log(players);
    playersContent= players.data.players.map(({ _id, name, overall }) => {
      return (
        <div key={_id}>
          - {name} (OV:{overall} )
        </div>
      );
    });

    matchesContent = matches.data.matches.map(
      ({ _id, clubAwayName, clubHomeName, scoreHome, scoreAway, matchType }) => {
        return (
          <div key={_id}>
              <div className="match-results">
                <div>
                  {clubHomeName} {scoreHome}
                </div>
                {" - "}
                <div>
                  {scoreAway} {clubAwayName}
                </div>
                ({matchType})
              </div>
           
          </div>
        );
      }
    );
  }


  return (
    <div>
      <h2 style={{ color: "red" }}> IN PROGRESS</h2>
      <div>
        <div>
          <h3>{club.name}</h3>
          <div>Typ klubu: {club.type}</div>
          <div>Mistrzostwo Kraju: 0</div>
          <div>Liga Mistrzów: 0</div>
        </div>
        <div>
          <h4>Zawodnicy:</h4>
          {players !== null ? playersContent : <div>Brak</div>}
        </div>
        <div>
          <h4>Rozegrane Mecze</h4>
          {matchesContent}
        </div>{" "}
      </div>
      <Button primary rounded onClick={onClick} >POWRÓT</Button>
    </div>
  );
}

export default ClubInfo;
