import { useFetchLeaguesQuery } from "../../store";
import Spinner from "../../components/Spinner/Spinner";
import LeagueCard from "./LeagueCard";

function LeagueList({handleOnCardClick}) {
    const {data, error, isLoading} = useFetchLeaguesQuery();

    let content;
    if(isLoading){
        content = <Spinner/>
    }
    else if(error){
        content = <div>Błąd podczas wczytywania strony</div>
    }
    else{
        content = data.map((l) => {
            return <LeagueCard key={l._id} onClick={handleOnCardClick} league={l}/>
        })
    }

    return (
      <div>
        {content}
      </div>
    );
  }
  
  export default LeagueList;
  