import { createSlice } from "@reduxjs/toolkit";

export const additionalStates = createSlice({
  name: "additionalStates",
  initialState: {
    emails: [],
  },
  reducers: {
    setEmailSendersList: (state, action) => {
      state.emails = action.payload;
    },
    addEmail: (state, action) => {
      state.emails.push(action.payload);
    },
  },
});

export const { setEmailSendersList, addEmail } = additionalStates.actions;

export default additionalStates.reducer;
