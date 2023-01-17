import Spinner from "../../components/Spinner/Spinner";
import Button from "../../components/ReusableComponents/Button";
import {
  useFetchClubMatchesQuery,
  useFetchClubPlayersQuery,
} from "../../store";

function ClubInfo({ onClick, club }) {
  const players = useFetchClubPlayersQuery(club._id);
  const matches = useFetchClubMatchesQuery(club._id);

  let playersContent;
  let matchesContent;

  if (players.isFetching || matches.isFetching) {
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

    matchesContent = matches.data.matches.map(
      ({
        _id,
        clubAwayName,
        clubHomeName,
        scoreHome,
        scoreAway,
        matchType,
        winner,
      }) => {
        let classes =
          winner === club._id
            ? "border-b-2 border-black bg-green-500"
            : "border-b-2 border-black bg-red-500";

        classes = winner ? classes : "border-b-2 border-black bg-yellow-500";
        classes = matchType === "Towarzyski" ? "border-b-2 border-black bg-blue-400" : classes

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
    );

    matchesContent = matchesContent.reverse();
  }

  return (
    <div>
      <div>
        <h1 className="font-bold p-2 m-2">{club.name}</h1>
        <div className="flex flex-col justify-center text-center">
          <table>
            <thead>
              <tr className="bg-gray-500 border-b-4 border-black">
                <th>Liga</th>
                <th className="bg-yellow-500">Mistrz</th>
                <th className="bg-gray-200">Wice-Mistrz</th>
                <th className="bg-yellow-800">3/4 Miejsce</th>
                <th className="bg-red-700">Spadek</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-400 border-b-2 border-black">
                <td>Liga Mistrzów</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col justify-center text-center">
          <h4 className="font-bold text-xl">Zawodnicy</h4>
          <table>
            <thead>
              <tr className="bg-gray-500 border-b-4 border-black">
                <th>Imię Nazwisko</th>
                <th>Narodowość</th>
                <th>Overall</th>
              </tr>
            </thead>
            <tbody>{playersContent}</tbody>
          </table>
        </div>

        <div className="flex flex-col justify-center text-center">
          <h4 className="font-bold text-xl">Rozegrane Mecze</h4>
          <div className="flex justify-center bg-gray-400 m-2 p-2 mx-auto border-2 border-black">
            <table>
              <thead>
                <tr>
                  <th className="p-1">Wygrane</th>
                  <th className="p-1"> Remisy</th>
                  <th className="p-1">Przegrane</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{club.wins}</td>
                  <td>{club.draws}</td>
                  <td>{club.lost}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <table>
            <thead>
              <tr className="bg-gray-500 border-b-4 border-black">
                <th>U siebie</th>
                <th>T1</th>
                <th>:</th>
                <th>T2</th>
                <th>Wyjazd</th>
                <th>Liga</th>
              </tr>
            </thead>
            <tbody>{matchesContent}</tbody>
          </table>
        </div>
      </div>
      <Button primary rounded onClick={onClick}>
        POWRÓT
      </Button>
    </div>
  );
}

export default ClubInfo;
