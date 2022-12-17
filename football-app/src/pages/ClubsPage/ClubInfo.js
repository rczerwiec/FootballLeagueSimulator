import { useState, useEffect } from "react";
import { getClubMatches, getClubPlayers } from "../../api/clubs";
import Button from "../../components/ReusableComponents/Button";

function ClubInfo({ onClick, club }) {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(async () => {
    const p = await getClubPlayers(club._id);
    const m = await getClubMatches(club._id);
    setPlayers(p);
    setMatches(m);
  }, []);

  const clubPlayers = players.map(({ _id, name, overall }) => {
    return (
      <div key={_id}>
        - {name} (OV:{overall} )
      </div>
    );
  });

  const matchesList = matches.map(
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
          {players !== null ? clubPlayers : <div>Brak</div>}
        </div>
        <div>
          <h4>Rozegrane Mecze</h4>
          {matchesList}
        </div>{" "}
      </div>
      <Button primary rounded onClick={onClick} >POWRÓT</Button>
    </div>
  );
}

export default ClubInfo;
