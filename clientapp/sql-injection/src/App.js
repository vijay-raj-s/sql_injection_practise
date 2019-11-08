import React,{Component} from 'react'; 
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './login-component/login';
import Landing from './landing-component/landing';

class App extends Component {
  render(){
    return (
      <div className="App">
         <Router>
          <Switch>
             
            <Route path="/landing">
              <Landing />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
         
      </Router>
      </div>
    );
  }
  
}

export default App;
