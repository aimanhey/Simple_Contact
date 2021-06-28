import React, { useState, useEffect } from "react";
import logo from "../logo.svg";
import { Counters } from "../features/counter/Counter";
import "../App.css";
import { Anyway, Anyways } from "./CarouselComponent";
import Grid from "@material-ui/core/Grid";
import { Card } from "@material-ui/core";

//import Button from '@material-ui/core/Button';
//import { Card, CardHeader, CardActions } from '@material-ui/core';

export const Component1 = ({location,history}) => {
  const [header, setHeader] = useState("#c0392b");

  const listenScrollEvent = (event) => {
    if (window.scrollY < 73) {
      return setHeader("#c0392b");
    } else if (window.scrollY > 70) {
      return setHeader("#8e44ad");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <React.Fragment>
    {/*  <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
       <body style={{ backgroundColor: `#hhhhhh`,height:40 ,zIndex:100,width:`100%`}}></body>
        <Anyways style={`sticky`} color={header} /> */}

      

     
      </React.Fragment>
  
  );
};
