import { configureStore } from '@reduxjs/toolkit';
import  contactFetch  from '../contacts/ContactSlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  
  reducer: {
    counter: counterReducer,
    contact: contactFetch
  },
});
