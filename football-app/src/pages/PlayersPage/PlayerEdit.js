import { useContext, useState } from "react";
import PlayersContext from "../../context/players";
import Button from "../../components/ReusableComponents/Button";
import Input from "../../components/ReusableComponents/Input";

function PlayerEdit({player}){
    const {handleEditPlayer} = useContext(PlayersContext);
    const [value, setValue] = useState(player.name);

    const onSubmit = () => {
        const playerToSave = {
            name: value,
            nationality: player.nationality,
            club: player.club,
            overall: player.overall,
        }

        handleEditPlayer(player._id, playerToSave);
    }

    return(
        <div >
            <form className="edit-container" onSubmit={onSubmit}>
                <label>Nazwa</label>
                <Input value={value} onChange={(e) =>setValue(e.target.value)}/>
                <Button secondary rounded>Zmień</Button>
            </form>
            
        </div>
    )
}

export default PlayerEdit;