import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { Button, Fade } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import "../App.css";
import "./Register.css";
import { useSpring, animated } from "react-spring";
import { createUser } from "./RegisterSlice";
import { useHistory } from "react-router-dom";

//import { CSSTransitionGroup } from 'react-transition-group';
//import { fetchContactById, status } from "./ContactSlice";

export const Register = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 2000,
  });
  const initiatial = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    profilePicture: "",
  };
  const [register, setRegister] = useState(initiatial);
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const data = useSelector((state) => state.user.data);
  const [selectedFiles, setSelectedFiles] = useState(undefined);

  useEffect(() => {if(data){
    history.push('/login');
  }}, [data, history]);

  const emailInserted = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  };
  const firstnameInserted = (event) => {
    setFirstname(event.target.value);
    console.log(event.target.value);
  };

  const lastInserted = (event) => {
    setLastname(event.target.value);
    console.log(event.target.value);
  };

  const passwordInserted = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value);
  };

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
    console.log(event.target.files + "jsjsj");
  };

  const registerData = async() =>  {
    console.log(email +"tengok email")
    const insertData = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      profilePicture: selectedFiles,
    };
    //setRegister(insertData);

     dispatch(createUser(insertData),async (result)=>{

      console.log(result);
      if (data) {
        console.log("djkadha");
        history.push('/login');
      } else {
        console.log("ididid");
        console.log(data +'dda')
        
       
      }
    }

    );
  //  history.push('login');
  };

  return (
    <div style={{ backgroundColor: "red" }}>
      <animated.div style={props}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              border: "2px solid blue",
              padding: "25px",
              borderBottomRightRadius: "25px",
              opacity: 1,
              transition: "width 0.5s, height 0.5s, opacity 0.5s 0.5s",
            }}
          >
            <Form onSubmit={registerData}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={emailInserted}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter firstname"
                  value={firstname}
                  onChange={firstnameInserted}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter lastname"
                  value={lastname}
                  onChange={lastInserted}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={passwordInserted}
                  autoComplete="On"
                />
              </Form.Group>

              <Form.Group>
                <Form.File
                  id="exampleFormControlFile1"
                  label="Example file input"
                  onChange={selectFile}
                  defaultValue=""
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </animated.div>
    </div>
  );
};
