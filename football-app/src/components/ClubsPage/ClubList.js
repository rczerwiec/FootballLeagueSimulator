import { useContext, useState } from "react"
import ClubInfo from "./ClubInfo"
import ClubCard from "./ClubCard"
import ClubsContext from "../../context/clubs"

function ClubList(){
    const {clubs} = useContext(ClubsContext);

    const [action,setAction] = useState(true)
    const [selectedClub, setSelectedClub] = useState();

    const setInfo= (club) => {
        setAction(!action)
        setSelectedClub(club);
    }

    const renderClubs = clubs.map((club) => {
        return <ClubCard key={club._id} setInfo={setInfo} club={club}/>
    })

    let content  = renderClubs;

    if(action===false){
        content = <ClubInfo club={selectedClub} onClick={() => {setAction(!action)}}/>
    }


    return(
        <div className="justify-center bg-zinc-600 p-6 rounded-bl-lg rounded-br-lg ml-2.5 mr-2.5 drop-shadow-lg">
            <h1 className="text-2xl">Wszystkie Kluby</h1>
            {content}
        </div>
    )
}

export default ClubList;