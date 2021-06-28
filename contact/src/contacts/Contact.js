import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactById, status } from "./ContactSlice";

export const Contact = () => {
  const status = useSelector((state) => state.contact.status);
  const data = useSelector((state) => state.contact.contact);

  const dispatch = useDispatch();

  useEffect(() => {
    
      dispatch(fetchContactById());
    
  }, [dispatch]);

  return (
     
   <div>
        {status === "success" ? 

            
     <ul>
           {data.map((contacts,index) => <li key={contacts._id}>{contacts.contact}</li>)}
     </ul>

       
        
        
       : <h1>jdhj</h1>
      }
     

      </div>
  );
};
