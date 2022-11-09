import React, { useEffect, useState } from "react";
import axios from "axios";
import ClubCard from "./ClubCard/ClubCard";
import ClubFullInfo from "./ClubData/ClubFullInfo";
import NewClubCreator from "./ClubData/ClubCreator/NewClubCreator";
import ClubEditor from "./ClubData/ClubEditor/ClubEditor";
import styles from "./ClubsMenu.module.css";
import Spinner from "../Spinner/Spinner";

class Clubs extends React.Component {

  state = {action: null, clubs: [], loading: true}

  componentDidMount = () =>{
    axios.get("http://localhost:5000/clubs", null).then((response) => {
      //const firstTenEmployees = response.data.slice(0,10);

      const clubs = response;
      this.setState({clubs: clubs.data, loading:false})
      console.log(this.state.clubs);
    });
    
  }
  
  newClubHandler = () => {
    this.setState({
      action: <NewClubCreator />,
    })
  };

  showSelectedClubHandler = (id) => {
    axios.get("http://localhost:5000/clubs/" + id).then((response) => {
      //console.log("działa");
      this.setState({
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

  editClubHandler = (id) => {
    if (id !== null) {
      axios.get("http://localhost:5000/clubs/" + id, null).then((response) => {
        this.setState({
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

  removeClubHandler = (id) => {
    if (id !== null) {
      axios
        .delete("http://localhost:5000/clubs/" + id, null)
        .then((response) => {
          this.setState({
            action: (
              <div>
                <h3>Pomyślnie usunięto</h3>
              </div>
            ),
          });
        });
    }
  };



  

  render(){
    const getAllClubs = this.state.clubs.map((club, index) => {
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
