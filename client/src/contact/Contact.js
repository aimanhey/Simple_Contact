import React, { useState, useEffect } from "react";
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
import { contactGet } from "./ContactSlice";

export function Contact() {
  const count = useSelector(selectCount);
  const list = useSelector((state) => state.contact.data);
  const status = useSelector((state) => state.contact.status);
  const dispatch = useDispatch();
  const [lists, setList] = useState();
  const [incrementAmount, setIncrementAmount] = useState("2");
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
      if(status==="fail"){
        localStorage.removeItem("user");
        history.push("/login");
      }
    }
  }, [dispatch, history, list, lists, status]);

  const Senarai = (props) => {
    return (
      <div className="card" style={{ alignItems: "center", marginTop: 30 }}>
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
        <Senarai key={index} value={data.contact} number={data.contactNumber} />
      );
    });
  //return  <div>saya</div>

  return (
    <div>
      {lists ? (
        <div className="container-fluid">
          <div className="container justify-content-start">
          <div className="row mt-5">
          <div className="col-sm"></div>
            <div className="col-sm">
         <h1> CONTACTS</h1>
          </div>
          <div className="col-sm"></div>
           
            <div className="col-sm"></div>
          </div>
          </div>
          <div className="container ">
            <div className="row">
              <div className="col-sm"></div>
              <div className="col-sm">
                <Box />
              </div>
              <div className="col-sm"></div>
            </div>
          </div>
        </div>
      ) : (
        <div>makan</div>
      )}
    </div>
  );
}
