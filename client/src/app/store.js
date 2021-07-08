import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import  userLogin  from '../user/LoginSlice';
import  user  from '../user/RegisterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user:user,
    userLogin:userLogin
  },
});
