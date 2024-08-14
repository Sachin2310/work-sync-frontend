import { createSlice } from "@reduxjs/toolkit";

const accessTokenSlice = createSlice({
  name: "accessTokens",
  initialState: {
    tokens: [
      {
        email: "",
        token: "",
      },
    ],
  },
  reducers: {
    addToken: (state, action) => {
      state.tokens.push(action.payload);
    },
    updateToken: (state, action) => {
      const existingTokenObject = state.tokens.find(
        (token) => token.email === action.payload.email
      );
      existingTokenObject.token = action.payload.token;
    },
  },
});

export const { addToken, updateToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
