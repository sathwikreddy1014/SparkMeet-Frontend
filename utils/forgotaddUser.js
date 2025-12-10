// forgotaddUser.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
};

const forgotSlice = createSlice({
  name: "forgot",
  initialState,
  reducers: {
    addforgot: (state, action) => {
      state.email = action.payload.email; // ✅ works because state is an object
    },
  },
});

export const { addforgot } = forgotSlice.actions;
export default forgotSlice.reducer;
