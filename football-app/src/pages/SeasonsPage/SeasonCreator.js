import { useFetchLeaguesQuery } from "../../store";
import Input from "../../components/ReusableComponents/Input";
import Selector from "../../components/Buttons/Selector/Selector";
import Button from "../../components/ReusableComponents/Button";
import { useState } from "react";
import CreatorLeagueOption from "./CreatorLeagueOption";

function SeasonCreator(){
    const [name, setName] = useState("");
    const [leagues, setLeagues] = useState([]);
    const [leaguesInSeason, setLeaguesInSeason] = useState([]);
    const onSelectorChange = (e, i) => {
        let updatedList = leaguesInSeason;
        updatedList[i] = e.value;
        setLeaguesInSeason(updatedList);
    };
    const {data, error, isLoading} = useFetchLeaguesQuery();

    let generateSelectors;
    if(!isLoading && !error){
        const options = data.map((d) => ({
            value: d._id,
            label: d.name,
          }));


        generateSelectors = [...Array(parseInt(5))].map((_, i) => {
            return (
                <CreatorLeagueOption i={i} options={options} onSelectorChange={onSelectorChange}/>
            );
          });
    }

    return (
        <div className="create-container">
        <form className="create-form" onSubmit={() => {}}>
          <h1>Utwórz Sezon</h1>
          <label>Nazwa</label>
          <div>
            <Input
              placeholder="Wprowadź nazwę sezonu"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          {generateSelectors}
          <Button secondary rounded>
            Utwórz
          </Button>
        </form>
      </div>
    )
}

export default SeasonCreator;