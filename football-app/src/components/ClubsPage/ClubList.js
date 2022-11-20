import { useState } from "react"
import ClubInfo from "./ClubInfo"
import ClubCard from "./ClubCard"

function ClubList({clubs, onRemove}){

    const [action,setAction] = useState(true)
    const [selectedClub, setSelectedClub] = useState();

    const setInfo= (club) => {
        setAction(!action)
        setSelectedClub(club);
    }

    const renderClubs = clubs.map((club) => {
        return <ClubCard key={club._id} setInfo={setInfo} onRemove={onRemove} club={club}/>
    })

    let content  = renderClubs;

    if(action===false){
        content = <ClubInfo club={selectedClub} onClick={() => {setAction(!action)}}/>
    }


    return(
        <div>
            <h2>Lista Klubów</h2>
            {content}
        </div>
    )
}

export default ClubList;