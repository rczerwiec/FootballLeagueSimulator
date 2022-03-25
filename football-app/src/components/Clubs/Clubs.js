import React, { useEffect, useState } from "react";
import axios from "axios";
import Club from "./Club/Club";
import ClubData from "./ClubData/ClubData";
import NewClubCreator from "./ClubCreator/NewClubCreator";
import styles from "./Clubs.module.css";

const Clubs = (props) => {
  const [selectedClubState, setSelectedClubState] = useState({
    selectedClub: null,
  })
  const [clubState, setClubState] = useState({
    clubs: [],
  });

  const newClubHandler = () => {
    setSelectedClubState({
      selectedClub: <NewClubCreator/>
    });
  }

  const showSelectedClubHandler = (id) => {
    console.log("Club ID" + id);
    axios.get("http://localhost:5000/clubs/"+id).then(
      response=> {
        //console.log("działa");
        setSelectedClubState({
          selectedClub:<div><ClubData name = {response.data.name} type={response.data.type}/></div>,
        })
      }
    )
  };

  useEffect(() => {
    axios.get("http://localhost:5000/clubs", null).then((response) => {
      //const firstTenEmployees = response.data.slice(0,10);

      const clubs = response;
      setClubState({
        clubs: clubs.data,
      });
    });
    //console.log(clubState.clubs);
  });

  const clubs = clubState.clubs.map((club, index) => {
    return (
      <div
        key={club._id}
        className={styles.club_object}
      >
        <Club showSelectedClub={showSelectedClubHandler} _id={club._id} name={club.name}></Club>
      </div>
    );
  });

  return (
    <div>
      {selectedClubState.selectedClub}
      <h2>Lista Klubów</h2>
      <button onClick={newClubHandler}>Nowy Klub</button>
      {clubs}
    </div>
  );
};

export default Clubs;
