import Button from "../../components/ReusableComponents/Button";
import { useGetOneClubQuery } from "../../store/apis/clubsApi";

function PlayerInfo({ onClick, player }){

    const {data, error, isLoading} = useGetOneClubQuery(player.club)
    console.log(data);

    return(
        <div>
            <h3>Informacje o graczu</h3>
            <div>Nazwa:{player.name}</div>
            <div>Pochodzenie:{player.nationality}</div>
            <div>Overall:{player.overall}</div>
            <div>Wiek:{player.age}</div>
            <div>Klub:{data?.name || "Brak"}</div>
            <Button primary rounded onClick={onClick} >POWRÓT</Button>
        </div>
    );
}

export default PlayerInfo;