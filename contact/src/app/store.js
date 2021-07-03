import { configureStore } from '@reduxjs/toolkit';
import  contactFetch  from '../contacts/ContactSlice';
import counterReducer from '../features/counter/counterSlice';
import  user  from '../Register/RegisterSlice';

export const store = configureStore({
  
  reducer: {
    counter: counterReducer,
    contact: contactFetch,
    user:user
  },
});
