import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./messages";

export const store = configureStore({
  reducer: {
    message: messageReducer,
  },
});
