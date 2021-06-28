import React from 'react';
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
//import Button from '@material-ui/core/Button';
import { Card, CardHeader, CardActions } from '@material-ui/core';
import "../App.css";



export const Carousell=()=>{
    var items = [
        {
          name: "Random Name #1",
          description: "Probably the most random thing you have ever seen!",
        },
        {
          name: "Random Name #2",
          description: "Hello World!",
        },
      ];

      return(
        
        <Carousel
        NextIcon={<img alt="makan" src="https://icons.iconarchive.com/icons/praveen/minimal-outline/512/next-icon.png" style={{"width": "50px"}}/>}
        PrevIcon={<img alt="minum" src="http://random.com/prev" />}
        animation="slide"
        interval="1000"
        width="5000"
       >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
      
      )

}

export const Item=(props)=>{
        return (
          <Paper style={{width:1000,textAlign:"center"}} >
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
      
            <Button className="CheckButton">Check it out!</Button>
          </Paper>
        );
      }
 export const Anyway=()=>{

    return(
    <Grid item xs={500} style={{position:"flex"}}>
    <Card  >
        <CardHeader title={"hshsfsdfsdfsdf"}  />
        <CardActions>
            <Button label="수정" />
            <Button label="삭제"  />
        </CardActions>
    </Card>
    </Grid>)
 }
 export const Anyways=(props)=>{

    return(
<div className={props.style} >
    <Grid item xs={500} >
    <Card style={{backgroundColor:props.color}}>
        <CardHeader title={"hshsfsdfsdfsdf"}  />
        <CardActions>
            <Button label="수정" />
            <Button label="삭제"  />
        </CardActions>
    </Card>
    </Grid></div>)
 }

    // export default Anyway