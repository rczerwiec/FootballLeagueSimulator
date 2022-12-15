import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Clubs from "./pages/ClubsPage/Clubs";
import Players2 from "./pages/PlayersPage/Players";
import Leagues from "./components/Leagues/Leagues";
import Settings from "./components/Settings/Settings";
import Navbar from "./components/Navbar/Navbar";
import Match from "./components/Match/Match";

import {ClubsProvider} from "./context/clubs";
import { PlayersProvider } from "./context/players";

function App () {

    return (
      <div className="AppFlex">
        <Router>
            <Navbar/>
            <div className="Content">
              <Routes>
                <Route path="/" element={<ClubsProvider><Clubs/></ClubsProvider>} />
                <Route path="/kluby" element={<ClubsProvider><Clubs/></ClubsProvider>} />
                <Route path="/zawodnicy" element={<PlayersProvider><Players2/></PlayersProvider>} />
                <Route path="/ligi" element={<Leagues />} />
                <Route path="/pojedynek" element={<Match/>}/> 
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
