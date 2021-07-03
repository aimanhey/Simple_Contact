import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactById, status } from "./ContactSlice";

export const Contact = () => {
 
  const dispatch = useDispatch();

  useEffect(() => {
    
     
    
  }, [dispatch]);

  return (
     
   <div>
        {status === "success" ? 

            
     <ul>
          
     </ul>

       
        
        
       : <h1>jdhj</h1>
      }
     

      </div>
  );
};
