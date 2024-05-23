import { configureStore } from "@reduxjs/toolkit";
import watherSlice from "./storeSlice";
export const store = configureStore({
  reducer: {
    weather: watherSlice,
  },
});
