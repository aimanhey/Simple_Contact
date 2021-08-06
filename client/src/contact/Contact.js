import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from "../features/counter/counterSlice";
import styles from "../features/counter/Counter.module.css";
import { useHistory } from "react-router-dom";
import { contactGet, storeToDelete } from "./ContactSlice";
import {
  Form,
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Container,
} from "react-bootstrap";
import Div100vh from "react-div-100vh";

import "./ContactCss.scss";

export function Contact() {
  const count = useSelector(selectCount);
  const list = useSelector((state) => state.contact.data);
  const status = useSelector((state) => state.contact.status);
  const deleted = useSelector((state) => state.contact.dataDelete);
  const dispatch = useDispatch();
  const [lists, setList] = useState([]);
  const [card, setCard] = useState(false);
  const [select, setSelect] = useState("");
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  //const [selected, setSelected] = useState(0);
  const [incrementAmount, setIncrementAmount] = useState("2");
  const [header, setHeader] = useState(false);

  let history = useHistory();

  const incrementValue = Number(incrementAmount) || 0;

  useEffect(() => {
    const checkUser = localStorage.getItem("user");

    console.log(lists);

    if (!checkUser) {
      localStorage.removeItem("user");
      history.push("/login");
    } else if (status === "success") {
      setList(list);
      //setList(list)}
    } else {
      dispatch(contactGet(JSON.parse(localStorage.getItem("user"))));
      if (status === "fail") {
        localStorage.removeItem("user");
        history.push("/login");
      }
    }
  }, [dispatch, history, list, lists, status]);


  const listenScrollEvent = (event) => {
    if (window.scrollY < 2) {
      setHeader(false);
    } else if (window.scrollY > 10) {
      setHeader(true);
    }
  };

  window.addEventListener("scroll", listenScrollEvent);


  const selectionn = (index) => {
    if (selected === index) {
      setSelected(null);
      setSelect(null);
      setName("");
  } else {
      setSelected(index);
      setSelect(lists[index].contact);
      setName(lists[index].contact);
  }
  };
  const Senarai = (props) => {

    
    return (
      <div
        className={
          props.hook
            ? "card rounded border-danger"
            : "cards"
        }
        style={{ alignItems: "center", marginTop: 30, width: "18rem" }}
       
        onClick={() =>
           props.hooker()
        }
      >
        <div className="card-body">
          <h5 className="card-title" style={{ textAlign: "center" }}>
            {" "}
            {props.value}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">{props.number}</h6>
        </div>
      </div>
    );
    //  return <i class="list-group-item">{props.value}</i>;
  };

  const Box = () =>
    //  JSON.pa
    lists.map((data, index) => {
      return (
        <Senarai
          key={index}
          value={data.contact}
          number={data.contactNumber}
          index={index}
          hook={selected===index}
          hooker={() => selectionn(index)}
          // terpilih={selected[index]? 'makan':null}
          //warna={index === selected ? "card rounded border-danger" : "card rounded"}
        />
      );
    });
  //return  <div>saya</div>

  /*
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
    console.log(insertData + "ssh");
    await dispatch(loginUser(formData));
    console.log(data);
    console.log("dfadfs");
  };
*/
  return lists ? (
    <Div100vh>
      <div className="bodi">
        <Navbar
          expand="lg"
          sticky="top"
          className={header ? "navbar2 active" : "navbar2"}
        >
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="container color">
          <div className="jaditak">
            <div className="d-flex justify-content-center">
              <div>
                <div className="border rounded px-2 py-4 mx-2 mt-3">
                  <h1> CONTACTS</h1>
                  <div className="">
                    <Box />
                    {/*   <div ref={hoverRef}>{isHovered ? "😁" : "☹️"}</div>;*/}
                    {select ? select : null}
                    {deleted}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container utah">
            <div className="row">
              <div className="col-sm"></div>
              <div className="col-sm-8">
                <div className=" mt-3 mx-5">
                  <Form>
                    <Form.Group className="mb-3 ">
                      <Form.Label>Contact Name</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Name"
                        value={name}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 ">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Number"
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                      <Button variant="primary" type="submit" className="mx-5">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
              <div className="col-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </Div100vh>
  ) : (
    ((<div>makan</div>),
    (
      <div className=" border ml-5 ">
        <div className="row mt-5">
          <div className="col-sm"></div>
          <div className="col-sm">
            <div className="row mt-3">
              {" "}
              <h1> CONTACTS</h1>
            </div>
          </div>
          <div className="col-sm"></div>

          <div className="col-sm"></div>
        </div>
      </div>
    ))
  );
}
