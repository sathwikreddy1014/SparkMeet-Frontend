import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],   // ✅ start as an array, not null
  reducers: {
    addFeed: (state, action) => {
      return action.payload;  // expecting an array of users
    },
    removeoneFeed: (state, action) => {
      return state.filter(user => user._id !== action.payload);  // ✅ safe now
    },
  },
});

export const { addFeed, removeoneFeed } = feedSlice.actions;
export default feedSlice.reducer;
