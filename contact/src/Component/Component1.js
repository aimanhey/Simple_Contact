import React, { useState, useEffect } from "react";
import logo from "../logo.svg";
import { Counters } from "../features/counter/Counter";
import "../App.css";
import { Anyway, Anyways } from "./CarouselComponent";
import Grid from "@material-ui/core/Grid";
import { Card } from "@material-ui/core";

//import Button from '@material-ui/core/Button';
//import { Card, CardHeader, CardActions } from '@material-ui/core';

export const Component1 = () => {
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
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <body style={{ backgroundColor: `#c0392b`,height:30 ,zIndex:100,width:`100%`}}></body>

        <Anyways style={`sticky`} color={header} />
        <img src={logo} className="App-logo" alt="logo" />
        <img src={logo} className="App-logo" alt="logo" />

        <Counters />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </Grid>
    </>
  );
};
