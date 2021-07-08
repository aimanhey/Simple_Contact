import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Register } from './user/Register';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <Router>
     <Switch>
     <Route path='/login' component={Counter}></Route>
     
     <Route path='/register' component={Register}></Route>
     <Route path='/' component={Counter}></Route>
     </Switch>

  
    </Router>
    
    </div>
  );
}

export default App;
