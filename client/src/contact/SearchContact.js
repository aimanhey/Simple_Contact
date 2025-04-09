import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  verifyauth
} from "../user/LoginSlice";
import { Form, Button, Navbar, Nav, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./ContactCss.scss";

export function SearchContact() {

  const list = useSelector((state) => state.generalContact.data);
  const data = useSelector((state) => state.userLogin.data);
  const status = useSelector((state) => state.userLogin.status);
  console.log(list);
  console.log("here");
  console.log(data)
  const [query, setQuery] = useState("");
  // const status = useSelector((state) => state.contact.status);
  // const statusAdd = useSelector((state) => state.contact.statusAdd);
  // const statusUpdate = useSelector((state) => state.contact.statusUpdate);
  // const statusDelete = useSelector((state) => state.contact.statusDelete);
  const dispatch = useDispatch();
  const history = useHistory();

  // const [selectedIndex, setSelectedIndex] = useState(null);
  // const [select, setSelect] = useState("");
  // const [name, setName] = useState("");
  // const [number, setNumber] = useState("");
  // const [id, setId] = useState(0);
  const [header, setHeader] = useState(false);

  const filteredItems = list.filter((item) =>
    item.contact.toLowerCase().includes(query.toLowerCase()) || 
    item.contactNumber.toString().includes(query)
  );
  


  // // Reset form helper
  // const resetForm = () => {
  //   setName("");
  //   setNumber("");
  //   setSelectedIndex(null);
  //   setSelect("");
  //   setId(0);
  // };

  // Authentication check and initial data fetch on mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(status)
    if (!user) {
      localStorage.removeItem("user");
      history.push("/login");
      return;
    }

    (async () => {
      try {
        await dispatch(verifyauth(JSON.parse(user))).unwrap();
        console.log(status)
        if( status == 'fail'){
          localStorage.removeItem("user");
          history.push("/login");
        }
      } catch (error) {
        console.log(error)
        // Handle token expiry or auth errors by redirecting to login
        // localStorage.removeItem("user");
        // history.push("/login");
      }
    })();
  }, [history]);

  // // Re-fetch data and reset form after successful add, update, or delete
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const refetch = async () => {
  //     await dispatch(contactGet(user)).unwrap();
  //   };

  //   if (statusUpdate === "success" || statusAdd === "success" || statusDelete === "success") {
  //     resetForm();
  //     refetch();
  //     // Reset status after a delay
  //     setTimeout(() => {
  //       if (statusUpdate === "success") dispatch(resetStatusUpdate());
  //       if (statusAdd === "success") dispatch(resetStatusAdd());
  //       if (statusDelete === "success") dispatch(resetStatusDelete());
  //     }, 3000);
  //   }
  // }, [statusUpdate, statusAdd, statusDelete, dispatch]);

  // Listen to window scroll events to update header styling
  useEffect(() => {
    const handleScroll = () => {
      setHeader(window.scrollY > 10);
    };
    console.log(list)

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // // Handle selecting a contact
  // const handleSelect = useCallback(
  //   (index) => {
  //     if (selectedIndex === index) {
  //       resetForm();
  //     } else {
  //       const contact = list[index];
  //       setSelectedIndex(index);
  //       setSelect(contact.contact);
  //       setName(contact.contact);
  //       setNumber(contact.contactNumber);
  //       setId(contact._id);
  //     }
  //   },
  //   [selectedIndex, list]
  // );

  // // Handlers for form changes
  // const handleNameChange = (e) => setName(e.target.value);
  // const handleNumberChange = (e) => setNumber(e.target.value);

  // // Submit add or update
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   try {
  //     if (id === 0) {
  //       // Add new contact
  //       await dispatch(contactAdd({ contact: name, phoneNo: number, token: user.token })).unwrap();
  //     } else {
  //       // Update contact
  //       await dispatch(contactUpdate({ contact: name, phoneNo: number, token: user.token, id })).unwrap();
  //     }
  //   } catch (err) {
  //     console.error("Error submitting data:", err);
  //   }
  // };

  // // Delete contact
  // const handleDelete = async () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   try {
  //     await dispatch(contactDelete({ token: user.token, id })).unwrap();
  //   } catch (err) {
  //     console.error("Error deleting contact:", err);
  //   }
  // };

  // // Render list of contacts
  // const ContactList = () => {
  //   if (!list) return <div>Loading...</div>;
  //   if (list.length === 0) return <div>No contacts available.</div>;
  //   console.log(list)

  //   return list.map((contact, index) => (
  //     <div
  //       key={index}
  //       className={selectedIndex === index ? "cards_click" : "cards"}
  //       style={{ alignItems: "center", marginTop: 30, width: "18rem" }}
  //       onClick={() => handleSelect(index)}
  //       draggable
  //     >
  //       <div className="card-body">
  //         <h5 className="card-title" style={{ textAlign: "center" }}>
  //           {contact.contact}
  //         </h5>
  //         <h6 className="card-subtitle mb-2 text-muted">{contact.contactNumber}</h6>
  //       </div>
  //     </div>
  //   ));
  // };

  return (
    <div className="bodi">
      <Navbar expand="lg" sticky="top" className={header ? "navbar2 active" : "navbar2"}>
        <Container>
          <Navbar.Brand href="#home">Simple Contacts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link href="/">List</Nav.Link>
              <Nav.Link href="#link">Filter</Nav.Link>
            </Nav>
            <Nav className="ms-0"> {/* Ensure it's left-aligned */}
                          <Nav.Link href="/logout">Logout</Nav.Link>
                      </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container color">
        <h1 className="mx-2">FILTER CONTACTS</h1>
        <div className="d-flex justify-content-center text-start">
          <div className="px-2 py-4 mx-2 mt-3">
            <div className="mx-8 flex">
            <ul>
        {filteredItems.map((contact, index) => (
         <div
         key={index}
         className={"cards"}
         style={{ alignItems: "center", marginTop: 30, width: "18rem" }}
         draggable
       >
         <div className="card-body">
           <h5 className="card-title" style={{ textAlign: "center" }}>
             {contact.contact}
           </h5>
           <h6 className="card-subtitle mb-2 text-muted">{contact.contactNumber}</h6>
         </div>
       </div>
        ))}
      </ul>
            </div>
          </div>
        </div>
      </div>

      {/* <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      /> */}
      {/* <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul> */}
    
      <div className="container utah">
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm-8">
            <div className="mt-3 mx-5">
              <Form >
                <Form.Group className="mb-3">
                  <Form.Label>Contact Name</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Search..."
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                    
                   
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Number"
                   
                    
                  />
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit" className="mx-5">
                    {"Submit"}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    </div>
  );
}
