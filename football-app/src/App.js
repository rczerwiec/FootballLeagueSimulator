import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Clubs from "./pages/ClubsPage/Clubs";
import Players from "./pages/PlayersPage/Players";
import Settings from "./components/Settings/Settings";
import Navbar from "./components/Navbar/Navbar";
import Leagues from "./pages/LeaguesPage/Leagues";
import FriendlyMatch from "./pages/FriendlyMatchPage/FriendlyMatch";
import LogIn from "./pages/LogInPage/LogIn";
import { auth } from "./firebase/firebase";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner/Spinner";
import Seasons from "./pages/SeasonsPage/Seasons";

function App () {
    const [loggedIn, setLoggedIn] = useState();
    console.log(loggedIn)
    useEffect(() => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid);
          setLoggedIn(true);
        } else {
          // User is signed out
          console.log("logged out");
          setLoggedIn(false);
        }
      })
    }, [])

    if(loggedIn){
      return (
        <div className="AppFlex">
          <Router>
              <Navbar/>
              <div className="Content">
                <Routes>
                  <Route path="/" element={<Clubs/>} />
                  <Route path="/kluby" element={<Clubs/>} />
                  <Route path="/zawodnicy" element={<Players/>}/>
                  <Route path="/sezony" element={<Seasons />} />
                  <Route path="/ligi" element={<Leagues />} />
                  <Route path="/pojedynek" element={<FriendlyMatch/>}/> 
                  <Route path="/ustawienia" element={<Settings />} />
                </Routes>
              </div>
              
            </Router>
  
        </div>
        
      );
    }
    else if(loggedIn===undefined){
      return(
        <Spinner/>
      )
    }
    else{
      return(
        <div className="AppFlex">
          <Router>
              <div className="Content">
                <Routes>
                  <Route path="/" element={<LogIn/>} />
                  <Route path="/kluby" element={<LogIn/>} />
                  <Route path="/zawodnicy" element={<LogIn/>}/>
                  <Route path="/ligi" element={<LogIn />} />
                  <Route path="/pojedynek" element={<LogIn/>}/> 
                  <Route path="/ustawienia" element={<LogIn />} />
                </Routes>
              </div>
              
            </Router>
  
        </div>
      )
    }
  }


/*

*/

export default App;
