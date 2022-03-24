import React, { useEffect, useState } from "react";
import axios from "axios";
import Club from "./Club/Club";
import ClubData from "./ClubData/ClubData";
import styles from "./Clubs.module.css";

const Clubs = (props) => {
  const [selectedClubState, setSelectedClubState] = useState({
    selectedClub: null,
  })
  const [clubState, setClubState] = useState({
    clubs: [],
  });



  const showSelectedClubHandler = (id) => {
    console.log("Club ID" + id);
    axios.get("http://localhost:5000/clubs/"+id).then(
      response=> {
        //console.log(response.data);
        setSelectedClubState({
          selectedClub:<div><ClubData name = {response.data.name} type={response.data.type}/></div>,
        })
      }
    )
  };

  useEffect(() => {
    axios.get("http://localhost:5000/clubs", null).then((response) => {
      //const firstTenEmployees = response.data.slice(0,10);

      const employees = response;
      setClubState({
        clubs: employees.data,
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
      {clubs}
    </div>
  );
};

export default Clubs;
