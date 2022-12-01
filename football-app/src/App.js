import "./App.css";
import api from "./api/api";
import Clubs from "./pages/ClubsPage/Clubs";
import Players from "./components/Players/PlayersMenu";
import Leagues from "./components/Leagues/Leagues";
import Settings from "./components/Settings/Settings";
import { useEffect, useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Match from "./components/Match/Match";
import Spinner from "./components/Spinner/Spinner";
import {ClubsProvider} from "./context/clubs";

const App = () => {

  const [clubs, setClubs] = useState({
    clubsList: [],
    loading: true,
  });

  const [players, setPlayers] = useState([]);

  useEffect(async() => {
    const allPlayers = await api.get("/players", null)
    const allClubs = await api.get("/clubs", null);
    setPlayers(allPlayers.data);
    setClubs({
      clubsList: allClubs.data,
      loading:false
    });
  },[clubs.loading])
  

    return (
      <div className="AppFlex">
        <Router>
            <Navbar/>
            {clubs.loading ?  (<Spinner/>):
            (<div className="Content">
              <Routes>
                <Route path="/kluby" element={<ClubsProvider><Clubs/></ClubsProvider>} />
                <Route path="/zawodnicy" element={<Players players={players}/>} />
                <Route path="/ligi" element={<Leagues />} />
                <Route path="/pojedynek" element={<Match/>}/> 
                <Route path="/ustawienia" element={<Settings />} />
              </Routes>
            </div>)}
            
          </Router>

      </div>
      
    );
  }

/*

*/

export default App;
