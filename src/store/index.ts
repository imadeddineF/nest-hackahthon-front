import { configureStore } from "@reduxjs/toolkit";
import sessionName from "./sessionName/sessionNameSlice";

export const store = configureStore({
  reducer: {
    sessionName: sessionName,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
