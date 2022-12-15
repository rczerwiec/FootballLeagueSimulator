import {useState } from "react";
import ClubInfo from "./ClubInfo";
import ClubCard from "./ClubCard";
import { useFetchClubsQuery } from "../../store";
import Spinner from "../../components/Spinner/Spinner";

function ClubList(){
    const {data, error, isLoading} = useFetchClubsQuery();

    const [action,setAction] = useState(true)
    const [selectedClub, setSelectedClub] = useState();

    const setInfo= (club) => {
        setAction(!action)
        setSelectedClub(club);
    }

    let content;
    if (error){
        content = <div>Error while loading clubs</div>
    }
    else if(isLoading){
        content = <Spinner/>
    }
    else(
        content = data.map((club) => {
            return <ClubCard key={club._id} setInfo={setInfo} club={club}/>
        })
    )

    if(action===false){
        content = <ClubInfo club={selectedClub} onClick={() => {setAction(!action)}}/>
    }

    return(
        <div className="list-container">
            <h1>Wszystkie Kluby</h1>
            {content}
        </div>
    )
}

export default ClubList;