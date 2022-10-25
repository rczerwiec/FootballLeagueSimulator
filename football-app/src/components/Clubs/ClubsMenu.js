import React, { useEffect, useState } from "react";
import axios from "axios";
import ClubCard from "./ClubCard/ClubCard";
import ClubFullInfo from "./ClubData/ClubFullInfo";
import NewClubCreator from "./ClubData/ClubCreator/NewClubCreator";
import ClubEditor from "./ClubData/ClubEditor/ClubEditor";
import styles from "./ClubsMenu.module.css";

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
            <ClubFullInfo
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
        <ClubCard
          showSelectedClub={showSelectedClubHandler}
          _id={club._id}
          name={club.name}
          edit={editClubHandler}
          remove={removeClubHandler}
        ></ClubCard>
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
