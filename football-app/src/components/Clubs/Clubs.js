import React, { useEffect, useState } from "react";
import axios from "axios";
import Club from "./Club/Club";
import ClubData from "./ClubData/ClubData";
import NewClubCreator from "./ClubData/ClubCreator/NewClubCreator";
import ClubEditor from "./ClubData/ClubEditor/ClubEditor";
import styles from "./Clubs.module.css";

const Clubs = (props) => {
  const [actionState, setActionState] = useState({
    action: null,
  });
  const [clubState, setClubState] = useState({
    clubs: [],
  });

  const newClubHandler = () => {
    setActionState({
      action: <NewClubCreator />,
    });
  };

  const showSelectedClubHandler = (id) => {
    console.log("Club ID" + id);
    axios.get("http://localhost:5000/clubs/" + id).then((response) => {
      //console.log("działa");
      setActionState({
        action: (
          <div>
            <ClubData
              id={id}
              name={response.data.name}
              type={response.data.type}
            />
          </div>
        ),
      });
    });
  };

  const editClubHandler = (id) => {
    if (id !== null) {
      axios.get("http://localhost:5000/clubs/" + id, null).then((response) => {
        setActionState({
          action: (
            <ClubEditor
              id={response.data._id}
              name={response.data.name}
              type={response.data.type}
            />
          ),
        });
      });
    }
  };

  const removeClubHandler = (id) => {
    if (id !== null) {
      axios
        .delete("http://localhost:5000/clubs/" + id, null)
        .then((response) => {
          setActionState({
            action: (
              <div>
                <h3>Pomyślnie usunięto</h3>
              </div>
            ),
          });
        });
    }
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
      <div key={club._id}>
        <Club
          showSelectedClub={showSelectedClubHandler}
          _id={club._id}
          name={club.name}
          edit={editClubHandler}
          remove={removeClubHandler}
        ></Club>
      </div>
    );
  });

  return (
    <div>
      {actionState.action !==null ?
        (<div className={styles.Action}>{actionState.action}</div>):(<div/>)
      }
      <div className={styles.Header}>Lista Klubów</div>
      <button className={styles.Button} onClick={newClubHandler}>
        Nowy Klub
      </button>
      <div className={styles.Clubs}>{clubs}</div>
    </div>
  );
};

export default Clubs;
