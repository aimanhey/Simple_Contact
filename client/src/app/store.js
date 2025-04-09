import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import storage from "redux-persist/lib/storage"; // Uses LocalStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import  userLogin  from '../user/LoginSlice';
import  user  from '../user/RegisterSlice';
import contactReducer from '../contact/ContactSlice';



const persistConfig = {
  key: "root",
  storage, // Saves state in LocalStorage
};


const generalContactPersistedReducer  = persistReducer(persistConfig, contactReducer);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user:user,
    userLogin:userLogin,
    contact:contactReducer,
    generalContact: generalContactPersistedReducer,
    
  },
});

export const persistor = persistStore(store);
