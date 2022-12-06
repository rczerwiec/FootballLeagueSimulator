import { createContext, useState, useCallback } from "react"
import {createPlayer, removePlayer, getAllPlayers, patchPlayer} from "../api/players";
import { getAllClubs } from "../api/clubs";

const PlayersContext = createContext();

function PlayersProvider({children}){
    const [players, setPlayers] = useState([]);
    const [clubsForSelector, setClubsForSelector] = useState([]);

    const fetchAllPlayers = useCallback(async() =>{
        const res = await getAllPlayers();

        setPlayers(res.data);
    },[])

    const getClubsForSelector = async() => {

        const res = await getAllClubs();
        const options = res.map(d =>({
            "value": d._id,
            "label": d.name
        }))
        setClubsForSelector(options)

    } 
    
    

    const handleRemovePlayer = async(id) => {
        await removePlayer(id)
        const updatedPlayers =  players.filter((player) => {
            return player._id !== id;
        })

        setPlayers(updatedPlayers);
    }

    const handleEditPlayer = async(id, editedPlayer) => {
        await patchPlayer(id,editedPlayer);
    }

    const handlePlayerCreate = async (id, playerToSave) =>{
        const res = await createPlayer(id, playerToSave)

        if(res.data.message === undefined){
            setPlayers([...players, res.data])
        }
        
    }

    return(
        <PlayersContext.Provider value={{
            players,
            clubsForSelector,
            fetchAllPlayers,
            handleRemovePlayer,
            handleEditPlayer,
            handlePlayerCreate,
            getClubsForSelector
        }}>
            {children}
        </PlayersContext.Provider>
    )
}
export {PlayersProvider};
export default PlayersContext;