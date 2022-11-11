import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/api";
import ClubCard from "./ClubCard/ClubCard";
import ClubFullInfo from "./ClubData/ClubFullInfo";
import NewClubCreator from "./ClubData/ClubCreator/NewClubCreator";
import ClubEditor from "./ClubData/ClubEditor/ClubEditor";
import styles from "./ClubsMenu.module.css";
import Spinner from "../Spinner/Spinner";

class Clubs extends React.Component {

  state = {action: null}

  newClubHandler = () => {
    this.setState({
      action: <NewClubCreator />,
    })
  };

  showSelectedClubHandler = async(id) => {
    const selectedClub = await api.get("/clubs/" + id)

    this.setState({
      action: (
        <div>
          <ClubFullInfo
            id={id}
            name={selectedClub.data.name}
            type={selectedClub.data.type}
          />
        </div>
      ),
    });
  };

  editClubHandler = async(id) => {
    if (id !== null) {
      const selectedClub = await api.get("/clubs/" + id, null);

      this.setState({
        action: (
          <ClubEditor
            id={selectedClub.data._id}
            name={selectedClub.data.name}
            type={selectedClub.data.type}
          />
        ),
      });
    }
  };

  removeClubHandler = async(id) => {
    if (id !== null) {
      const deletedClub = await api.delete("/clubs/" + id, null);
      
      this.setState({
          action: (
            <div>
              <h3>Usunięto {deletedClub.data.name}</h3>
            </div>
          ),
        });
    }
  };

  render(){
    console.log(this.props)
    const getAllClubs = this.props.clubs.clubsList.map((club, index) => {
      console.log(index);
      return (
        <div key={club._id}>
          <ClubCard
            showSelectedClub={this.showSelectedClubHandler}
            _id={club._id}
            name={club.name}
            edit={this.editClubHandler}
            remove={this.removeClubHandler}
          ></ClubCard>
        </div>
      );
    });

    return (
      <div>
        {this.state.action !==null ?
          (<div className={styles.Action}>{this.state.action}</div>):(<div/>)
        }
        { this.state.loading ? (<Spinner/>) :
        (
          <div>
          <div className={styles.Header}>Lista Klubów</div>
          <button className={styles.Button} onClick={this.newClubHandler}>
            Nowy Klub
          </button>
          <div className={styles.Clubs}>{getAllClubs}</div>
          </div>
        )
  
        }
  
      </div>
    );
  }

};

export default Clubs;
