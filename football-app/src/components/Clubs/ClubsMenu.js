import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/api";
import ClubCard from "./ClubCard/ClubCard";
import ClubFullInfo from "./ClubData/ClubFullInfo";
import NewClubCreator from "./ClubData/ClubCreator/NewClubCreator";
import ClubEditor from "./ClubData/ClubEditor/ClubEditor";
import styles from "./ClubsMenu.module.css";
import Spinner from "../Spinner/Spinner";
import { getOneClub, deleteClub } from "../../api/clubs";

function Clubs(props){
  //console.log(props);
  const [action, setAction] = useState(null);

  const newClubHandler = () => {
    setAction(<NewClubCreator />)
  };

  const showSelectedClubHandler = async(id) => {
    const {_id,name,type} = await getOneClub(id);
    
    setAction(<div>
      <ClubFullInfo
        id={_id}
        name={name}
        type={type}
      />
    </div>)
  };

  const editClubHandler = async(id) => {
    if (id !== null) {
      const {_id,name,type} = await getOneClub(id);

      setAction(<ClubEditor
            id={_id}
            name={name}
            type={type}
          />)
    }
  };

  const removeClubHandler = async(id) => {
    if (id !== null) {
      const {name} = await deleteClub(id);
      
      setAction(<div>
        <h3>Usunięto {name}</h3>
      </div>)
    }
  };
    //console.log(this.props)
  const getAllClubs = props.clubs.clubsList.map((club, index) => {
      //console.log(index);
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
          <div className={styles.Action}>{action}</div>
          <div>
          <div className={styles.Header}>Lista Klubów</div>
          <button className={styles.Button} onClick={newClubHandler}>
            Nowy Klub
          </button>
          <div className={styles.Clubs}>{getAllClubs}</div>
          </div>
  
      </div>
    );
  };

export default Clubs;
