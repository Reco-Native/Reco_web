import { configureStore } from "@reduxjs/toolkit";
import ComponentSlice from "./slice/componentSlice";



export const store = configureStore({
  reducer: {
    component: ComponentSlice,
    devTools: process.env.NODE_ENV === "development",
  },

  // Add your middleware here
  // ...
});
