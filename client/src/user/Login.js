import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { Button, Spinner } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import "../App.css";
//import "./Register.css";
import { useSpring, animated } from "react-spring";
import { loginUser } from "./LoginSlice";
import { useHistory } from "react-router-dom";
import { contactGet } from "../contact/ContactSlice";
import { ToastContainer, toast } from 'react-toastify';

//import { CSSTransitionGroup } from 'react-transition-group';
//import { fetchContactById, status } from "./ContactSlice";

export const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();
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

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  //const token = useSelector((state) => state.user.token);
  const data = useSelector((state) => state.userLogin.data);
  const status = useSelector((state) => state.userLogin.status);
  const statusC = useSelector((state) => state.contact.status);
  const [notify, setNotify] = useState("");
  const [countt,setCountt]=useState(0);
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    async function ber(){
      console.log(status);
    console.log(data);
    if (status === "success") {
      localStorage.setItem("user", JSON.stringify(data));
      history.push("/");
    } else if (localStorage.getItem("user")) {
      await dispatch(contactGet(JSON.parse(localStorage.getItem("user")))).unwrap();
      console.log(JSON.parse(localStorage.getItem("user")));
      if (statusC === "success") {
        console.log('test');
        history.push("/");
        console.log(statusC);
      } else {
        // localStorage.removeItem("user");
      }
    } else if (status === "fail" && countt===0) {
      setNotify("Username and password is incorrect")
      toast.success("Success Notification !", {
        position: "top-right"
      });
      await sleep(500)
      setNotify("")
      setCountt((prevState)=>prevState+1)


      
    } else {
      localStorage.removeItem("user");
    }

    }
    ber();
  }, [history, data, status, dispatch, statusC, notify, countt]);

  const emailInserted = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  };

  const passwordInserted = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value);
  };

  const registerData = async (e) => {
    e.preventDefault();
    console.log(email + "tengok email");
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const insertData = {
      email: email,
      password: password,
    };
    // setRegister(insertData);
    console.log(insertData);
    console.log('Lets see')
    console.log(formData.values());
    await dispatch(loginUser(formData));
    console.log(data);
    console.log("dfadfs");
  };

  return (
    <div
      style={{
        overflow: "auto",
        margin: "auto",
        height: "auto",
      }}
    >
      {status === "loadingg" ? (
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
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            float: "left",
            display: "block",
            boxShadow: "5px 5px 5px 5px #aaaaaa",
            borderRadius: "15px",
            borderColor: "black",
            borderWidth: "3px",
          }}
          className="mx-auto"
        >
          
          <animated.div style={propsHeader}>
            <div className="mt-2">
            <h1 style={{ textAlign: "center" }}>Login</h1>
            </div>
            <div style={{textAlign:"center", backgroundColor:"red", color:"white"}}>{notify ? notify : null}</div>
          </animated.div>

          <animated.div style={propsform}>
            <div
              style={{
                paddingBottom: "25px",
                opacity: 1,
                transition: "width 0.5s, height 0.5s, opacity 0.5s 0.5s",
              }}
            >
              <Form onSubmit={registerData} className="px-2">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={emailInserted}
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
                
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <div style={{textAlign: "center", marginTop:20}}><a style={{ textDecoration: "none", textAlign: "center"}} href="/register">Register if no account yet</a></div>
              </Form>
            </div>
          </animated.div>
        </div>
      )}
    </div>
  );
};
