import { createContext, useState } from "react"
import {createClub, deleteClub, getAllClubs, patchClub} from "../api/clubs";

const ClubsContext = createContext();

function ClubsProvider({children}){
    const [clubs, setClubs] = useState([]);

    const fetchAllClubs = async() =>{
        const res = await getAllClubs();

        setClubs(res);
    }

    const handleRemoveClub = async(id) => {
        await deleteClub(id)
        const updatedClubs =  clubs.filter((club) => {
            return club._id !== id;
        })

        setClubs(updatedClubs);
    }

    const handleEditClub = async(id, editedClub) => {
        const res = await patchClub(id,editedClub);
        console.log("res", res);
    }

    const handleClubCreate = async (name,type) =>{
        const res = await createClub({name,type})

        if(res.data.message === undefined){
            setClubs([...clubs, res.data])
        }
        
    }

    return(
        <ClubsContext.Provider value={{
            clubs,
            fetchAllClubs,
            handleRemoveClub,
            handleEditClub,
            handleClubCreate
        }}>
            {children}
        </ClubsContext.Provider>
    )
}
export {ClubsProvider};
export default ClubsContext;