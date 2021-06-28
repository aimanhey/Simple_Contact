import React from "react";
import "./App.css";
import { Component1 } from "./Component/Component1";
import { Anyways } from "./Component/CarouselComponent";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Contact } from "./contacts/Contact";

function App() {
  return (
<div className="App">
<body style={{ backgroundColor: `red`,height:40 ,zIndex:100,width:`100%`}}></body>
{/*
<Anyways style={`sticky`} color={'#c0392b'} />*/}
    <Router>
     <Switch>
     <Route path='/login' component={Component1}></Route>
     <Route path='/' component={Contact}></Route>
     </Switch>

  
    </Router>
    </div>
  );
}

// eslint-disable-next-line no-lone-blocks
{/*   <div className="App">
      <Component1 />
    </div> */}

export default App;
