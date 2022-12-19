import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Clubs from "./pages/ClubsPage/Clubs";
import Players from "./pages/PlayersPage/Players";
import Settings from "./components/Settings/Settings";
import Navbar from "./components/Navbar/Navbar";
import Leagues from "./pages/LeaguesPage/Leagues";
import FriendlyMatch from "./pages/FriendlyMatchPage/FriendlyMatch";

function App () {

    return (
      <div className="AppFlex">
        <Router>
            <Navbar/>
            <div className="Content">
              <Routes>
                <Route path="/" element={<Clubs/>} />
                <Route path="/kluby" element={<Clubs/>} />
                <Route path="/zawodnicy" element={<Players/>}/>
                <Route path="/ligi" element={<Leagues />} />
                <Route path="/pojedynek" element={<FriendlyMatch/>}/> 
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
