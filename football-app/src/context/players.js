import { createContext, useState, useCallback } from "react"
import {createPlayer, removePlayer, getAllPlayers, patchPlayer} from "../api/players";
import { getAllClubs } from "../api/clubs";

const PlayersContext = createContext();

function PlayersProvider({children}){
    const [clubsForSelector, setClubsForSelector] = useState([]);


    const getClubsForSelector = async() => {

        const res = await getAllClubs();
        const options = res.map(d =>({
            "value": d._id,
            "label": d.name
        }))
        setClubsForSelector(options)
    } 

    return(
        <PlayersContext.Provider value={{
            clubsForSelector,
            getClubsForSelector
        }}>
            {children}
        </PlayersContext.Provider>
    )
}
export {PlayersProvider};
export default PlayersContext;