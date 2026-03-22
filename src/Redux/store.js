import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import courseReducer from './courseSlice'
import mentorReducer from './mentorSlice'
 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    course:courseReducer,
    mentor:mentorReducer
  },
});