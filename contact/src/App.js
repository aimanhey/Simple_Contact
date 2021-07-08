// eslint-disable-next-line jsx-a11y/href-no-hash
import React from "react";
import "./App.css";
import { Component1 } from "./Component/Component1";
//import { Anyways } from "./Component/CarouselComponent";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Contact } from "./contacts/Contact";
import { Register} from "./Register/Register";


//<body style={{ backgroundColor: `red`,height:40 ,zIndex:100,width:`100%`}}></body>
function App() {
  return (
<div className="App">

{/*
<Anyways style={`sticky`} color={'#c0392b'} />*/}
    <Router>
     <Switch>
     <Route path='/login' component={Component1}></Route>
     
     <Route path='/register' component={Register}></Route>
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
