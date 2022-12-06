import { useContext, useEffect, useState } from "react";
import PlayersContext from "../../context/players";
import Button from "../../components/ReusableComponents/Button";
import Input from "../../components/ReusableComponents/Input";
import Selector from "../../components/Buttons/Selector/Selector";

function CreatePlayer({changeAction}){
    const {handlePlayerCreate ,getClubsForSelector, clubsForSelector} = useContext(PlayersContext);
    const [name, setName] = useState("");
    const [nationality, setNationality] = useState("");
    const [club, setClub] = useState(undefined);
    const [overall, setOverall] = useState("");

    useEffect(async() => {
        await getClubsForSelector();
    },[])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const playerToSave = {
            name: name,
            nationality: nationality,
            club: club,
            overall: overall,
        }
        handlePlayerCreate(playerToSave);
        changeAction();
    }


    return         <div className="create-container">
    <form className="create-form" onSubmit={handleSubmit}>
        <h1>Utwórz Drużynę</h1>
        <label>Nazwa</label>
        <div><Input placeholder="Wprowadź nazwę gracza" value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
        <label>Narodowość</label>
        <div><Input placeholder="Wprowadź narodowość gracza" value={nationality} onChange={(e)=>{setNationality(e.target.value)}}/></div>
        <label>Overall</label>
        <div><Input placeholder="Wprowadź overall gracza" value={overall} onChange={(e)=>{setOverall(e.target.value)}}/></div>
        <label>Przypisz klub</label>
        <Selector placeholder="Wybierz Klub" options={clubsForSelector} onChange={(e) => setClub(e.value)}/>
        <Button secondary rounded>Utwórz</Button>
    </form>
</div>
}

export default CreatePlayer;