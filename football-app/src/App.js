import './App.css';
import Clubs from './components/Clubs/Clubs';
import Players from './components/Players/Players';
import Leagues from './components/Leagues/Leagues';
import Settings from './components/Settings/Settings';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 

class App extends React.Component{

  render(){




    return (
      <Router>
      <div className="App">
        <Routes>
          <Route path="/clubs" element={<Clubs/>}/>
          <Route path="/zawodnicy" element={<Players/>}/>
          <Route path="/ligi" element={<Leagues/>}/>
          <Route path="/ustawienia" element={<Settings/>}/>
        </Routes>
        
      </div>
      </Router>
    );
  }
}

export default App;
