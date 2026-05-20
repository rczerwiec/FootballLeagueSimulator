import {useState } from "react";
import Button from "../../components/ReusableComponents/Button";
import Input from "../../components/ReusableComponents/Input";
import Spinner from "../../components/Spinner/Spinner";
import {useEditPlayerMutation} from "../../store";

function PlayerEdit({player, handleSetEdit}){
    const [editPlayer, results] = useEditPlayerMutation(player);
    //console.log(results)
   
    const [value, setValue] = useState(player.name);
    const [buttonTitle, setButtonTitle] = useState("Zmień")

    const onSubmit = (e) => {
        e.preventDefault();
        const playerToSave = {
            name: value,
            nationality: player.nationality,
            club: player.club,
            overall: player.overall,
        }
        setButtonTitle(<Spinner className="w-1 h-1"/>);
        editPlayer({id:player._id, player:playerToSave}).then(() => {
            handleSetEdit();
        }
        );
        
    }

    return(
        <div >
            <form className="edit-container" onSubmit={onSubmit}>
                <label>Nazwa</label>
                <Input value={value} onChange={(e) =>setValue(e.target.value)}/>
                <Button secondary rounded>{buttonTitle}</Button>
            </form>
            
        </div>
    )
}

export default PlayerEdit;