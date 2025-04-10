import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionName {
  name: string;
}

const initialState: SessionName = {
  name: "Overview",
};

export const sessionNameSlice = createSlice({
  name: "sessionName",
  initialState,
  reducers: {
    setSessionName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setSessionName } = sessionNameSlice.actions;
export default sessionNameSlice.reducer;
