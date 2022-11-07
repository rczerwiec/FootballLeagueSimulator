import React from "react";
import CardButtons from "../../Buttons/CardButton/CardButtons";
import InformationCard from "../../InformationCard/InformationCard";
import ClubInfo from "./ClubInfo";


const ClubCard = (props) => {
  return (
    <InformationCard>
      <ClubInfo name={props.name} showSelectedClub={props.showSelectedClub} _id={props._id}/>
      <CardButtons firstButtonText="Edit" secondButtonText="Delete" id={props._id} edit={props.edit} remove={props.remove}></CardButtons>
    </InformationCard>

  );
};

export default ClubCard;
