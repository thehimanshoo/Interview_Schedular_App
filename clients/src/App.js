import logo from './logo.svg';
import React,{useState} from "react";
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';

import './App.css';
import CreateInterview from "./components/CreateInterview";
import Interviews from "./components/Interviews";

function App() {

  return (
      <React.Fragment>
          <Router>
              <Switch>
                  <Route exact path="/" component={CreateInterview}/>
                  <Route exact path="/interviews" component={Interviews}/>
              </Switch>
          </Router>
      </React.Fragment>
  );
}

export default App;
