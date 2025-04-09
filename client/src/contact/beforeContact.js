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
import {
  contactGet,
  contactAdd,
  contactUpdate,
  contactDelete,
  resetStatusUpdate,
  resetStatusAdd,
  resetStatusDelete
} from "./ContactSlice";
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
  const statusAdd = useSelector((state) => state.contact.statusAdd);
  const statusUpdate = useSelector((state) => state.contact.statusUpdate);
  const deleted = useSelector((state) => state.contact.statusDelete);
  const dispatch = useDispatch();
  const [lists, setList] = useState([]);
  const [card, setCard] = useState(false);
  const [select, setSelect] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [id, setId] = useState(0);
  const [selected, setSelected] = useState(null);
  const [alert, setAlerted] = useState(false);
  const [failCount, setFailCount] = useState(0);
  //const [selected, setSelected] = useState(0);
  const [incrementAmount, setIncrementAmount] = useState("2");
  const [header, setHeader] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);


  let history = useHistory();

  const incrementValue = Number(incrementAmount) || 0;

  useEffect(() => {
    const checkUser = localStorage.getItem("user");
    console.log(dataFetched);
    

    console.log("Fetching data..."); 

    if (!checkUser) {
      localStorage.removeItem("user");
      history.push("/login");
    }
    
    const fetchData = async () => {
      console.log("Fetching data..."); // Debug log
      try {
        await dispatch(contactGet(JSON.parse(localStorage.getItem("user"))));
        if (status == 'fail'){
          localStorage.removeItem("user");
          history.push("/login");
        }
        setList(list)
        setDataFetched(true);
     
        
      } catch (error) {
        if (list=="jwt expired"){
          history.push("/login");
        }
        console.error("Error fetching data:", error);
      }
    };

    console.info(`statusupdate ${statusUpdate}`)
    console.info(`statusuadd ${statusAdd}`)
    if (!dataFetched) {
        fetchData();
      }
      
    else if(statusUpdate!='idle'){
      if (statusUpdate=='success'){
      setName("");
    setNumber("");
    setSelected(null);
    setSelect(null);
    setName("");
    setId(0);
    fetchData();
    setTimeout(() => {
      dispatch(resetStatusUpdate()); // ✅ Reset status after 3 seconds
    }, 3000);}
    


    }
    else if(statusAdd!='idle'){
      if (statusAdd=='success'){
        setName("");
      setNumber("");
      setSelected(null);
      setSelect(null);
      setName("");
      setId(0);
      fetchData();
      setTimeout(() => {
        dispatch(resetStatusAdd()); // ✅ Reset status after 3 seconds
      }, 3000);
      }
    }
    else if(deleted!='idle'){
      if (deleted=='success'){
        setName("");
      setNumber("");
      setSelected(null);
      setSelect(null);
      setName("");
      setId(0);
      fetchData();
      setTimeout(() => {
        dispatch(resetStatusDelete()); // ✅ Reset status after 3 seconds
      }, 3000);
      }
    }

    // if (!dataFetched) {
    //   fetchData();
    
    //   console.log('sini');
    //   console.log(lists);
    //   setDataFetched(true);
    // }
    // else {

    //   // //dispatch(contactGet(JSON.parse(localStorage.getItem("user"))));
    //   // if (status === "fail") {
    //   //   localStorage.removeItem("user");
    //   //   // history.push("/login");
    //   // }
    // }
  }, [dataFetched, statusUpdate, history, lists, statusAdd, status, list, name]);

  // useEffect(() => {
  //   const h = async () => {
  //     if (statusAdd === "fail") {
  //       setFailCount((prevState) => 0);
  //       const dh = await setTimeout(
  //         () => setFailCount((prevState) => prevState + 1),
  //         3000
  //       );
  //       console.log("masuukkk");
  //       //setList(list);
  //       /// setFailCount((prevState)=>prevState+1)
  //       return () => {
  //         clearTimeout(dh);
  //       };
  //     }
  //   };
  //   h();
  // }, [list, statusAdd]);

  // console.log(failCount);

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
      setId(0);
      setNumber("");
    } else {
      setSelected(index);
      setSelect(lists[index].contact);
      setName(lists[index].contact);
      setNumber(lists[index].contactNumber);
      setId(lists[index]._id);
    }
  };
  const Senarai = (props) => {
    return (
      <div
        className={props.hook ? "cards_click" : "cards"}
        style={{ alignItems: "center", marginTop: 30, width: "18rem", 
           }}
        onClick={() => props.hooker()}
        draggable
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

  const Box = () => {
    //  JSON.pa
    if (!lists) {
      return <div>Loading...</div>; // Loading state when lists are undefined
    }
  
    if (lists.length === 0) {
      return <div></div>; // Show a message when lists is empty
    }
    if(lists){
    return lists.map((data, index) => {
      return (
        <Senarai
          key={index}
          value={data.contact}
          number={data.contactNumber}
          index={index}
          hook={selected === index}
          hooker={() => selectionn(index)}
        />
        
      );
    });}
  }
  //return  <div>saya</div>

  const nameInserted = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
  };

  const numberInserted = (event) => {
    setNumber(event.target.value);
    console.log(event.target.value);
  };

  const sendData = async (e) => {
    e.preventDefault();
    // console.log(email + "tengok email");
    try{
    if (id === 0) {
      let formData = new FormData();
      formData.append("contact", name);
      formData.append("phoneNo", number);
      const gilq = JSON.parse(localStorage.getItem("user"));
      console.log(gilq.token);
      const insertData = {
        contact: name,
        phoneNo: number,
        token: gilq.token,
      };
      // setRegister(insertData);
      //lists.push({"data":{"contact":name,"contactNumber":number}})
      console.log(lists);
      console.log(name);
      console.log(number);
      console.log(insertData + "ssh");

      await dispatch(contactAdd(insertData))
  .unwrap()
  .then(() => dispatch(contactGet(JSON.parse(localStorage.getItem("user")))));
      setName("");
      setNumber("");
      //useEffect();
      // console.log(data);
      // window.location.reload(true);
      // setList(list);
      
    } else {
      
      let formData = new FormData();
      formData.append("contact", name);
      formData.append("phoneNo", number);
      const gilq = JSON.parse(localStorage.getItem("user"));
      formData.append("token", gilq.token);
      formData.append("id", id);
      console.log(gilq.token);
      console.log(id);
      const insertData = {
        contact: name,
        phoneNo: number,
        token: gilq.token,
        id: id,
      };
      // setRegister(insertData);
      //lists.push({"data":{"contact":name,"contactNumber":number}})
      console.log(lists);
      console.log(name);
      console.log(number);
      console.log(insertData + "sshk");
      // setDataFetched(false);
      const ifg = await dispatch(contactUpdate(insertData)).unwrap().
      then(() => dispatch(contactGet(JSON.parse(localStorage.getItem("user")))));
      console.log(`let's see ${ifg}`)
    }
    
    }catch (err) {
      console.error("Update failed:", err);
  // .unwrap()
  // .then(() => dispatch(contactGet(JSON.parse(localStorage.getItem("user")))));

      // setName("");
      // setNumber("");
      // setSelected(null);
      // setSelect(null);
      // setName("");
      // setId(0);
      //useEffect();
      // console.log(data);
      // window.location.reload(true);
      // setList(list);
      //console.log("dfadfs");
    }
  };

  const Alert = (props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
      if (show) {
        let timer1 = setTimeout(async () => await setShow(false), 1 * 3000);
        props.failCount(1);
        clearTimeout(timer1);
      } else {
      }
    }, [props, show]);
    return show ? (
      <div className="alert alert-danger" role="alert">
        This is a info alert—check it out!
      </div>
    ) : null;
  };

  const DeleteContact = (props) => {
    // console.log("ini nak delete");
    // console.log(props.nama);

    return props.nama ? (
      <div style={{marginTop: "25px"}} onClick={() => props.delete()}>DELETE</div>
    ) : null;
  };

  const deleteting = async (id) => {
    const gilq = JSON.parse(localStorage.getItem("user"));
    const insertData = {
      token: gilq.token,
      id: id,
    };
    console.info(`delete`)
    await dispatch(contactDelete(insertData)).unwrap();
    await dispatch(contactGet(JSON.parse(localStorage.getItem("user"))));
    setName("");
    setNumber("");
    setSelected(null);
    setSelect(null);
    setName("");
    setId(0);
    console.log("nyaaaa");
    console.log(id);
  };

  return lists ? (
    <div className="bodi">
      <Navbar
        expand="lg"
        sticky="top"
        className={header ? "navbar2 active" : "navbar2"}
      >
        <Container>
          <Navbar.Brand href="#home">Contacts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
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
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container color">
        {statusAdd === "fail" && failCount === 0 && (
          <Alert
            setFailCount={failCount}
            failCount={() => setFailCount(failCount)}
          />
        )}
        <div className="jaditak">
        <h1>CONTACTS</h1>
          <div className="d-flex justify-content-center text-start">
            <div>
              <div className=" px-2 py-4 mx-2 mt-3">
                <div className="row">
                  
                    
                  
                  {/* <div className="col-sm">
                    <img
                      src={
                        "http://localhost:5000//Users/Acer/Documents/GitHub/ExpressJS_JWT_Bcrypt/controllers/picture/EN7EkKaU8AE1Xdm.jfif"
                      }
                      width="100"
                      height="100"
                      alt={"sfs"}
                    />
                  </div> */}
                </div>
                <div className="mx-8  flex">
                 {/* {lists && (<Box />)} */}
                 <Box />
                  {/*   <div ref={hoverRef}>{isHovered ? "😁" : "☹️"}</div>;*/}
                  <DeleteContact nama={select} delete={() => deleteting(id)} />
                  
                  
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
                      type="text"
                      placeholder="Enter Name "
                      value={name}
                      onChange={nameInserted}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 ">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Number"
                      value={number}
                      onChange={numberInserted}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      type="submit"
                      className="mx-5"
                      onClick={sendData}
                    >
                      {select ? "Update" : "Submit"}
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
  ) : (
    ((<div>makan</div>)
      // (
      //   <div className=" border ml-5 ">
      //     <div className="row mt-5">
      //       <div className="col-sm"></div>
      //       <div className="col-sm">
      //         <div className="row mt-3">
      //           {" "}
      //           <h1> CONTACTS</h1>
      //         </div>
      //       </div>
      //       <div className="col-sm"></div>

      //       <div className="col-sm"></div>
      //     </div>
      //   </div>
      // )
    )
  );
}


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
import {
  contactGet,
  contactAdd,
  contactUpdate,
  contactDelete,
  resetStatusUpdate,
  resetStatusAdd,
  resetStatusDelete
} from "./ContactSlice";
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
  const statusAdd = useSelector((state) => state.contact.statusAdd);
  const statusUpdate = useSelector((state) => state.contact.statusUpdate);
  const deleted = useSelector((state) => state.contact.statusDelete);
  const dispatch = useDispatch();
  const [lists, setList] = useState([]);
  const [card, setCard] = useState(false);
  const [select, setSelect] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [id, setId] = useState(0);
  const [selected, setSelected] = useState(null);
  const [alert, setAlerted] = useState(false);
  const [failCount, setFailCount] = useState(0);
  //const [selected, setSelected] = useState(0);
  const [incrementAmount, setIncrementAmount] = useState("2");
  const [header, setHeader] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);


  let history = useHistory();

  const incrementValue = Number(incrementAmount) || 0;

  useEffect(() => {
    const checkUser = localStorage.getItem("user");
    console.log(dataFetched);
    

    console.log("Fetching data..."); 

    if (!checkUser) {
      localStorage.removeItem("user");
      history.push("/login");
    }
    
    const fetchData = async () => {
      console.log("Fetching data..."); // Debug log
      try {
        await dispatch(contactGet(JSON.parse(localStorage.getItem("user"))));
        if (status == 'fail'){
          localStorage.removeItem("user");
          history.push("/login");
        }
        setList(list)
        setDataFetched(true);
     
        
      } catch (error) {
        if (list=="jwt expired"){
          history.push("/login");
        }
        console.error("Error fetching data:", error);
      }
    };

    console.info(`statusupdate ${statusUpdate}`)
    console.info(`statusuadd ${statusAdd}`)
    if (!dataFetched) {
        fetchData();
      }
      
    else if(statusUpdate!='idle'){
      if (statusUpdate=='success'){
      setName("");
    setNumber("");
    setSelected(null);
    setSelect(null);
    setName("");
    setId(0);
    fetchData();
    setTimeout(() => {
      dispatch(resetStatusUpdate()); // ✅ Reset status after 3 seconds
    }, 3000);}
    


    }
    else if(statusAdd!='idle'){
      if (statusAdd=='success'){
        setName("");
      setNumber("");
      setSelected(null);
      setSelect(null);
      setName("");
      setId(0);
      fetchData();
      setTimeout(() => {
        dispatch(resetStatusAdd()); // ✅ Reset status after 3 seconds
      }, 3000);
      }
    }
    else if(deleted!='idle'){
      if (deleted=='success'){
        setName("");
      setNumber("");
      setSelected(null);
      setSelect(null);
      setName("");
      setId(0);
      fetchData();
      setTimeout(() => {
        dispatch(resetStatusDelete()); // ✅ Reset status after 3 seconds
      }, 3000);
      }
    }

    // if (!dataFetched) {
    //   fetchData();
    
    //   console.log('sini');
    //   console.log(lists);
    //   setDataFetched(true);
    // }
    // else {

    //   // //dispatch(contactGet(JSON.parse(localStorage.getItem("user"))));
    //   // if (status === "fail") {
    //   //   localStorage.removeItem("user");
    //   //   // history.push("/login");
    //   // }
    // }
  }, [dataFetched, statusUpdate, history, lists, statusAdd, status, list, name]);

  // useEffect(() => {
  //   const h = async () => {
  //     if (statusAdd === "fail") {
  //       setFailCount((prevState) => 0);
  //       const dh = await setTimeout(
  //         () => setFailCount((prevState) => prevState + 1),
  //         3000
  //       );
  //       console.log("masuukkk");
  //       //setList(list);
  //       /// setFailCount((prevState)=>prevState+1)
  //       return () => {
  //         clearTimeout(dh);
  //       };
  //     }
  //   };
  //   h();
  // }, [list, statusAdd]);

  // console.log(failCount);

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
      setId(0);
      setNumber("");
    } else {
      setSelected(index);
      setSelect(lists[index].contact);
      setName(lists[index].contact);
      setNumber(lists[index].contactNumber);
      setId(lists[index]._id);
    }
  };
  const Senarai = (props) => {
    return (
      <div
        className={props.hook ? "cards_click" : "cards"}
        style={{ alignItems: "center", marginTop: 30, width: "18rem", 
           }}
        onClick={() => props.hooker()}
        draggable
        key={props.index}
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

  const Box = () => {
    //  JSON.pa
    if (!lists) {
      return <div>Loading...</div>; // Loading state when lists are undefined
    }
  
    if (lists.length === 0) {
      return <div></div>; // Show a message when lists is empty
    }
    if(lists){
    return lists.map((data, index) => {
      return (
        <Senarai
          key={index}
          value={data.contact}
          number={data.contactNumber}
          index={index}
          hook={selected === index}
          hooker={() => selectionn(index)}
        />
        
      );
    });}
  }
  //return  <div>saya</div>

  const nameInserted = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
  };

  const numberInserted = (event) => {
    setNumber(event.target.value);
    console.log(event.target.value);
  };

  const sendData = async (e) => {
    e.preventDefault();
    // console.log(email + "tengok email");
    try{
    if (id === 0) {
      let formData = new FormData();
      formData.append("contact", name);
      formData.append("phoneNo", number);
      const gilq = JSON.parse(localStorage.getItem("user"));
      console.log(gilq.token);
      const insertData = {
        contact: name,
        phoneNo: number,
        token: gilq.token,
      };
      // setRegister(insertData);
      //lists.push({"data":{"contact":name,"contactNumber":number}})
      console.log(lists);
      console.log(name);
      console.log(number);
      console.log(insertData + "ssh");

      await dispatch(contactAdd(insertData))
  .unwrap()
  .then(() => dispatch(contactGet(JSON.parse(localStorage.getItem("user")))));
      setName("");
      setNumber("");
      //useEffect();
      // console.log(data);
      // window.location.reload(true);
      // setList(list);
      
    } else {
      
      let formData = new FormData();
      formData.append("contact", name);
      formData.append("phoneNo", number);
      const gilq = JSON.parse(localStorage.getItem("user"));
      formData.append("token", gilq.token);
      formData.append("id", id);
      console.log(gilq.token);
      console.log(id);
      const insertData = {
        contact: name,
        phoneNo: number,
        token: gilq.token,
        id: id,
      };
      // setRegister(insertData);
      //lists.push({"data":{"contact":name,"contactNumber":number}})
      console.log(lists);
      console.log(name);
      console.log(number);
      console.log(insertData + "sshk");
      // setDataFetched(false);
      const ifg = await dispatch(contactUpdate(insertData)).unwrap().
      then(() => dispatch(contactGet(JSON.parse(localStorage.getItem("user")))));
      console.log(`let's see ${ifg}`)
    }
    
    }catch (err) {
      console.error("Update failed:", err);
  // .unwrap()
  // .then(() => dispatch(contactGet(JSON.parse(localStorage.getItem("user")))));

      // setName("");
      // setNumber("");
      // setSelected(null);
      // setSelect(null);
      // setName("");
      // setId(0);
      //useEffect();
      // console.log(data);
      // window.location.reload(true);
      // setList(list);
      //console.log("dfadfs");
    }
  };

  const Alert = (props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
      if (show) {
        let timer1 = setTimeout(async () => await setShow(false), 1 * 3000);
        props.failCount(1);
        clearTimeout(timer1);
      } else {
      }
    }, [props, show]);
    return show ? (
      <div className="alert alert-danger" role="alert">
        This is a info alert—check it out!
      </div>
    ) : null;
  };

  const DeleteContact = (props) => {
    // console.log("ini nak delete");
    // console.log(props.nama);

    return props.nama ? (
      <div style={{marginTop: "25px"}} onClick={() => props.delete()}>DELETE</div>
    ) : null;
  };

  const deleteting = async (id) => {
    const gilq = JSON.parse(localStorage.getItem("user"));
    const insertData = {
      token: gilq.token,
      id: id,
    };
    console.info(`delete`)
    await dispatch(contactDelete(insertData)).unwrap();
    await dispatch(contactGet(JSON.parse(localStorage.getItem("user"))));
    setName("");
    setNumber("");
    setSelected(null);
    setSelect(null);
    setName("");
    setId(0);
    console.log("nyaaaa");
    console.log(id);
  };

  return lists ? (
    <div className="bodi">
      <Navbar
        expand="lg"
        sticky="top"
        className={header ? "navbar2 active" : "navbar2"}
      >
        <Container>
          <Navbar.Brand href="#home">Contacts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
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
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container color">
        {statusAdd === "fail" && failCount === 0 && (
          <Alert
            setFailCount={failCount}
            failCount={() => setFailCount(failCount)}
          />
        )}
        <div className="jaditak">
        <h1>CONTACTS</h1>
          <div className="d-flex justify-content-center text-start">
            <div>
              <div className=" px-2 py-4 mx-2 mt-3">
                <div className="row">
                  
                    
                  
                  {/* <div className="col-sm">
                    <img
                      src={
                        "http://localhost:5000//Users/Acer/Documents/GitHub/ExpressJS_JWT_Bcrypt/controllers/picture/EN7EkKaU8AE1Xdm.jfif"
                      }
                      width="100"
                      height="100"
                      alt={"sfs"}
                    />
                  </div> */}
                </div>
                <div className="mx-8  flex">
                 {/* {lists && (<Box />)} */}
                 <Box />
                  {/*   <div ref={hoverRef}>{isHovered ? "😁" : "☹️"}</div>;*/}
                  <DeleteContact nama={select} delete={() => deleteting(id)} />
                  
                  
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
                      type="text"
                      placeholder="Enter Name "
                      value={name}
                      onChange={nameInserted}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 ">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Number"
                      value={number}
                      onChange={numberInserted}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      type="submit"
                      className="mx-5"
                      onClick={sendData}
                    >
                      {select ? "Update" : "Submit"}
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
  ) : (
    ((<div>makan</div>)
      // (
      //   <div className=" border ml-5 ">
      //     <div className="row mt-5">
      //       <div className="col-sm"></div>
      //       <div className="col-sm">
      //         <div className="row mt-3">
      //           {" "}
      //           <h1> CONTACTS</h1>
      //         </div>
      //       </div>
      //       <div className="col-sm"></div>

      //       <div className="col-sm"></div>
      //     </div>
      //   </div>
      // )
    )
  );
}
