import "./App.css";
import api from "./api/api";
import Clubs from "./pages/ClubsPage/Clubs";
import Players from "./components/Players/PlayersMenu";
import Players2 from "./pages/PlayersPage/Players";
import Leagues from "./components/Leagues/Leagues";
import Settings from "./components/Settings/Settings";
import { useEffect, useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Match from "./components/Match/Match";
import Spinner from "./components/Spinner/Spinner";
import {ClubsProvider} from "./context/clubs";
import { PlayersProvider } from "./context/players";

const App = () => {

    return (
      <div className="AppFlex">
        <Router>
            <Navbar/>
            <div className="Content">
              <Routes>
                <Route path="/kluby" element={<ClubsProvider><Clubs/></ClubsProvider>} />
                <Route path="/zawodnicy" element={<PlayersProvider><Players2/></PlayersProvider>} />
                <Route path="/ligi" element={<Leagues />} />
                <Route path="/pojedynek" element={<Match/>}/> 
                <Route path="/ustawienia" element={<Settings />} />
              </Routes>
            </div>)
            
          </Router>

      </div>
      
    );
  }

/*

*/

export default App;
