import { createSlice } from "@reduxjs/toolkit";

const initialEmail = localStorage.getItem("forgotEmail") || null;

const forgotSlice = createSlice({
  name: "forgot",
  initialState: { emailId: initialEmail },
  reducers: {
    setForgotEmail: (state, action) => {
      state.emailId = action.payload;
      localStorage.setItem("forgotEmail", action.payload); // ✅ persist
    },
    clearForgotEmail: (state) => {
      state.emailId = null;
      localStorage.removeItem("forgotEmail"); // ✅ clear
      localStorage.removeItem("resetSession");
    },
  },
});

export const { setForgotEmail, clearForgotEmail } = forgotSlice.actions;
export default forgotSlice.reducer;
