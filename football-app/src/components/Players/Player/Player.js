import React from "react";
import CardButtons from "../Buttons/CardButtons";
import InformationCard from "../../InformationCard/InformationCard";
import PlayerInfo from "../PlayerInfo";

const PlayerCard = (props) => {
  return (
    <InformationCard>
      <PlayerInfo showSelectedPlayer={props.showSelectedPlayer} id={props.id} name={props.name} nationality={props.nationality} age={props.age} overall={props.overall}/>
      <CardButtons firstButtonText="Edit" secondButtonText="Delete" edit={props.edit} remove={props.remove}/>
    </InformationCard>
  );
};

export default PlayerCard;
