import { useContext, useEffect, useState } from "react";
import PlayersContext from "../../context/players";
import Button from "../../components/ReusableComponents/Button";
import Input from "../../components/ReusableComponents/Input";
import Selector from "../../components/Buttons/Selector/Selector";
import {useCreatePlayerMutation} from '../../store/index';
import {useFetchClubsQuery} from '../../store';

function CreatePlayer({changeAction}){
    const [createPlayer, results] = useCreatePlayerMutation();
    const {data, error, isLoading} = useFetchClubsQuery();
    const [name, setName] = useState("");
    const [nationality, setNationality] = useState("");
    const [club, setClub] = useState(undefined);
    const [overall, setOverall] = useState("");

    let options;
    if(!isLoading){
        options = data.map(d =>({
            "value": d._id,
            "label": d.name
        }))
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!isLoading){
            const playerToSave = {
                name: name,
                nationality: nationality,
                club: club,
                overall: overall,
            }
            createPlayer(playerToSave);
            changeAction();
        }


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
        <Selector placeholder="Wybierz Klub" options={options} onChange={(e) => setClub(e.value)}/>
        <Button secondary rounded>Utwórz</Button>
    </form>
</div>
}

export default CreatePlayer;