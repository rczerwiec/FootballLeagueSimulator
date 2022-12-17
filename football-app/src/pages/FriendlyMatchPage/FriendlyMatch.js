import React, {useState } from "react";
import { useCreateFriendlyMatchMutation, useGetFriendlyMatchesQuery, useFetchClubsQuery } from "../../store";
import Selector from "../../components/Buttons/Selector/Selector";
import Button from "../../components/ReusableComponents/Button";
import Spinner from "../../components/Spinner/Spinner";
import FriendlyMatchList from "./FriendlyMatchList";



function FriendlyMatch(){
  const {data, error, isLoading} = useGetFriendlyMatchesQuery();
  const clubs = useFetchClubsQuery();
  console.log(data);
  const [createFriendly, results] = useCreateFriendlyMatchMutation();
  console.log(results)

  let clubListContent;
  let options;

  if (!clubs.isLoading) {
    options = clubs.data.map((d) => ({
      value: d._id,
      label: d.name,
    }));
  }
  if(isLoading){
    clubListContent = <Spinner/>
  }else if(error){
    clubListContent = <div>Błąd podczas wczytywania listy meczy towarzyskich</div>
  }
  else{
    clubListContent = <FriendlyMatchList matches={data} />
  }


  const [firstClub, setFirstClub] = useState(null);
  const [secondClub, setSecondClub] = useState(null);

  const onFirstClubChange = (e) => {
    console.log(e);
    setFirstClub({
      id: e.value,
      name: e.label,
      players: e.players,
    });
  };

  const onSecondClubChange = (e) => {
    setSecondClub({
      id: e.value,
      name: e.label,
      players: e.players,
    });
  };

  const onGenerateResultHandler = (e) => {
    e.preventDefault();
    createFriendly({firstClub,secondClub})
  };

  return (
    <div>
        <form onSubmit={onGenerateResultHandler}>
          <Selector text="Drużyna 1" options={options} onChange={onFirstClubChange}/>
          {firstClub ? <div>Wybrany</div> : <div>Nie Wybrany</div>}
          
          <Selector text="Drużyna 2" options={options} onChange={onSecondClubChange}/>
          {secondClub ? <div>Wybrany</div> : <div>Nie Wybrany</div>}

          <Button primary>Zagraj</Button>
        </form>
        {clubListContent}
    </div>
  );
};

export default FriendlyMatch;
