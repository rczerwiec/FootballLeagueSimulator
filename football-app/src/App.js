import "./App.css";
import Clubs from "./components/Clubs/Clubs";
import Players from "./components/Players/Players";
import Leagues from "./components/Leagues/Leagues";
import Settings from "./components/Settings/Settings";
import { useEffect, useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";

const App = () => {

  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if (loading == false){

      generatePlayers()
      setLoading(true)
      console.log("Loading")
    }
  },[loading])


  let generatePlayers = async (e) =>{
    
  }
  
    return (
      <div className="AppFlex">
        {loading ? <Router>
            <Navbar/>
            <div className="Content">
              <Routes>
                <Route path="/kluby" element={<Clubs />} />
                <Route path="/zawodnicy" element={<Players />} />
                <Route path="/ligi" element={<Leagues />} />
                <Route path="/ustawienia" element={<Settings />} />
              </Routes>
            </div>
          </Router> : 
          <div>Error</div>}
            

        
      </div>
    );
  }

/*

*/

export default App;
