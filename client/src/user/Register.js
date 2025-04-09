import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fade, Form } from "react-bootstrap";
import { Button, Spinner, Alert } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import "../App.css";
//import "./Register.css";
import { useSpring, animated } from "react-spring";
import { createUser } from "./RegisterSlice";
import { useHistory ,useLocation } from "react-router-dom";

//import { CSSTransitionGroup } from 'react-transition-group';
//import { fetchContactById, status } from "./ContactSlice";

export const Register = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const propsform = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 1000,
  });
  const propsHeader = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 500,
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
  //const token = useSelector((state) => state.user.token);
  const data = useSelector((state) => state.user.data);
  const status = useSelector((state) => state.user.status);
  const [notify, setNotify] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(undefined);

  useEffect(() => {
    console.log(status);
    console.log(data);
    async function red(){
    if (localStorage.getItem("user")){
      localStorage.removeItem("user");
    }
    if (status === "success") {
        localStorage.setItem('user', data)
      history.push("/");
    } else if (status === "fail") {
      setNotify("You put wrong input");
      await sleep(500); 
      setNotify("");
     console.log(data.error)
    } else {
    }}
    red();

    // const user = localStorage.getItem("user");
    // if (!user) {
    //   localStorage.removeItem("user");
    //   history.push("/login");
    //   return;
    // }

    // (async () => {
    //   try {
    //     await dispatch(verifyAuth(JSON.parse(user))).unwrap();
    //     if( status == 'fail'){
    //       localStorage.removeItem("user");
    //       history.push("/login");
    //     }
    //   } catch (error) {
    //     // Handle token expiry or auth errors by redirecting to login
    //     localStorage.removeItem("user");
    //     history.push("/login");
    //   }
    // })();
  }, [history, data, status]);

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

  const registerData = async (e) => {
    e.preventDefault();
    console.log(email + "tengok email");
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstName", firstname);
    formData.append("lastName", lastname);
    if (selectedFiles) {
      formData.append("profilePicture", selectedFiles[0]);
    }
    setNotify("Tiada file dihantar");
    const insertData = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      profilePicture: selectedFiles,
    };
    // setRegister(insertData);
    console.log(insertData + "ssh");
    try {
      await dispatch(createUser(insertData)).unwrap();
  } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
  }
    console.log("dfadfs");
  };

  return (
    <body
      style={{
        overflow: "auto",
        margin: "auto",
        height: "auto",
      }}
    >
      {status === "loading" ? (
        <Spinner
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            float: "left",
            display: "inline",
          }}
          animation="border"
        />
      ) : (
        <>
          {notify ? (
            <Fade in timeout={1}>
              <div className="alert alert-danger" role="alert">
                {notify}
              </div>
            </Fade>
          ) : null}
          ,
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              float: "left",
              display: "inline",
              boxShadow: " 5px 5px 5px 5px #aaaaaa",
              borderRadius: "15px",
              borderColor: "black",
              borderWidth: "3px",
            }}
          >
            <animated.div style={propsHeader}>
              <h1 style={{ textAlign: "center" }}>REGISTER</h1>
            </animated.div>

            <animated.div style={propsform}>
              <div
                style={{
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
                  <div style={{ height: 30 }}></div>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control
                      type="file"
                      id="exampleFormControlFile1"
                      label="Gambar    "
                      onChange={selectFile}
                      defaultValue=""
                    />
                  </Form.Group>
                  <div style={{ height: 30 }}></div>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </animated.div>
          </div>
        </>
      )}
    </body>
  );
};
