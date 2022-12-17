import React, { useState } from "react";
import Button from "../../components/ReusableComponents/Button";
import Input from "../../components/ReusableComponents/Input";
import Selector from "../../components/Buttons/Selector/Selector";
import { useCreateLeagueMutation, useFetchClubsQuery } from "../../store";
import Spinner from "../../components/Spinner/Spinner";

function CreateLeague({onLeagueCreate}) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [maxTeams, setMaxTeams] = useState("");
  const [createLeague, results] = useCreateLeagueMutation();

  const [teamsInLeague, setTeamsInLeague] = useState([]);
  console.log(maxTeams);
  const { data, error, isLoading } = useFetchClubsQuery();

  const onLeagueSubmit = (e) => {
    e.preventDefault()
    const league = {
      name,
      level,
      maxTeams,
      clubs: teamsInLeague,
    };

    createLeague(league)
    onLeagueCreate();
  };

  const onSelectorChange = (e, i) => {
    let updatedList = teamsInLeague;
    updatedList[i] = e.value;
    setTeamsInLeague(updatedList);
  };


  let generateSelectors;
  if (error) {
    generateSelectors = <div>Error while loading selectors</div>;
  } else if (isLoading) {
    generateSelectors = <Spinner />;
  } else {
    if (maxTeams !== "") {
      const options = data.map((d) => ({
        value: d._id,
        label: d.name,
      }));
      generateSelectors = [...Array(parseInt(maxTeams))].map((_, i) => {
        return (
          <Selector
            key={i}
            placeholder="Wybierz klub"
            options={options}
            onChange={(e) => {
              onSelectorChange(e, i);
            }}
          />
        );
      });
    }
  }

  return (
    <div className="create-container">
      <form className="create-form" onSubmit={onLeagueSubmit}>
        <h1>Utwórz Ligę</h1>
        <label>Nazwa</label>
        <div>
          <Input
            placeholder="Wprowadź nazwę ligi"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <label>Stopień ligi</label>
        <div>
          <Input
            placeholder="Wprowadź stopień ligi"
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          />
        </div>
        <label>Ilość drużyn</label>
        <div>
          <Input
            placeholder="Wprowadź stopień ligi"
            value={maxTeams}
            onChange={(e) => {
              setMaxTeams(e.target.value);
            }}
          />
        </div>
        {generateSelectors}
        <Button secondary rounded>
          Utwórz
        </Button>
      </form>
    </div>
  );
}

export default CreateLeague;
