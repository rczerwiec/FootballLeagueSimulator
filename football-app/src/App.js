import "./App.css";
import ClubsMenu from "./components/Clubs/ClubsMenu";
import Players from "./components/Players/PlayersMenu";
import Leagues from "./components/Leagues/Leagues";
import Settings from "./components/Settings/Settings";
import { useEffect, useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const App = () => {

    return (
      <div className="AppFlex">
        <Router>
            <Navbar/>
            <div className="Content">
              <Routes>
                <Route path="/kluby" element={<ClubsMenu />} />
                <Route path="/zawodnicy" element={<Players />} />
                <Route path="/ligi" element={<Leagues />} />
                <Route path="/ustawienia" element={<Settings />} />
              </Routes>
            </div>
          </Router>

      </div>
    );
  }

/*

*/

export default App;
