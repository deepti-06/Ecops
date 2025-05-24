import { configureStore } from "@reduxjs/toolkit";
import complaintsReducer from "./complaints/complaintsSlice";

const store = configureStore({
  reducer: {
    complaints: complaintsReducer,
  },
});

export default store;
